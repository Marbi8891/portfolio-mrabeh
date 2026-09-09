#!/usr/bin/env python3
"""
Lab-only TCP port forwarder for OSCP/HTB/PG-style private networks.

Example:
  python3 tcp_forward.py \
    --listen-host 127.0.0.1 --listen-port 8080 \
    --target-host 10.10.10.20 --target-port 80

The target must resolve to a private or loopback IP.
"""

import argparse
import asyncio
import ipaddress
import socket


def resolve_private(host: str) -> str:
    try:
        infos = socket.getaddrinfo(host, None, type=socket.SOCK_STREAM)
    except socket.gaierror as exc:
        raise SystemExit(f"[!] Could not resolve {host}: {exc}") from exc

    for info in infos:
        ip = info[4][0]
        addr = ipaddress.ip_address(ip)
        if addr.is_private or addr.is_loopback:
            return ip

    raise SystemExit("[!] Target must resolve to a private or loopback IP.")


def validate_bind_host(host: str) -> None:
    addr = ipaddress.ip_address(host)
    if not (addr.is_private or addr.is_loopback or addr.is_unspecified):
        raise SystemExit("[!] Listen address must be private, loopback, or 0.0.0.0/::.")


async def relay(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    try:
        while True:
            data = await reader.read(65536)
            if not data:
                break
            writer.write(data)
            await writer.drain()
    finally:
        try:
            writer.close()
            await writer.wait_closed()
        except Exception:
            pass


async def handle_client(
    client_reader: asyncio.StreamReader,
    client_writer: asyncio.StreamWriter,
    target_host: str,
    target_port: int,
) -> None:
    peer = client_writer.get_extra_info("peername")
    try:
        target_reader, target_writer = await asyncio.open_connection(target_host, target_port)
        print(f"[+] {peer} -> {target_host}:{target_port}")

        await asyncio.gather(
            relay(client_reader, target_writer),
            relay(target_reader, client_writer),
        )
    except Exception as exc:
        print(f"[!] Connection error for {peer}: {exc}")
        try:
            client_writer.close()
            await client_writer.wait_closed()
        except Exception:
            pass


async def main_async(args) -> None:
    validate_bind_host(args.listen_host)
    target_ip = resolve_private(args.target_host)

    server = await asyncio.start_server(
        lambda r, w: handle_client(r, w, target_ip, args.target_port),
        args.listen_host,
        args.listen_port,
    )

    sockets = ", ".join(str(s.getsockname()) for s in server.sockets or [])
    print(f"[+] Listening on {sockets}")
    print(f"[+] Forwarding to {target_ip}:{args.target_port}")
    print("[+] Ctrl+C to stop")

    async with server:
        await server.serve_forever()


def parse_args():
    p = argparse.ArgumentParser(description="Private-network TCP port forwarder")
    p.add_argument("--listen-host", default="127.0.0.1")
    p.add_argument("--listen-port", type=int, required=True)
    p.add_argument("--target-host", required=True)
    p.add_argument("--target-port", type=int, required=True)
    return p.parse_args()


if __name__ == "__main__":
    try:
        asyncio.run(main_async(parse_args()))
    except KeyboardInterrupt:
        print("\n[+] Stopped.")

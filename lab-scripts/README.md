# Lab scripts — authorized testing only

These are personal networking/security lab utilities, not part of the portfolio site.

- `lab_reverse_shell.py` — reverse shell helper restricted to private/loopback IPs, for use in authorized labs (OSCP/HTB/PG-style private networks, CTFs) that you control or are explicitly authorized to test.
- `tcp_forward.py` — TCP port forwarder restricted to private/loopback targets, for the same authorized-lab context.

Both scripts already enforce private/loopback-only targets in code. They are kept here, separated from the portfolio website source, so they don't appear unexplained at the root of a repo linked from a CV or job application.

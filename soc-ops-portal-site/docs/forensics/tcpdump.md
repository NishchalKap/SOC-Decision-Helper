---
id: tcpdump
title: tcpdump Command Library
sidebar_label: tcpdump
---

## Problem Scenario

Quickly capture and filter network traffic directly on Linux endpoints, firewalls, or network taps to support incident triage or network troubleshooting.

**When to Use:**
- Investigating suspected C2 or data exfiltration on a Linux host.
- Verifying whether a firewall rule is dropping traffic.
- Gathering a PCAP for deeper analysis in Wireshark.

## Quick Commands

```bash
# Capture all traffic on a specific interface, no DNS resolution, save to file
tcpdump -i eth0 -n -w capture.pcap

# Capture HTTP traffic (port 80) only
tcpdump -i eth0 -n port 80

# Capture traffic to/from a specific IP
tcpdump -i eth0 -n host 192.168.1.50

# Capture TCP SYN packets only (looking for port scans)
tcpdump -i eth0 "tcp[tcpflags] & (tcp-syn) != 0"

# Read back a PCAP file and print to console
tcpdump -n -r capture.pcap
```

## Decision Flow

- **Do you need to analyze the packet payload?**
  - Write to a file (`-w capture.pcap`) and analyze offline with Wireshark.
- **Is the host generating too much noise?**
  - Use Berkeley Packet Filters (BPF) to narrow down by `host`, `port`, or `net`. 
- **Are you seeing truncated packets?**
  - Use `-s 0` (snaplength) to ensure full packet capture.
- **Is DNS resolution slowing down the output?**
  - Always use `-n` (or `-nn` to also disable port translation) for faster, cleaner CLI output.

## SOC Detection Indicators

- `tcpdump` requires root privileges. Monitor for unauthorized use of `tcpdump` or `tshark` by non-admin users, leading to potential privilege escalation or unauthorized sniffing.
- Attackers may use `tcpdump` to capture credentials traversing the network in plaintext.

**Elastic Example (Process Execution):**
```kql
process.name: "tcpdump" AND NOT user.name: "root"
```

## Next Investigation Steps

- Use the generated PCAP in [Wireshark](./wireshark.md) or Zeek for detailed protocol analysis.
- If investigating a compromised host, transfer the PCAP securely to an isolated analysis environment.
- Review firewall logs to see if the captured suspicious traffic crossed security boundaries.

## References

- tcpdump official site: `https://www.tcpdump.org/`
- SANS tcpdump Cheat Sheet: `https://www.sans.org/security-resources/tcpip.pdf`

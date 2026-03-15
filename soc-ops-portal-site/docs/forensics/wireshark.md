---
id: wireshark
title: Wireshark Network Forensics Playbook
sidebar_label: Wireshark
---

## Problem Scenario

Quickly extract high-value evidence from packet captures to support triage, intrusion analysis, and protocol troubleshooting.

**When to Use:**
- Network-based incident response (C2, data exfil, credential theft).
- Validating IDS/alert claims with packet-level evidence.
- Protocol or application issues suspected on the wire.

## Quick Commands

```bash
# Capture only HTTP traffic on interface eth0
sudo tshark -i eth0 -Y "http" -w http_traffic.pcap

# Follow a TCP stream from the CLI
tshark -r capture.pcap -q -z "follow,tcp,ascii,1"

# Filter on IP and port (in Wireshark display filter)
ip.addr == 10.0.10.50 && tcp.port == 443

# Extract files over HTTP
tshark -r capture.pcap --export-objects "http,exported_files"
```

## Decision Flow

- **Need fast context?**
  - Filter by suspected host IP, then by protocol or port; avoid looking at raw packets without filters.
- **Investigating C2 or beaconing?**
  - Look for periodic connections, consistent intervals, small fixed-size payloads.
- **Suspected data exfiltration?**
  - Focus on long-lived connections, large outbound transfers, and unusual destinations.

## SOC Detection Indicators

- **Packet capture usage**:
  - Monitor where `tshark`, `dumpcap`, or `tcpdump` are invoked; on endpoints this may be suspicious.
- **Beaconing patterns**:
  - Use NetFlow/pcap metadata to identify periodic connections, then pivot into full captures.
- **Hunting ideas**:
  - Identify internal hosts with many failed TLS handshakes or strange SNI values.
  - Flag clear-text credentials within captures (HTTP basic auth, FTP, legacy protocols).

## Next Investigation Steps

- Export:
  - Relevant streams (Follow TCP/UDP stream).
  - Files or objects (HTTP/SMB/FTP exports).
  - Key screenshots of protocol anomalies.
- Attach artifacts to the incident record and summarize:
  - Who talked to whom, over what, and when.
  - Clear indicators of compromise or benign explanations.

## References

- Wireshark User Guide: `https://www.wireshark.org/docs/wsug_html_chunked/`
- Display Filter Reference: `https://www.wireshark.org/docs/dfref/`




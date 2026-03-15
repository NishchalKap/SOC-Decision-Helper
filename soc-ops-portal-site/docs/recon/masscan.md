---
id: masscan
title: Masscan High-Speed Scan Playbook
sidebar_label: Masscan
---

## Problem Scenario

Rapidly identify open ports across large networks, then hand off narrowed targets to Nmap or other tools.

**When to Use:**
- Large CIDR ranges (e.g. /16, /12, /8) where full Nmap scans are too slow.
- Internet-facing recon where you must quickly map exposed services.
- Baseline validation of perimeter changes (before/after firewall or load balancer changes).

## Quick Commands

```bash
# Very fast scan of top 1000 ports on a /16
masscan 192.168.0.0/16 -p1-1000 --rate 100000 --wait 5

# Scan specific ports on a list of targets from file
masscan -iL targets.txt -p22,80,443,445 --rate 50000 -oG scans/masscan.gnmap

# Internet-facing recon for HTTPS services
masscan 0.0.0.0/0 -p443 --rate 200000 --wait 5 --excludefile exclude-ranges.txt

# Take Masscan output and feed into Nmap for detail
cat scans/masscan.gnmap | awk '/Ports:/{print $2}' | sort -u > masscan_hosts.txt
nmap -sV -sC -iL masscan_hosts.txt
```

## Decision Flow

- **Need speed over fidelity?**
  - Use Masscan first to reduce scope, then use Nmap for service/version detail.
- **Shared infrastructure or sensitive ranges?**
  - Confirm with network owners. Masscan can generate load or trigger protections when misconfigured.
- **Internet-wide or ISP-owned ranges?**
  - Always use explicit exclusion lists (`--excludefile`) and respect acceptable use and legal constraints.

## SOC Detection Indicators

- **Network patterns**:
  - Extremely high connection rates from a single source to many IPs/ports.
  - Short-lived TCP connections with no payload, spread across large portions of address space.
- **Telemetry hints**:
  - Firewall logs showing a single source touching thousands of destination IP/port pairs per minute.
  - IDS signatures for Masscan-like scanning behaviors (high rate SYNs).
- **Hunting ideas**:
  - Identify any internal host with >5,000 distinct destination ports or >1,000 distinct destination IPs per 5 minutes.
  - Correlate with authentication logs to see who was logged into that host at the time.

## Next Investigation Steps

- Generate a de-duplicated list of responsive hosts and feed into:
  - [Nmap Recon Playbook](./nmap.md) for detailed analysis.
  - Web scanners, credential scanners, or service-specific tooling as needed.
- Store scan outputs, scope decisions, and responsible approver in the incident or change record.
- If unauthorized usage is detected, isolate the scanning host and review its access patterns.

## References

- Masscan GitHub: `https://github.com/robertdavidgraham/masscan`
- Usage Examples: `https://github.com/robertdavidgraham/masscan#example` 




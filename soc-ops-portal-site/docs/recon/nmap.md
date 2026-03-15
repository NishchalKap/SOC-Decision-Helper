---
id: nmap
title: Nmap Recon Playbook
sidebar_label: Nmap
---

## Problem Scenario

Quickly identify live hosts, exposed services, and high-value targets without overwhelming the analyst with noise.

**When to Use:**
- Initial scoping of a new subnet or environment.
- Validating exposure of critical services before/after a change.
- Triage support when an alert mentions a host or IP range.

## Quick Commands

```bash
# Fast ping sweep (no port scan)
nmap -sn 10.0.10.0/24

# Top 1000 TCP ports, service/version detection
nmap -sV -sC -T4 10.0.10.50

# Full TCP scan with banner grabbing (slower, more thorough)
nmap -p- -sV -T3 10.0.10.50

# Scan a list of assets from file
nmap -sV -iL targets.txt -oA scans/targets-initial

# Stealthier SYN scan from SOC jumpbox
nmap -sS -T2 -Pn -n 10.0.20.0/24
```

## Decision Flow

- **Need quick visibility within 1–2 minutes?**
  - Use `-sn` or a default `-sV -sC -T4` against the smallest reasonable scope.
- **Need gap analysis / change validation?**
  - Reuse a known-good profile, save with `-oA`, and diff against previous scan output.
- **Incident in progress with suspected lateral movement?**
  - Start with **narrow scope**: alert source + immediate neighbors (e.g. `/28`), then expand.
- **Highly sensitive or fragile environment?**
  - Prefer slower timing templates (`-T2`), avoid `-sU` and full `-p-` unless explicitly approved.

## SOC Detection Indicators

- **Correlate Nmap usage**:
  - Look for processes invoking `nmap` on jump hosts, admin workstations, or CI/CD runners.
  - On Windows, correlate Sysmon process creation events with `Image` / `CommandLine` containing `nmap.exe`.
- **Network indicators**:
  - Bursts of connection attempts to many ports on a single host or sequential IPs in same subnet.
  - Frequent connection attempts with no payload (SYN only) from a single source.
- **Hunting ideas**:
  - Search firewall/NetFlow for sources hitting >50 distinct ports on the same host within 60 seconds.
  - Filter for internal hosts scanning RFC1918 ranges they do not normally communicate with.

## Next Investigation Steps

- Pivot into **service-specific analysis**:
  - Web: hand off to [Burp Suite Web Security](../web/burp.md).
  - SMB / RDP: review hardening baseline and check for credential spray/brute-force.
- Store scan output and attach to the incident record for future comparisons.
- If unauthorized scanning is suspected, **contain the source host** and review recent login activity.

## References

- Nmap Reference Guide: `https://nmap.org/book/man.html`
- Nmap Examples: `https://nmap.org/book/man-briefoptions.html`




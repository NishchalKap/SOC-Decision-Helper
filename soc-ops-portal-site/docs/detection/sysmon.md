---
id: sysmon
title: Sysmon Detection Playbook
sidebar_label: Sysmon
---

## Problem Scenario

Use Sysmon events to rapidly detect and investigate suspicious process, file, registry, and network activity on Windows endpoints.

**When to Use:**
- Windows-focused detection engineering and threat hunting.
- Enriching alerts from AV/EDR with low-level telemetry.
- Post-incident review to reconstruct attacker activity on hosts with Sysmon enabled.

## Quick Commands

```bash
# Install Sysmon with a recommended config (example)
sysmon64.exe -i sysmon-config.xml

# Show Sysmon status
sysmon64.exe -c

# PowerShell: query recent process creation events (Event ID 1)
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" `
  | Where-Object {$_.Id -eq 1} | Select-Object -First 20

# Example SIEM KQL (process creation)
SecurityEvent
| where EventID == 1
| project TimeGenerated, Computer, User, Image, CommandLine, ParentImage
```

## Decision Flow

- **Starting point**:
  - Verify Sysmon is deployed and using a hardened config (e.g. SwiftOnSecurity or org-tuned variant).
- **Triage workflow**:
  - Start with **ProcessCreate (ID 1)**, **NetworkConnect (ID 3)**, and **ImageLoad (ID 7)** for suspicious hosts.
- **Threat hunting**:
  - Focus on LOLBAS usage, script interpreters, unsigned binaries, and unusual parent-child pairs.

## SOC Detection Indicators

- **High-signal patterns**:
  - `powershell.exe` / `cmd.exe` spawned by Office processes or browser processes.
  - Script engines (`wscript`, `cscript`, `mshta`, `rundll32`) with suspicious command lines.
  - New services, scheduled tasks, or autoruns created outside of change windows.
- **Hunting ideas**:
  - Look for tools commonly used by attackers (e.g. `nmap`, `nc`, `mimikatz`) in Sysmon logs.
  - Identify rare processes making outbound network connections.

## Next Investigation Steps

- Turn hunting queries into:
  - Detection rules with tuning thresholds.
  - Dashboards for ongoing fleet health and anomaly tracking.
- Share high-confidence patterns with:
  - EDR engineering (for product-side detections).
  - IR team for playbook updates and case study write-ups.

## References

- Sysmon Docs: `https://learn.microsoft.com/sysinternals/downloads/sysmon`
- SwiftOnSecurity Config: `https://github.com/SwiftOnSecurity/sysmon-config`




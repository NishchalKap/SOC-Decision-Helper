---
id: siem-fundamentals
title: SIEM Fundamentals Playbook
sidebar_label: SIEM Fundamentals
---

## Problem Scenario

Provide a concise, operational view of how to use the SIEM for triage, correlation, and hunting—without deep vendor-specific detail.

**When to Use:**
- SOC onboarding for new analysts.
- Standardizing triage workflows across multiple SIEM products.
- Reviewing detection coverage and data onboarding.

## Quick Commands

Below are generic query examples; adapt syntax to your SIEM (KQL, SPL, SQL, etc.).

```text
-- Failed login burst by account
where EventID in (4625) 
| summarize count() by TargetUserName, bin(TimeGenerated, 5m)
| where count_ > 20

-- New process executions on critical servers
where EventID == 4688 and Computer in ("dc01","app-core-01")
| summarize count() by NewProcessName
| top 20 by count_

-- Rare outbound destinations
where Direction == "Outbound"
| summarize count() by DestinationIP
| where count_ < 5
```

## Decision Flow

- **During alert triage**:
  - Start from the alert, pivot to surrounding logs (before/after 30–60 minutes), then enrich with asset/user context.
- **For detection review**:
  - Identify which log sources are in the SIEM (AD, EDR, firewall, cloud), and where gaps exist.
- **For hunting**:
  - Start with a simple hypothesis (e.g. “credential theft via RDP brute-force”) and design 2–3 focused queries.

## SOC Detection Indicators

- **Core coverage**:
  - Authentication events, endpoint telemetry, DNS, proxy, firewall, and cloud control plane logs.
- **Reliability checks**:
  - Daily checks for ingestion gaps, parsing failures, and delayed data.
- **Hunting ideas**:
  - Rare processes per host role.
  - Newly seen external IPs with high connection counts.
  - Users logging in from new geographies or devices.

## Next Investigation Steps

- Maintain:
  - A **query library** of vetted triage and hunting queries.
  - Dashboards for core KPIs (alerts, MTTD/MTTR, ingestion health).
- Regularly review:
  - New log sources to onboard.
  - Detections that generate frequent false positives for tuning.

## References

- MITRE ATT&CK: `https://attack.mitre.org/`
- Sigma Rules (SIEM-agnostic): `https://github.com/SigmaHQ/sigma`




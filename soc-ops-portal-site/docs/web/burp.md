---
id: burp
title: Burp Suite Web Security Playbook
sidebar_label: Burp Suite
---

## Problem Scenario

Provide a fast, battle-tested workflow for assessing and exploiting web applications with Burp Suite.

**When to Use:**
- Web application testing during red teaming or penetration tests.
- Validating web-related alerts from WAF, IDS, or application logs.
- Reproducing reported vulnerabilities and confirming impact.

## Quick Commands

```bash
# Start Burp with a specific project and config (Pro)
burpsuite_pro --project-file=/path/to/proj.burp \
  --config-file=/path/to/user-options.json

# Simple proxy listener on 127.0.0.1:8080 (configure browser to use it)
# (Done via UI: Proxy > Options > Proxy Listeners)

# Save all HTTP history to file (for later evidence)
# (HTTP history tab > Save items > Include request/response)
```

## Decision Flow

- **Need quick triage of a single endpoint?**
  - Use **Proxy + Repeater** to capture and manually replay key requests.
- **Need broader coverage of an app?**
  - Use **Target > Site map** and **Scanner (Pro)** where allowed, starting with small, critical paths.
- **Investigating auth or session issues?**
  - Focus on **Repeater** and **Sequencer**, capturing login flows and tokens.
- **Working with APIs (REST/JSON)?**
  - Import OpenAPI/Swagger definitions if available; otherwise, use **Proxy** to learn request patterns.

## SOC Detection Indicators

- **Burp usage from unusual hosts**:
  - Monitor process executions of `burpsuite` on critical servers or shared admin hosts.
- **WAF / reverse proxy signals**:
  - Many similar requests in quick succession, parameter fuzzing patterns, obvious payload markers.
- **Hunting ideas**:
  - Look for user agents or header patterns typical of Burp scanning modules (if not normalized away).
  - Correlate error spikes (4xx/5xx) with a single client IP hitting many URLs.

## Next Investigation Steps

- Document:
  - Request/response pairs that demonstrate impact.
  - Authentication and session handling findings.
  - Any chained issues (e.g. IDOR + weak access control).
- Hand off confirmed vulnerabilities to engineering with reproduction steps and severity.
- Feed detection-relevant patterns (strange headers, payload markers) into WAF/SIEM rules.

## References

- Burp Suite Docs: `https://portswigger.net/burp/documentation`
- Web Security Academy: `https://portswigger.net/web-security`




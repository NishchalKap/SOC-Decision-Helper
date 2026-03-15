---
id: owasp-top-10
title: OWASP Top 10 Web Risk Playbook
sidebar_label: OWASP Top 10
---

## Problem Scenario

Map common web vulnerabilities to fast checks, exploitation patterns, and detection guidance aligned to the OWASP Top 10.

**When to Use:**
- Scoping a web security assessment to high-impact classes of issues.
- Interpreting alerts from WAF or SAST/DAST tools.
- Educating stakeholders on risk categories and concrete examples.

## Quick Commands

```bash
# Parameter fuzzing with common wordlist
ffuf -u https://app.example.com/FUZZ -w paths.txt -mc 200,302

# Basic SQLi check (manual) via curl
curl 'https://app.example.com/item?id=1%27%20OR%201=1--'

# Test for reflected XSS in a query parameter
curl 'https://app.example.com/search?q=%3Cscript%3Ealert(1)%3C/script%3E'

# Simple auth brute-force (only in approved tests)
hydra -L users.txt -P passwords.txt https-post-form \
  "/login:username=^USER^&password=^PASS^:F=Incorrect" app.example.com
```

## Decision Flow

- **Start broad, then go deep**:
  - Identify which OWASP categories are plausibly in-scope (e.g. access control vs crypto).
  - Use Burp Suite or your preferred tools to focus on those categories first.
- **For each confirmed issue**:
  - Classify by OWASP ID (e.g. A01: Broken Access Control).
  - Capture minimal PoC, clear impact statement, and recommended fix pattern.

## SOC Detection Indicators

- **Category-driven detections**:
  - **Auth & access control**: multiple 401/403/404s from same IP or account; enumeration patterns.
  - **Injection**: SQL error strings, suspicious payload fragments in parameters.
  - **XSS**: `<script>` or event handler strings in query/body where not expected.
- **Hunting ideas**:
  - Build SIEM queries per OWASP category to identify abnormal patterns over the past 7–30 days.
  - Cross-reference with WAF blocks and error logs to spot repeated attack paths.

## Next Investigation Steps

- For each identified issue:
  - Map to relevant OWASP guidance and your org’s secure coding standards.
  - Open a ticket with severity, exploitation steps, and detection coverage notes.
- Feed recurring patterns back into:
  - Secure coding training.
  - CI/CD security checks and pre-commit hooks.

## References

- OWASP Top 10: `https://owasp.org/www-project-top-ten/`
- OWASP Cheat Sheet Series: `https://cheatsheetseries.owasp.org/`




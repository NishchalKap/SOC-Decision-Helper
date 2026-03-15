---
id: osint
title: OSINT Recon Playbook
sidebar_label: OSINT
---

## Problem Scenario

Gather open-source intelligence about domains, IPs, infrastructure, and personas to support investigations and offensive planning.

**When to Use:**
- Pre-engagement recon for red team operations.
- Attribution and enrichment for phishing, C2 infrastructure, or suspicious domains.
- Context building around compromised accounts or leaked credentials.

## Quick Commands

```bash
# DNS & WHOIS
whois example.com
dig example.com ANY +short
dig -x 203.0.113.10 +short

# Certificate transparency (crt.sh)
curl 'https://crt.sh/?q=%25.example.com&output=json' | jq '.[].name_value' | sort -u

# Subdomain enumeration (assetfinder / subfinder style)
assetfinder --subs-only example.com | sort -u > subdomains.txt

# Passive IP reputation (abuseipdb as example)
curl -G 'https://api.abuseipdb.com/api/v2/check' \
  --data-urlencode "ipAddress=203.0.113.10" \
  -d maxAgeInDays=30 \
  -H "Key: <API_KEY>" \
  -H "Accept: application/json"
```

## Decision Flow

- **Investigating a domain from an alert?**
  - Start with WHOIS, DNS records, and certificate transparency to understand ownership and related hostnames.
- **Suspected phishing or brand abuse?**
  - Focus on lookalike domains, typosquats, registration dates, and hosting patterns.
- **Building a target surface for an engagement?**
  - Enumerate subdomains and external services, then prioritize based on exposure and business criticality.

## SOC Detection Indicators

- **Internal OSINT tooling usage**:
  - Track calls to external OSINT APIs from internal networks (e.g. `abuseipdb.com`, `virustotal.com`).
- **Defender-side OSINT alerts**:
  - Watch for many queries against domains already flagged as malicious or C2.
- **Hunting ideas**:
  - Find endpoints querying newly-registered domains (under 7 days old).
  - Identify browsing to paste sites or code hosting platforms associated with data leaks for your org.

## Next Investigation Steps

- Feed OSINT findings into:
  - Domain/IP block lists.
  - SIEM enrichment pipelines.
  - Red team target lists and scenario design.
- Attach key results (screenshots, WHOIS output, CT logs) to the case or engagement notes.

## References

- Awesome OSINT: `https://github.com/jivoi/awesome-osint`
- crt.sh interface: `https://crt.sh`
- AbuseIPDB: `https://www.abuseipdb.com/`




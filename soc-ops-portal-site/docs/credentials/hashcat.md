---
id: hashcat
title: Hashcat Credential Attack Playbook
sidebar_label: Hashcat
---

## Problem Scenario

Efficiently crack captured password hashes to validate credential strength and support incident investigations.

**When to Use:**
- Post-compromise investigations with recovered hash dumps.
- Password audit exercises under an approved red team or purple team engagement.
- Validating policy effectiveness (length, complexity, rotation) on real-world data.

## Quick Commands

```bash
# Identify hash type from sample
hashcat -m 0 --example-hashes | less

# Basic NTLM crack with rockyou (GPU)
hashcat -m 1000 -a 0 ntlm_hashes.txt rockyou.txt --session ntlm_audit

# Kerberos AS-REP roast hashes (mode 18200)
hashcat -m 18200 -a 0 asrep_hashes.txt wordlist.txt --force

# Resume an interrupted session
hashcat --session ntlm_audit --restore

# Show cracked results for a session
hashcat -m 1000 --show ntlm_hashes.txt
```

## Decision Flow

- **Is cracking authorized and in scope?**
  - Confirm legal and policy approvals before starting any cracking activity.
- **What is the hash type and volume?**
  - Use correct `-m` mode; prioritize hashes from high-privilege accounts.
- **Do you need speed or depth?**
  - Start with wordlists + common rules; only move to heavier brute-force if necessary and allowed.

## SOC Detection Indicators

- **Where Hashcat runs**:
  - It should only execute on designated cracking rigs or lab machines.
  - Any execution on production servers, DCs, or user workstations is suspicious.
- **Telemetry ideas**:
  - Monitor process names (`hashcat`, GPU utilization spikes).
  - Watch for large transfers of password databases or DC backup files.

## Next Investigation Steps

- Map cracked passwords to:
  - Affected accounts and privilege levels.
  - Policy violations (reuse, weak patterns, dictionary words).
- Coordinate with IAM and security leadership on:
  - Forced resets.
  - Targeted awareness for affected teams.
  - Policy and technical control updates (MFA, lockout, etc.).

## References

- Hashcat Wiki: `https://hashcat.net/wiki/`
- Example Hash Modes: `https://hashcat.net/wiki/doku.php?id=example_hashes`




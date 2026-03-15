---
id: volatility
title: Volatility Memory Forensics Playbook
sidebar_label: Volatility
---

## Problem Scenario

Use memory forensics to rapidly identify malicious processes, persistence, credentials, and in-memory artifacts.

**When to Use:**
- Suspected malware or intrusion on an endpoint or server.
- Ransomware incidents where hosts may be encrypted but memory images exist.
- IR cases where disk artifacts are limited or tampered with.

## Quick Commands

```bash
# Identify image info (Volatility 2)
volatility -f memdump.raw imageinfo

# List processes and suspicious ones
volatility -f memdump.raw --profile=Win7SP1x64 pslist
volatility -f memdump.raw --profile=Win7SP1x64 psxview

# List network connections
volatility -f memdump.raw --profile=Win7SP1x64 netscan

# Extract DLLs or malicious binaries
volatility -f memdump.raw --profile=Win7SP1x64 malfind --dump-dir=./malfind_dumps
```

For Volatility 3:

```bash
vol.py -f memdump.raw windows.info
vol.py -f memdump.raw windows.pslist
vol.py -f memdump.raw windows.netscan
vol.py -f memdump.raw windows.malfind --dump
```

## Decision Flow

- **First pass**:
  - Identify OS profile / symbol table, then enumerate processes and network connections.
- **Look for anomalies**:
  - Orphaned processes, unsigned binaries in unusual paths, suspicious parent-child relationships.
- **Scope containment**:
  - Use network connections and loaded modules to infer lateral movement or C2.

## SOC Detection Indicators

- **Collection telemetry**:
  - Memory acquisition should be done from trusted IR tooling; ad-hoc tools on endpoints may be suspicious.
- **Hunting ideas with memory images**:
  - Search for clear-text credentials, injected code regions, and known-bad strings.
  - Compare process lists with EDR telemetry to detect tampering or visibility gaps.

## Next Investigation Steps

- Export:
  - Suspicious binaries for sandboxing.
  - Relevant memory regions and configuration artifacts.
- Correlate with:
  - EDR events, logs, and network telemetry.
  - Other compromised hosts using similar artifacts or infrastructure.

## References

- Volatility Foundation: `https://www.volatilityfoundation.org/`
- Volatility 3 Docs: `https://volatility3.readthedocs.io/`




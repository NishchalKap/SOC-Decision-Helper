---
id: linux-forensics
title: Linux Forensics Command Library
sidebar_label: Linux Forensics
---

## Problem Scenario

Perform live triage on a Linux system to identify unauthorized access, persistence mechanisms, or active compromise.

**When to Use:**
- Responding to an IDS/EDR alert targeting a Linux server.
- Investigating suspected unauthorized SSH access.
- Triage resulting from anomalous outbound network traffic.

## Quick Commands

```bash
# View active network connections and associated processes
netstat -tulpn  # or `ss -tulpn`

# View all listening ports and established connections
lsof -i -n -P

# Check for unusual user accounts (looking for UID 0 besides root)
awk -F: '($3 == "0") {print}' /etc/passwd

# Check recent privileged command execution
cat /var/log/auth.log | grep -i "sudo"   # Debian/Ubuntu
cat /var/log/secure | grep -i "sudo"     # RHEL/CentOS

# Find hidden files (starting with .) modified in the last 7 days
find / -type f -name ".*" -mtime -7 2>/dev/null

# Review active scheduled tasks
cat /etc/crontab
ls -la /etc/cron.*
```

## Decision Flow

- **Is the system actively communicating with a known bad IP?**
  - Use `netstat` or `ss` to identify the process ID (PID).
  - Investigate the process binary in `/proc/<PID>/exe`.
- **Did an attacker gain access via SSH?**
  - Review `/var/log/auth.log` for successful logins.
  - Check `~/.ssh/authorized_keys` for newly added persistence keys.
- **Was malware executed and deleted?**
  - Check `/proc/<PID>/fd/` for memory-only execution or open handles to deleted files.
- **Is the binary a rootkit?**
  - If tools like `ps` or `netstat` are suspected to be tampered with, use alternative binaries or a forensic toolkit (e.g., BusyBox, osquery).

## SOC Detection Indicators

- Look for clearing of bash history (`history -c` or `ln -s /dev/null ~/.bash_history`).
- Unexpected addition to `/etc/sudoers` or `/etc/passwd`.
- Execution of defensive evasion tools (e.g., `touch -t` to modify timestamps/timestomp).

**Splunk Example (Linux Auth Logs):**
```spl
index=os sourcetype=syslog (message="*Failed password*" OR message="*Accepted*") 
| stats count by src_ip, user, action
```

## Next Investigation Steps

- Capture volatile data (RAM, network state) before powering down or rebooting.
- If a binary is identified as malicious, hash it (`sha256sum`) and search Threat Intel feeds.
- Freeze the endpoint (snapshot the VM) for a full disk forensic investigation using Autopsy or similar tools.

## References

- Linux Forensics Cheat Sheet: `https://sandflysecurity.com/linux-forensics-cheat-sheet/`
- OSQuery: `https://osquery.io/`

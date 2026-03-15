import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  socOpsSidebar: [
    {
      type: 'category',
      label: 'Tools & Commands',
      collapsible: true,
      collapsed: false,
      items: [
        'recon/nmap',
        'recon/masscan',
        'forensics/tcpdump',
        'forensics/wireshark',
        'forensics/volatility',
        'credentials/hashcat',
        'web/burp',
        'detection/sysmon',
        'forensics/linux-forensics',
        'incident_response/powershell-activity',
      ],
    },
    {
      type: 'category',
      label: 'Attack Types',
      collapsible: true,
      collapsed: false,
      items: [
        'recon/osint',
        'web/owasp-top-10',
        'web/web-exploitation',
        'incident_response/c2-beaconing',
      ],
    },
    {
      type: 'category',
      label: 'Incident Playbooks',
      collapsible: true,
      collapsed: false,
      items: [
        'incident_response/ransomware',
        'incident_response/powershell-activity',
        'detection/siem-fundamentals',
      ],
    },
  ],
};

export default sidebars;

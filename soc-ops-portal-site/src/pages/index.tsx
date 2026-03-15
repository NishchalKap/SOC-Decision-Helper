import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          Fast, actionable playbooks for security operations and offensive teams.
        </p>
        <div className={styles.searchContainer}>
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionQuickActions() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Quick Incident Actions</Heading>
          <p>High-severity playbooks tailored for immediate response.</p>
        </div>
        <div className={styles.cardsGrid}>
          <Link to="/docs/incident_response/c2-beaconing" className={clsx(styles.card, styles.cardAccentRow)}>
            <h3>C2 Beacon Investigation</h3>
            <p>Detect and contain suspected command-and-control outlines.</p>
          </Link>
          <Link to="/docs/incident_response/ransomware" className={clsx(styles.card, styles.cardAccentRow)}>
            <h3>Ransomware Response</h3>
            <p>High-speed triage and escalation checklist for file encryption events.</p>
          </Link>
          <Link to="/docs/incident_response/powershell-activity" className={clsx(styles.card, styles.cardAccentRow)}>
            <h3>Suspicious PowerShell</h3>
            <p>Analyze and decode malicious PowerShell executions and payloads.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionDomains() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Investigation Domains</Heading>
          <p>Core operational areas for offensive and defensive operations.</p>
        </div>
        <div className={styles.cardsGrid}>
          <Link to="/docs/recon/nmap" className={styles.card}>
            <h3>Recon</h3>
            <p>Host discovery, service mapping, and external exposure validation.</p>
          </Link>
          <Link to="/docs/web/burp" className={styles.card}>
            <h3>Web Security</h3>
            <p>Burp Suite fundamentals, OWASP Top 10, and web exploitation scenarios.</p>
          </Link>
          <Link to="/docs/detection/sysmon" className={styles.card}>
            <h3>Detection</h3>
            <p>Endpoint telemetry configuration and SIEM triage techniques.</p>
          </Link>
          <Link to="/docs/incident_response/ransomware" className={styles.card}>
            <h3>Incident Response</h3>
            <p>Actionable checklists for high-severity security incidents.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionCommandLibrary() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container text--center">
        <Heading as="h2">Command Library</Heading>
        <p className="margin-bottom--lg">Jump straight to specific tool syntaxes.</p>
        <div className={styles.quickNavButtons}>
          <Link className="button button--secondary button--lg" to="/docs/recon/nmap">Nmap</Link>
          <Link className="button button--secondary button--lg" to="/docs/forensics/wireshark">Wireshark</Link>
          <Link className="button button--secondary button--lg" to="/docs/detection/sysmon">Sysmon</Link>
          <Link className="button button--secondary button--lg" to="/docs/credentials/hashcat">Hashcat</Link>
          <Link className="button button--secondary button--lg" to="/docs/forensics/tcpdump">tcpdump</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="SOC and Red Team operations portal for fast, actionable playbooks.">
      <HomepageHeader />
      <main>
        <SectionQuickActions />
        <SectionDomains />
        <SectionCommandLibrary />
      </main>
    </Layout>
  );
}

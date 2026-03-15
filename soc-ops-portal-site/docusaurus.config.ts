import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SOC + Red Team Operations Portal',
  tagline: 'Fast, actionable playbooks for security operations and offensive teams.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://antigravity.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served.
  baseUrl: '/soc-ops-portal-site/',

  // GitHub pages deployment config.
  organizationName: 'antigravity',
  projectName: 'soc-ops-portal-site',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        language: ['en'],
      },
    ],
  ],

  themeConfig: {
    // Social card / preview image
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'SOC + Red Team Ops',
      logo: {
        alt: 'SOC + Red Team Ops Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'socOpsSidebar',
          position: 'left',
          label: 'Playbooks',
        },
        { to: '/docs/recon/nmap', label: 'Tools', position: 'left' },
        { to: '/docs/recon/osint', label: 'Attack Types', position: 'left' },
        {
          href: 'https://github.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Playbooks',
          items: [
            {
              label: 'Recon',
              to: '/docs/recon/nmap',
            },
            {
              label: 'Web Security',
              to: '/docs/web/burp',
            },
            {
              label: 'Detection',
              to: '/docs/detection/sysmon',
            },
            {
              label: 'Incident Response',
              to: '/docs/incident_response/ransomware',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'MITRE ATT&CK',
              href: 'https://attack.mitre.org/',
            },
            {
              label: 'OWASP Top 10',
              href: 'https://owasp.org/www-project-top-ten/',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'SOC + Red Team Operations Portal',
              to: '/',
            },
            {
              label: 'Fast, actionable playbooks for security operations and offensive teams.',
              to: '/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SOC + Red Team Operations Portal.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

const appMeta = {
  index: 'My Homepage',
  '#': {
    type: 'separator',
    title: 'Red-Teaming (CPTS/OSCP/CJCA)',
  },
  'Red-Teaming': {
    display: 'children',
  },
  '##': {
    type: 'separator',
    title: 'Certifications',
  },
  Certifications: {
    display: 'hidden',
  },
  'cert-cjca': {
    title: 'CJCA',
    href: '/Certifications/cjca',
  },
  '####': {
    type: 'separator',
    title: "CTF's",
  },
  CTF: {
    display: 'children',
  },
  '#####': {
    type: 'separator',
    title: 'Tools',
  },
  Tools: {
    display: 'hidden',
  },
  tool_nmap: {
    title: 'nmap',
    href: '/Tools/Nmap',
  },
  tool_rustscan: {
    title: 'rustscan',
    href: '/Tools/rustscan',
  },
  tool_hydra: {
    title: 'hydra',
    href: '/Tools/Hydra',
  },
  tool_netcat: {
    title: 'Netcat',
    href: '/Tools/Netcat',
  },
  tool_Ffuf: {
    title: 'Ffuf',
    href: '/Tools/Ffuf',
  },
  tool_meterpreter: {
    title: 'Meterpreter',
    href: '/Tools/Meterpreter',
  }
  
}

export default appMeta

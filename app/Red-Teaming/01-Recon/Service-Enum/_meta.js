const serviceEnumMeta = {
  'FTP': 'FTP/TFTP - 21,20,69(UDP)',
  'DNS': 'DNS - 53(UDP,TCP)',
  'IMAP': 'IMAP/POP3 - 143/993, 110/995',
  'IPMI': 'IPMI - 623',
  'MSSQL': 'MSSQL- 1433,2433,1434(UDP)',
  'MYSQL': 'MySQL - 3306',
  'RDP': 'RDP - 3389',
  'NFS': 'NFS - 111(UDP/TCP), 2049',
  'R-SERVICE': 'R-Services - 512, 513, 514',
  'ORACLE-TNS': 'Oracle TNS - 1521',
  'SMB': 'SMB - 137/138(UDP), 139/445(TCP) (Samba/NetBIOS)',
  'SMTP': 'SMTP - 25, 587, 465',
  'R-SYNC': 'R-Sync - 873',
  'WMI': 'WMI - 135',
  'SSH': 'SSH - 22',
  'WinRM': 'WinRM - 5985, 5986',
  'WMI': 'WMI - 135',
  'SNMP': 'SNMP - 161, 162',
}

export default serviceEnumMeta

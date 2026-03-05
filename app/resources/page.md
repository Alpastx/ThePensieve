## Cheatsheet

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 HOST DISCOVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Scan network range (alive hosts)
sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5 > alive-ips.txt

# TCP SYN ping sweep
nmap -sn -PS22,80,443 <SUBNET>/24 -oG tcpsyn-ping-sweep.gnmap

# ARP discovery (local network)
sudo nmap -sn -PR <SUBNET>/24 -oG arp-scan.gnmap

# Extract live IPs from sweep output
grep "Up" sweep.gnmap | cut -d" " -f2


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PORT SCANNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Fast full TCP port scan
nmap -p- --min-rate 10000 -Pn -oA scans/allports <IP>

# UDP top 20 ports
sudo nmap -sU --top-ports 20 -oA scans/udp <IP>

# Extract open ports from grepable output
grep -oP '\d+/open' scan.gnmap | cut -d'/' -f1 | sort -n | tr '\n' ','

# Skip ping (ICMP blocked)
nmap -Pn -sCV -oA scans/noping <IP>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SERVICE & VERSION DETECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Version detection on open ports
nmap -sV -p <PORTS> -oA scans/versions <IP>

# Version + default scripts
nmap -sCV -p <PORTS> -oA scans/detailed <IP>

# Top 1000 ports + versions + scripts
nmap -sCV -oA scans/initial <IP>

# OS detection
sudo nmap -O --osscan-guess <IP>

# Aggressive host enumeration (OS + versions + scripts + traceroute)
sudo nmap -A <IP>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 NSE SCRIPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Web server scripts
nmap -sCV -p 80,443,8080,8443 --script "http-*" -oA scans/web <IP>

# All SMB scripts
nmap --script="smb-*" -p 445 <IP>

# Specific NSE script
nmap --script=http-enum -p 80 <IP>

# Vuln scan on open ports
sudo nmap --script vuln -p <PORTS> -oA scans/vulns <IP>

# Vuln + safe scripts
nmap --script="vuln and safe" <IP>

# Find available scripts for a service
ls /usr/share/nmap/scripts/ | grep <SERVICE>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 NETWORK-WIDE SCANNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Key ports across entire network
nmap -p 21,22,25,80,88,135,139,443,445,3389,5985 \
     -iL live_hosts.txt -oA scans/key_ports

# Full scan from host list
nmap -sCV -iL live_hosts.txt -oA scans/network_scan


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EVASION / FIREWALL BYPASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Source port bypass (spoof as DNS)
nmap --source-port 53 -p <PORTS> <IP>

# Fragment packets
nmap -f -p <PORTS> <IP>

# Decoy scan (10 random decoys)
nmap -D RND:10 -p <PORTS> <IP>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 OUTPUT & REPORTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Output flags: -oN (normal)  -oG (grepable)  -oX (XML)  -oA (all three)

# Convert XML scan to HTML report
xsltproc scan.xml -o scan.html
```

```bash
# Scan Network Range
sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5 > Alive-ips

# TCP SYN ping sweep
nmap -sn -PS22,80,443 <SUBNET>/24 -oG TCPSYN-Ping-Sweep

# ARP discovery
sudo nmap -sn -PR <SUBNET>/24 -oG ARP-Scan

# Extract live IPs from sweep
grep "Up" sweep.gnmap | cut -d" " -f2

# OS detection
sudo nmap -O --osscan-guess <IP>

# Aggressive host enum
sudo nmap -A <IP>

# Fast full TCP port scan
nmap -p- --min-rate 10000 -Pn -oA scans/allports <IP>

# UDP top 20 ports
sudo nmap -sU --top-ports 20 -oA scans/udp <IP>

# Extract open ports (grepable)
grep -oP '\d+/open' scan.gnmap | cut -d'/' -f1 | sort -n | tr '\n' ','

# Version detection on open ports
nmap -sV -p <PORTS> -oA scans/versions <IP>

# Version + default scripts
nmap -sCV -p <PORTS> -oA scans/detailed <IP>

# Top 1000 + versions + scripts
nmap -sCV -oA scans/initial <IP>

# Skip ping (ICMP blocked)
nmap -Pn -sCV -oA scans/noping <IP>

# Web server scripts
nmap -sCV -p 80,443,8080,8443 --script "http-*" -oA scans/web <IP>

# All SMB scripts
nmap --script="smb-*" -p445 <IP>

# Specific NSE script
nmap --script=http-enum -p80 <IP>

# Find available scripts
ls /usr/share/nmap/scripts/ | grep <SERVICE>

# Vuln scan on open ports
sudo nmap --script vuln -p <PORTS> -oA scans/vulns <IP>

# Vuln + safe scripts
nmap --script="vuln and safe" <IP>

# Key ports across network
nmap -p 21,22,25,80,88,135,139,443,445,3389,5985 -iL live_hosts.txt -oA scans/key_ports

# Scan from host list
nmap -sCV -iL live_hosts.txt -oA scans/network_scan

# Bypass firewall (source port)
nmap --source-port 53 -p <PORTS> <IP>

# Fragment packets (evasion)
nmap -f -p <PORTS> <IP>

# Decoy scan (evasion)
nmap -D RND:10 -p <PORTS> <IP>

# Convert XML to HTML report
xsltproc scan.xml -o scan.html
```

---

## Methodology

> [!IMPORTANT]
> Follow this checklist for every engagement. The flow is: discover hosts → learn about them → find open ports → fingerprint services → run targeted scripts → check for vulns. Never skip UDP.

### Phase 1: Host Discovery

- [ ] `mkdir -p scans` - Create output directory
- [ ] `nmap -sn <SUBNET>/24 -oG sweep.gnmap` - Ping sweep to find live hosts
- [ ] `nmap -sn -PS22,80,443 <SUBNET>/24 -oG sweep_syn.gnmap` - TCP SYN ping sweep (catches hosts blocking ICMP)
- [ ] `sudo nmap -sn -PR <SUBNET>/24` - ARP discovery if on same subnet (most reliable for local networks)
- [ ] `grep "Up" sweep.gnmap | cut -d" " -f2 > live_hosts.txt` - Extract live IPs to a file
- [ ] Review `live_hosts.txt` and note all targets for further enumeration

> [!TIP]
> **Pentest Tip:** If a host doesn't respond to ping sweep, it may be blocking ICMP. Don't write it off try `-Pn` in later phases to scan it anyway. Combine multiple discovery techniques (`-PS`, `-PA`, `-PU`, `-PE`) to maximize coverage.

### Phase 2: Host Enumeration

- [ ] `sudo nmap -O --osscan-guess -oA scans/os_detect <IP>` - OS fingerprinting on each target
- [ ] `sudo nmap -sn --traceroute <IP>` - Traceroute to understand network topology
- [ ] Note OS family (Windows/Linux), TTL values, and hop count for each host
- [ ] Identify high-value targets: Domain Controllers (88/464 open), web servers, database servers
- [ ] Group targets by OS and priority for efficient scanning in next phases

> [!TIP]
> **Pentest Tip:** TTL values give quick OS hints without a full scan: TTL 64 = Linux, TTL 128 = Windows, TTL 255 = network device. Use this to plan your attack toolset before going deeper.

### Phase 3: Port Scanning

- [ ] `sudo nmap -p- --min-rate 10000 -Pn -oA scans/allports <IP>` - Fast scan all 65535 TCP ports
- [ ] `ports=$(grep -oP '\d+/open' scans/allports.gnmap | cut -d'/' -f1 | tr '\n' ',' | sed 's/,$//')` - Extract open ports into variable
- [ ] `sudo nmap -sU --top-ports 20 -oA scans/udp <IP>` - UDP top 20 (SNMP 161, TFTP 69, DNS 53 are common wins)
- [ ] Review port list: note unusual/high ports that may hide non-standard services
- [ ] For network-wide scan: `nmap -p 21,22,25,80,88,135,139,443,445,3389,5985 -iL live_hosts.txt -oA scans/key_ports`

> [!CAUTION]
> **OPSEC Warning:** `--min-rate 10000` is loud and fast. In real engagements, lower the rate or use `--scan-delay` to avoid detection. In exams/labs


### Phase 4: Version & Service Detection

- [ ] `nmap -sV -p $ports -oA scans/versions <IP>` - Version detection only (lightweight)
- [ ] `nmap -sCV -p $ports -oA scans/detailed <IP>` - Version detection + default NSE scripts (more thorough)
- [ ] Review output carefully: note exact service versions, banners, hostnames, domain names
- [ ] Add any discovered hostnames/domains to `/etc/hosts`
- [ ] Cross-reference service versions against known CVEs (searchsploit, Google)
- [ ] Check for unusual version strings that indicate custom/vulnerable software

> [!TIP]
> **Pentest Tip:** Pay attention to version numbers — an outdated Apache, OpenSSH, or ProFTPD is an easy win. Run `searchsploit <service> <version>` immediately for anything that looks old.

### Phase 5: Targeted NSE Scripts

- [ ] If HTTP found: `nmap --script="http-*" -p <HTTP_PORTS> <IP>` - Web enumeration
- [ ] If SMB found (445): `nmap --script="smb-*" -p445 <IP>` - Share enum, user enum, OS discovery
- [ ] If FTP found (21): `nmap --script="ftp-*" -p21 <IP>` - Check anonymous access
- [ ] If DNS found (53): `nmap --script=dns-zone-transfer,dns-brute -p53 <IP>` - Zone transfer + brute
- [ ] If SNMP found (161): `nmap --script=snmp-brute -p161 <IP>` - Community strings
- [ ] If MSSQL found (1433): `nmap --script=ms-sql-info,ms-sql-empty-password -p1433 <IP>` - Info + empty pass
- [ ] If MySQL found (3306): `nmap --script=mysql-empty-password,mysql-info -p3306 <IP>` - Empty pass check
- [ ] If RDP found (3389): `nmap --script=rdp-enum-encryption -p3389 <IP>` - RDP checks
- [ ] If SSH found (22): `nmap --script=ssh-auth-methods -p22 <IP>` - Auth method check

### Phase 6: Vulnerability Scanning

- [ ] `sudo nmap --script vuln -p $ports -oA scans/vulns <IP>` - General vuln check against all open ports
- [ ] If SMB: check `smb-vuln-ms17-010` (EternalBlue), `smb-vuln-ms08-067` output
- [ ] If HTTP: check `http-shellshock`, `http-vuln-cve*` output
- [ ] Cross-reference any CVEs found with exploit-db/searchsploit
- [ ] Re-scan after obtaining credentials — authenticated scans reveal significantly more

### If Scan is Slow or Blocked

- [ ] Try `--min-rate 5000` to speed up
- [ ] Try `-Pn` if host seems down (may be blocking ICMP)
- [ ] Try `--source-port 53` to bypass lazy firewall rules allowing DNS
- [ ] Try `-f` to fragment packets past IDS/IPS
- [ ] Try `-D RND:10` to use decoys and obscure your real IP
- [ ] Split scan range: `-p 1-32767` then `-p 32768-65535`
- [ ] Try different scan type: `-sN` (NULL), `-sF` (FIN), `-sX` (Xmas) to evade stateless firewalls

---

## Scan Types

| Flag | Scan Type | Description | Root Required |
|------|-----------|-------------|:---:|
| `-sS` | SYN (Stealth) | Half-open scan, default with root | Yes |
| `-sT` | TCP Connect | Full 3-way handshake, default without root | No |
| `-sU` | UDP | UDP port scan (slow) | Yes |
| `-sA` | ACK | Firewall rule detection | Yes |
| `-sN` | NULL | No flags set (firewall evasion) | Yes |
| `-sF` | FIN | FIN flag only (firewall evasion) | Yes |
| `-sX` | Xmas | FIN+PSH+URG flags (firewall evasion) | Yes |
| `-sV` | Version | Service version detection | No |
| `-sC` | Scripts | Run default NSE scripts | No |
| `-sn` | Ping Sweep | Host discovery only, no port scan | No |

> [!TIP]
> **Pentest Tip:** `-sS` (SYN) is stealthier than `-sT` (Connect) because it never completes the handshake. Use `-sS` when stealth matters. For firewall evasion, try NULL/FIN/Xmas scans - they exploit ambiguity in how firewalls handle non-standard flag combinations.

---

## Essential Switches

### Host Discovery

| Flag | Description |
|------|-------------|
| `-sn` | Ping scan only (no port scan) |
| `-Pn` | Skip host discovery (treat all as online) |
| `-PS <PORTS>` | TCP SYN ping |
| `-PA <PORTS>` | TCP ACK ping |
| `-PU <PORTS>` | UDP ping |
| `-PE` | ICMP echo ping |
| `-n` | No DNS resolution (faster) |
| `-iL <FILE>` | Scan targets from file |

### Port Specification

| Flag | Description |
|------|-------------|
| `-p 22` | Single port |
| `-p 22,80,443` | Multiple ports |
| `-p 1-1000` | Port range |
| `-p-` | All 65535 ports |
| `--top-ports 100` | Top N most common ports |
| `-p U:53,T:80` | Specific protocol ports |

### Output

| Flag | Description |
|------|-------------|
| `-oN file` | Normal output |
| `-oG file` | Grepable output |
| `-oX file` | XML output |
| `-oA basename` | All three formats (always use this) |
| `-v` / `-vv` | Increase verbosity |

> [!IMPORTANT]
> Always use `-oA` to save in all formats. You need the output for your report, and grepable format is essential for extracting ports programmatically.

### Timing & Performance

| Flag | Description |
|------|-------------|
| `-T0` to `-T5` | Timing template (0=paranoid, 5=insane) |
| `-T4` | Aggressive timing (good for CTF/labs) |
| `--min-rate N` | Minimum packets per second |
| `--max-retries N` | Max probe retransmissions |
| `--scan-delay 1s` | Delay between probes (IDS evasion) |

### Firewall / IDS Evasion

| Flag | Description |
|------|-------------|
| `-f` | Fragment packets |
| `-D RND:10` | Decoy scan (10 random IPs) |
| `-S <IP>` | Spoof source IP |
| `--source-port 53` | Spoof source port (try 53 or 80) |
| `--data-length 25` | Append random data to packets |
| `--badsum` | Send bad checksum (detect IDS/proxy) |

> [!TIP]
> **Pentest Tip:** `--source-port 53` exploits lazy firewall rules that allow all traffic from port 53 (DNS). Try it when scans are being filtered.

---

## Port States

| State | Meaning |
|-------|---------|
| `open` | Service is accepting connections (TCP/UDP/SCTP) |
| `closed` | Port is accessible but no service is listening (RST received) |
| `filtered` | Nmap cannot determine state - firewall/packet filter is blocking probes |
| `unfiltered` | Port is accessible but open/closed status unknown (ACK scan only) |
| `open\|filtered` | No response received - firewall may be protecting the port |
| `closed\|filtered` | Cannot determine if closed or filtered (IP ID idle scan only) |

---

## NSE (Nmap Scripting Engine)

### Script Categories

| Category | Description |
|----------|-------------|
| `default` | Safe, useful scripts (same as `-sC`) |
| `safe` | Won't crash services |
| `vuln` | Check for vulnerabilities |
| `exploit` | Attempt exploitation |
| `auth` | Authentication checks |
| `brute` | Brute force attacks |
| `discovery` | Service/host discovery |
| `intrusive` | May crash services |

### Script Usage

```bash
# Run default scripts (same as -sC)
nmap --script=default <IP>

# Vulnerability scan
nmap --script=vuln <IP>

# Specific script
nmap --script=http-enum -p80 <IP>

# Multiple categories
nmap --script="vuln and safe" <IP>

# Script with arguments
nmap --script=http-put --script-args http-put.url='/shell.php',http-put.file='shell.php' <IP>

# All scripts for a service
nmap --script="smb-*" -p445 <IP>

# Find available scripts
ls /usr/share/nmap/scripts/ | grep <SERVICE>
nmap --script-help "smb*"
```

### Must-Know NSE Scripts

| Script | Port | Purpose |
|--------|------|---------|
| `http-enum` | 80/443 | Web directory enumeration |
| `http-title` | 80/443 | Page title |
| `http-methods` | 80/443 | Allowed HTTP methods |
| `http-shellshock` | 80/443 | Shellshock check |
| `http-robots.txt` | 80/443 | Robots.txt contents |
| `smb-enum-shares` | 445 | SMB share enumeration |
| `smb-enum-users` | 445 | SMB user enumeration |
| `smb-vuln-ms17-010` | 445 | EternalBlue check |
| `smb-os-discovery` | 445 | OS fingerprinting via SMB |
| `ftp-anon` | 21 | Anonymous FTP check |
| `dns-zone-transfer` | 53 | AXFR attempt |
| `dns-brute` | 53 | Subdomain brute force |
| `ssh-auth-methods` | 22 | SSH auth methods |
| `mysql-empty-password` | 3306 | MySQL no-password check |
| `ms-sql-info` | 1433 | MSSQL information |
| `snmp-brute` | 161 | SNMP community strings |
| `rdp-enum-encryption` | 3389 | RDP encryption check |
| `vuln` | any | General vulnerability checks |

---

## Output Parsing

```bash
# Extract open ports from grepable output
grep -oP '\d+/open' scan.gnmap | cut -d'/' -f1 | sort -n | tr '\n' ','

# Extract open ports into a variable
ports=$(grep -oP '\d+/open' scan.gnmap | cut -d'/' -f1 | tr '\n' ',' | sed 's/,$//')

# Extract live IPs from ping sweep
grep "Up" sweep.gnmap | cut -d" " -f2

# Quick view of open services
grep "open" scan.nmap

# Convert XML to HTML report
xsltproc scan.xml -o scan.html
```

---

## Exam Tips

> [!IMPORTANT]
> - **Always save output** with `-oA` - you need it for the report
> - **Never skip UDP** - SNMP (161), TFTP (69), DNS (53) are common exam wins
> - **Run full port scan** (`-p-`) - services on high ports are common in exams
> - **Use `-Pn`** if host seems down - it might be blocking ICMP
> - **Re-scan after getting creds** - authenticated scans reveal more

> [!TIP]
> **Pentest Tip:** `--source-port 53` can bypass lazy firewall rules. If a scan returns mostly filtered ports, re-run with this flag.

> [!TIP]
> **Pentest Tip:** If nmap is slow, split the scan into two halves:
> ```bash
> nmap -p 1-32767 --min-rate 10000 <IP>
> nmap -p 32768-65535 --min-rate 10000 <IP>
> ```

> [!CAUTION]
> **OPSEC Warning:** `-T5` and high `--min-rate` values generate heavy traffic and are easily detected. Use `-T2` or `--scan-delay` in real engagements where stealth matters.

---

#cpts #oscp #nmap #scanning #enumeration #recon #tools

Scrap 

| Task                                | Command                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| **Scan Network Rnage**              | `sudo nmap 10.129.2.0/24 -sn -oA tnet \| grep for \| cut -d" " -f5 > Alive-ips`           |
| **TCP SYN ping sweep**              | `nmap -sn -PS22,80,443 <SUBNET>/24 -oG TCPSYN-Ping-Sweep`                                 |
| **ARP discovery**                   | `sudo nmap -sn -PR <SUBNET>/24 -oG ARP-Scan`                                              |
| **Extract live IPs from sweep**     | `grep "Up" sweep.gnmap \| cut -d" " -f2`                                                  |
| **OS detection**                    | `sudo nmap -O --osscan-guess <IP>`                                                        |
| **Aggressive host enum**            | `sudo nmap -A <IP>`                                                                       |
| **Fast full TCP port scan**         | `nmap -p- --min-rate 10000 -Pn -oA scans/allports <IP>`                                   |
| **UDP top 20 ports**                | `sudo nmap -sU --top-ports 20 -oA scans/udp <IP>`                                         |
| **Extract open ports (grepable)**   | `grep -oP '\d+/open' scan.gnmap \| cut -d'/' -f1 \| sort -n \| tr '\n' ','`               |
| **Version detection on open ports** | `nmap -sV -p <PORTS> -oA scans/versions <IP>`                                             |
| **Version + default scripts**       | `nmap -sCV -p <PORTS> -oA scans/detailed <IP>`                                            |
| **Top 1000 + versions + scripts**   | `nmap -sCV -oA scans/initial <IP>`                                                        |
| **Skip ping (ICMP blocked)**        | `nmap -Pn -sCV -oA scans/noping <IP>`                                                     |
| **Web server scripts**              | `nmap -sCV -p 80,443,8080,8443 --script "http-*" -oA scans/web <IP>`                      |
| **All SMB scripts**                 | `nmap --script="smb-*" -p445 <IP>`                                                        |
| **Specific NSE script**             | `nmap --script=http-enum -p80 <IP>`                                                       |
| **Find available scripts**          | `ls /usr/share/nmap/scripts/ \| grep <SERVICE>`                                           |
| **Vuln scan on open ports**         | `sudo nmap --script vuln -p <PORTS> -oA scans/vulns <IP>`                                 |
| **Vuln + safe scripts**             | `nmap --script="vuln and safe" <IP>`                                                      |
| **Key ports across network**        | `nmap -p 21,22,25,80,88,135,139,443,445,3389,5985 -iL live_hosts.txt -oA scans/key_ports` |
| **Scan from host list**             | `nmap -sCV -iL live_hosts.txt -oA scans/network_scan`                                     |
| **Bypass firewall (source port)**   | `nmap --source-port 53 -p <PORTS> <IP>`                                                   |
| **Fragment packets (evasion)**      | `nmap -f -p <PORTS> <IP>`                                                                 |
| **Decoy scan (evasion)**            | `nmap -D RND:10 -p <PORTS> <IP>`                                                          |
| **Convert XML to HTML report**      | `xsltproc scan.xml -o scan.html`                                                          |
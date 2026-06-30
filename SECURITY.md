# Security Policy (SECURITY.md)

## Supported Versions

We actively monitor and secure the static components of this portfolio site.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅ Yes    |
| < 1.0.0 | ❌ No     |

## Vulnerability Reporting

If you identify a security vulnerability or threat vector within this repository, please report it immediately:
1. Send an encrypted email transmission to: **shrazzz06@gmail.com**
2. Include a detailed proof-of-concept (PoC) illustrating the exploit vector.
3. We follow responsible disclosure protocols and will review your report within 48 hours.

---

## Defensive Measures Implemented

### 1. Cross-Site Scripting (XSS) Mitigation
All user-facing forms sanitize input data at the boundary interface:
- DOM insertions utilize `textContent` or sanitized strings rather than raw `innerHTML`.
- Regular expression patterns strip out `<script>` tags, angled brackets, and HTML entities (`<` and `>` are replaced with safe entities `&lt;` and `&gt;`).

### 2. Dependency Verification
- No third-party javascript frameworks or build dependencies are used, mitigating supply chain exploits and script injection vulnerabilities.
- FontAwesome and Google Fonts resources are imported from verified, secure CDN domains with standard HTTPS/TLS endpoints.

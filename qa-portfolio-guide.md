# QA Portfolio Tailoring Guide
**Jian Marie Hilario · jm-professional-portfolio.vercel.app**

> You don't need new projects. You have real QA work — it just isn't labeled as QA yet.

---

## 1. Page Title

**Current:**
```
Jian Marie — Graphic Designer, Front End Developer & UI/UX Designer | Portfolio
```

**New:**
```
Jian Marie — Software Quality Analyst | Full-Stack Developer & UI/UX Designer | Portfolio
```

---

## 2. Meta Description

```
DOST Merit Scholar · IT graduate (Summa Cum Laude) with experience in software QA, full-stack development, and UI/UX design. Former SM Investments intern.
```

---

## 3. Hero Headline

Pick one:

**Option A — Balanced (recommended)**
```
Full-Stack Developer · Software Quality Analyst · UI/UX Designer
```

**Option B — QA-forward**
```
Software Quality Analyst
I build software — and I know exactly where it breaks.
```

**Option C — Story-driven**
```
Developer turned QA.
I've written the code, shipped the features, and found the bugs.
Now I do it for a living.
```

---

## 4. QA Bio Paragraph

Add to your About section:

> During my internship at SM Investments Corporation, I found that the work I cared about most was making sure what we built actually worked — executing data validation checkpoints across Scrum sprints, identifying discrepancies between expected and actual data behavior, and ensuring zero integrity issues reached production. That experience, combined with end-to-end functional testing of the RBAC system in my capstone project, solidified my direction: I want to apply my development background to quality assurance. As someone who has written production code in React, Node.js, and MongoDB, I know how bugs get introduced — and that makes me better at finding them. I'm currently pursuing QA roles where I can bring a developer's intuition to a testing team.

---

## 5. SM Internship — Rewritten Bullets

**Treasury Automation Intern — SM Investments Corporation (Jan–Apr 2026)**

- **BI Engineering & Automation:** Developed enterprise-level Pricing & Market Dashboards on Apache Superset, automating manual Excel workflows and reducing reporting preparation time by 40% for the Treasury department.

- **Functional & Data Validation Testing:** Executed data validation testing across 4-week Scrum sprints — verifying dashboard outputs against source pipeline data before each production deployment. Authored Technical SOPs documenting test procedures and acceptance criteria, maintaining zero data integrity issues across all production releases.

- **Defect Identification & Reporting:** Conducted systematic defect identification across dashboard features and data pipelines — comparing expected vs. actual values, logging discrepancies with reproduction steps, severity assessment, and resolution documentation. Communicated structured test findings directly to Treasury stakeholders through written progress updates.

- **UI/UX & Frontend Optimization:** Authored a custom CSS framework adopted at 100% by internal stakeholders, establishing new enterprise design standards for dashboard layouts and responsive typography.

---

## 6. SCO Capstone — Rewritten Bullets

**SCO – Service & Creative Optimization System (Capstone, 2024–2026)**
*Node.js · Express.js · MongoDB · Socket.IO · TypeScript · Vite*

- **Full-Stack System Architecture:** Designed and built a secure, role-based task management system with automated service request routing, file handling, and RBAC enforcement.

- **QA — Functional Test Design & Execution:** Designed and executed an end-to-end functional test plan for RBAC logic across 3 user personas (Admin, Requester, Processor) — defining test cases per role, identifying privilege escalation paths as negative test scenarios, and confirming zero unauthorized access at deployment.

- **QA — Integration Testing:** Conducted system integration testing on service request routing flows, verifying requests were correctly assigned and tracked across all user states with no routing failures at release.

- **Real-Time Features:** Integrated Socket.IO for live status updates and automated Excel/PDF report generation, streamlining administrative workflows.

---

## 7. CareSync — Add This Bullet

- **Role-Based Testing:** Verified correct data routing and UI rendering for both user roles (Elder, Caregiver) through manual functional testing — confirming role-specific views displayed correct data and authentication redirects behaved as expected.

---

## 8. New "QA & Testing" Portfolio Section

### Section Heading
```
QA & Testing Work
```

### Section Intro
> I approach quality assurance from a developer's perspective — having built production systems in React, Node.js, and MongoDB, I understand where bugs are most likely to hide. Below is a selection of testing work from my internship and academic projects, including functional test designs and data validation activities conducted within real Scrum environments.

---

### Card 1 — Treasury Dashboard QA (SM Investments)

**Title:** Treasury Dashboard QA
**Period:** January – April 2026
**Type:** Data Validation · Functional Testing · Agile/Scrum

Executed data validation checkpoints at the close of each 4-week Scrum sprint — comparing expected vs. actual values across dashboard reports, logging discrepancies with reproduction steps, and authoring Technical SOPs documenting test procedures and acceptance criteria. Zero data integrity issues across all production releases.

---

### Card 2 — RBAC Functional Testing (SCO Capstone)

**Title:** RBAC Functional Testing
**Period:** 2024–2026
**Type:** Functional Testing · Security Testing · Test Case Design

Designed and executed a functional test plan for RBAC logic across 3 user personas (Admin, Requester, Processor) — defining test cases per role, executing negative testing (privilege escalation via direct URL, parameter manipulation, UI bypass), and confirming zero unauthorized access at deployment.

---

### Card 3 — Role-Based Mobile Testing (CareSync)

**Title:** Role-Based Mobile Testing
**Period:** October–December 2025
**Type:** Functional Testing · Mobile · Firebase Auth

Verified role-specific UI rendering and data routing for Elder and Caregiver user types — testing Firebase authentication redirects, navigation flows, and StreamBuilder data rendering under both user contexts.

---

## 9. Sample Test Case Tables

### RBAC Functional Tests — SCO Capstone

| TC-ID | Test Case | Precondition | Steps | Expected Result | Status |
|-------|-----------|--------------|-------|-----------------|--------|
| TC-01 | Admin can access all modules | Logged in as Admin | Navigate to Dashboard → User Management → Processor panel | All panels visible and accessible | PASS |
| TC-02 | Requester cannot access Admin panel | Logged in as Requester | Attempt to navigate to /admin via direct URL | Redirect to Unauthorized page | PASS |
| TC-03 | Processor cannot delete requests | Logged in as Processor | Open an assigned request → look for Delete option | No Delete button visible or accessible | PASS |
| TC-04 | Privilege escalation via URL manipulation | Logged in as Requester | Note an Admin-only resource URL → enter it directly | Redirect to Unauthorized / 403 response | PASS |
| TC-05 | Session persistence after page refresh | Logged in as any role | Refresh the browser → check role-specific UI | Correct role-based UI persists after refresh | PASS |

### Data Validation Tests — SM Internship

| TC-ID | Test Case | Test Data | Expected Result | Actual Result | Status |
|-------|-----------|-----------|-----------------|---------------|--------|
| DV-01 | Dashboard price matches source pipeline value | Source: PHP 104.50 | Dashboard displays PHP 104.50 | PHP 104.50 | PASS |
| DV-02 | Null source value handled gracefully | Source field: NULL | Dashboard displays "—" or "N/A", not error | Dashboard shows "—" | PASS |
| DV-03 | Dashboard updates after pipeline refresh | Source changes: 104.50 → 106.00 | Dashboard shows updated value after refresh | 106.00 after next pipeline run | PASS |
| DV-04 | Negative price value displays correctly | Source: -12.30 | Dashboard shows -12.30 (not 12.30 or error) | -12.30 | PASS |

---

## 10. Implementation Roadmap

| # | Change | Time | Do Tonight? |
|---|--------|------|-------------|
| 1 | Update page title + hero headline | 15 min | ✅ Yes |
| 2 | Rewrite SM Internship bullets | 20 min | ✅ Yes |
| 3 | Rewrite SCO Capstone bullets | 20 min | ✅ Yes |
| 4 | Add QA bio paragraph | 10 min | ✅ Yes |
| 5 | Add test case tables to project cards | 1–2 hrs | Optional |
| 6 | Build dedicated "QA & Testing" section | 2–4 hrs | After interview |
| 7 | Add Playwright/Cypress mini-demo | 1–2 days | Future |

---

*Items 1–4 tonight = biggest impact, least time. The rest can be polished after your interview. Good luck tomorrow! 💜*

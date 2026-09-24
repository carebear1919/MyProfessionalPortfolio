# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Employers and hiring managers evaluating Jian Marie Hilario for roles across software quality assurance, full-stack development and UI/UX design, weighted equally. They arrive with limited time and want quick proof of capability, then depth on the work that matches the role they are hiring for. Freelance clients are a secondary audience reached through the Services section.

## Product Purpose

A personal portfolio site for a recent IT graduate (Cavite, Philippines) that shows real shipped work, real testing evidence and a clear career story, so a reader can decide to interview or contact. Success is an employer or client reaching the Contact section, opening the resume, or opening the S-CORE test report after seeing the work.

## Positioning

A DOST Merit Scholar and Summa Cum Laude IT graduate who covers the full loop: builds full-stack systems, tests them, and designs their interfaces, backed by an industry internship (SM Investments Corporation, Treasury Automation, Jan to Apr 2026) and live deployed projects.

## Operating Context

Read on desktop and mobile by people scanning quickly, often from a resume or job application link. Deployed on Vercel. The site is a single-page React app with a fixed top bar (name, section links, Resume; a menu button on phones) and sections: Home, Work, Quality, About, Services, Contact. Deep evidence lives in the project registry (screenshots, live links), the S-CORE test report (embedded Google Doc), and the resume PDF.

## Capabilities and Constraints

- Stack: React 19, TypeScript, Vite 6, Tailwind CSS v4, lucide-react, motion. No routing library; anchor and scroll based navigation. Project data lives in `src/data.ts`.
- Single light theme only. Dark mode was removed deliberately and must not return.
- Terminology: the S-CORE role names are Admin, Requester and Unit (not "Processor").
- Filter events (`filterProjects`) connect Selected Work and Services to the Projects registry.
- Undecided: contact form delivery, additional QA evidence for other projects.

## Brand Commitments

Warm plaster and near-black palette with a tan accent, serif display type with mono labels. The owner explicitly rejected gradient, neon and "generic AI" styling: no gradient badges or buttons, no glowing accents. Roles are presented as equals; no single role is to be highlighted over the others.

## Evidence on Hand

- Live projects and screenshots in `public/projects/` for S-CORE Portal, Renta, Career Pipeline, RetroCalc, CareSync, Kaela V. Borbon portfolio and others.
- S-CORE Test Execution Report (Google Doc, embedded in the Quality section): 10 test cases across authentication, RBAC and request routing; one recorded failure (login with wrong password shows no error message, BUG-001).
- Resume PDF and creative portfolio PDF.
- Absent, and must not be fabricated: testimonials, client quotes, customer logos, test results not actually run, CareSync test evidence, and metrics beyond those already in `src/data.ts`.

## Product Principles

1. Evidence over adjectives: every claim points to work, a test report or a credential the reader can inspect.
2. Equal roles: development, quality assurance and design are shown as one connected practice, not ranked.
3. Only what was actually done: testing results, credentials and dates are stated exactly as they occurred; no embellishment.
4. Confidential data stays masked: SM Investments material never shows real figures or company data.
5. One connected story: each section hands off to the next (Work, Quality, About, Services, Contact) rather than reading as isolated blocks.

## Accessibility & Inclusion

Body text is at least 12px with the main reading text at 15 to 16px; interactive targets are at least 44px on touch; keyboard access to navigation and modals (Escape closes the document viewer and resume). No product-specific standard beyond that has been set.

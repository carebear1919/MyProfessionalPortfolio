# S-CORE — Test Execution Report

| | |
|---|---|
| **Project** | S-CORE (Service & Creative Optimization System) |
| **Tester** | Jian Marie Hilario |
| **Test period** | [dates] |
| **Environment** | [browser / OS / production URL] |
| **Scope** | Authentication, RBAC (Admin, Requester, Unit), request submission and routing |

## Summary

| ID | Test Case | Priority | Status |
|---|---|---|---|
| TC-01 | Login with valid Admin credentials | P1 | [PASS / FAIL] |
| TC-02 | Login with wrong password | P1 | [PASS / FAIL] |
| TC-03 | Access a protected page while logged out | P1 | [PASS / FAIL] |
| TC-04 | Admin can access all modules | P1 | [PASS / FAIL] |
| TC-05 | Requester cannot access Admin panel via URL | P1 | [PASS / FAIL] |
| TC-06 | Requester cannot see other users' requests | P1 | [PASS / FAIL] |
| TC-07 | Unit cannot delete requests | P2 | [PASS / FAIL] |
| TC-08 | Requester submits a new request with required fields | P1 | [PASS / FAIL] |
| TC-09 | Request routes to the correct Unit | P1 | [PASS / FAIL] |
| TC-10 | Status updates are visible to the Requester | P1 | [PASS / FAIL] |

**Total:** [ ] passed · [ ] failed · [ ] blocked

## Test Cases

### TC-01 — Login with valid Admin credentials

| | |
|---|---|
| **Module** | Auth |
| **Type** | Functional |
| **Priority** | P1 |
| **Precondition** | Admin account exists |
| **Steps** | 1. Open login page 2. Enter valid Admin email and password 3. Click Login |
| **Test data** | Admin test account |
| **Expected result** | User lands on Admin dashboard |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-02 — Login with wrong password

| | |
|---|---|
| **Module** | Auth |
| **Type** | Negative |
| **Priority** | P1 |
| **Precondition** | Any account exists |
| **Steps** | 1. Open login page 2. Enter valid email and wrong password 3. Click Login |
| **Test data** | Valid email + wrong password |
| **Expected result** | Login rejected with an error message; no session created |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-03 — Access a protected page while logged out

| | |
|---|---|
| **Module** | Auth |
| **Type** | Security |
| **Priority** | P1 |
| **Precondition** | User logged out |
| **Steps** | 1. Copy a dashboard URL 2. Log out 3. Paste the URL in the address bar |
| **Test data** | Dashboard URL |
| **Expected result** | Redirected to login page; no data shown |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-04 — Admin can access all modules

| | |
|---|---|
| **Module** | RBAC |
| **Type** | Functional |
| **Priority** | P1 |
| **Precondition** | Logged in as Admin |
| **Steps** | 1. Open Dashboard 2. Open User Management 3. Open Unit panel |
| **Test data** | Admin account |
| **Expected result** | All modules visible and accessible |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-05 — Requester cannot access Admin panel via URL

| | |
|---|---|
| **Module** | RBAC |
| **Type** | Security |
| **Priority** | P1 |
| **Precondition** | Logged in as Requester |
| **Steps** | 1. Copy an Admin-only URL 2. Paste it while logged in as Requester |
| **Test data** | Admin-only URL |
| **Expected result** | Redirect to Unauthorized page or 403; no Admin data shown |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-06 — Requester cannot see other users' requests

| | |
|---|---|
| **Module** | RBAC |
| **Type** | Security |
| **Priority** | P1 |
| **Precondition** | Requester A and B each have a request |
| **Steps** | 1. Log in as Requester A 2. Open request list 3. Try opening Requester B's request URL |
| **Test data** | Request ID of user B |
| **Expected result** | Only A's requests listed; B's request is blocked |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-07 — Unit cannot delete requests

| | |
|---|---|
| **Module** | RBAC |
| **Type** | Functional |
| **Priority** | P2 |
| **Precondition** | Logged in as Unit with an assigned request |
| **Steps** | 1. Open an assigned request 2. Look for a Delete option |
| **Test data** | Assigned request |
| **Expected result** | No Delete control visible or usable |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-08 — Requester submits a new request with required fields

| | |
|---|---|
| **Module** | Requests |
| **Type** | Functional |
| **Priority** | P1 |
| **Precondition** | Logged in as Requester |
| **Steps** | 1. Open New Request 2. Fill all required fields 3. Submit |
| **Test data** | Valid request data |
| **Expected result** | Request created with status Pending and visible in list |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-09 — Request routes to the correct Unit

| | |
|---|---|
| **Module** | Requests |
| **Type** | Integration |
| **Priority** | P1 |
| **Precondition** | Admin/Unit routing configured |
| **Steps** | 1. Submit a request as Requester 2. Log in as the expected Unit |
| **Test data** | New request |
| **Expected result** | Request appears in that Unit's queue |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

### TC-10 — Status updates are visible to the Requester

| | |
|---|---|
| **Module** | Requests |
| **Type** | Integration |
| **Priority** | P1 |
| **Precondition** | Request assigned to a Unit |
| **Steps** | 1. Unit changes status 2. Requester opens the request |
| **Test data** | Status change |
| **Expected result** | Requester sees the new status |
| **Actual result** | [fill in after running] |
| **Status** | [PASS / FAIL] |
| **Bug ID** | [BUG-00X or N/A] |

*[Insert screenshot here]*

## Bug Reports

[Add one block per failed test: Bug ID, title, related TC, severity, steps to reproduce, expected vs. actual, screenshot, fix, retest result]

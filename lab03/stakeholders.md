# CampusPulse stakeholder analysis

Name or team: Student

Date: 2026-09-08

Read the stakeholder notes in the lab handout before completing this file.
Use the stakeholder types and power-interest quadrants from Week 2, Lecture 2.

Stakeholder types: end user, operations, business, regulator, negative stakeholder

Power-interest quadrants: key player, keep satisfied, keep informed, minimal effort

## S1

- Stakeholder: Student attendee
- Stakeholder type: end user
- Power-interest quadrant: key player
- Main goal: Find announcements and events from followed clubs in one place and RSVP easily from a phone.
- Main concern: RSVP participation must not expose the student's name publicly without consent, and the service must work with screen readers.
- How you would involve or monitor this stakeholder: Test the event feed, RSVP privacy choices, mobile layouts, and screen-reader journeys with students before release; monitor privacy-related feedback.

## S2

- Stakeholder: Group officer
- Stakeholder type: end user
- Power-interest quadrant: key player
- Main goal: Collaborate on announcements, publish only as an approved officer, control event audience, and keep RSVP attendees informed of changes.
- Main concern: An unauthorised officer must not publish, and changes to place or time must reach everyone who RSVP'd.
- How you would involve or monitor this stakeholder: Review the officer workflow with representative clubs, test two-person drafting and publishing permissions, and monitor failed publication attempts and missed notifications.

## S3

- Stakeholder: Campus moderator
- Stakeholder type: operations
- Power-interest quadrant: key player
- Main goal: Investigate reports, hide harmful events quickly, preserve evidence, and make accountable decisions.
- Main concern: Hiding an event must not destroy evidence needed for an appeal, and the decision-maker must be recorded.
- How you would involve or monitor this stakeholder: Run moderation and appeal simulations, review audit records weekly during the pilot, and measure time from a valid report to a hide action.

## S4

- Stakeholder: Student Affairs
- Stakeholder type: business
- Power-interest quadrant: key player
- Main goal: Launch a trusted CampusPulse pilot for 5,000 students and 200 groups before Orientation Week.
- Main concern: The official badge must represent a checked group, and the pilot must be manageable at the planned scale.
- How you would involve or monitor this stakeholder: Approve the group-verification policy, review the pilot readiness checklist, and receive weekly adoption, verification, and incident reports.

## S5

- Stakeholder: Data Protection Officer
- Stakeholder type: regulator
- Power-interest quadrant: keep satisfied
- Main goal: Ensure that CampusPulse collects and retains only the personal data necessary for the service.
- Main concern: RSVP lists must remain private and attendance data must be deleted within 30 days after an event.
- How you would involve or monitor this stakeholder: Review data fields and retention rules before release, inspect access logs and deletion reports during the pilot, and approve any change to privacy-sensitive requirements.

## S6

- Stakeholder: Abuse cases, including impersonators and compromised group accounts
- Stakeholder type: negative stakeholder
- Power-interest quadrant: minimal effort
- Main goal: Exploit trust in verified groups to publish phishing events or repeat the same announcement.
- Main concern: They may evade detection through impersonation, account compromise, or repeated posts.
- How you would involve or monitor this stakeholder: Do not involve them as a design participant; instead, use threat modelling, rate monitoring, reports, moderator alerts, and incident response exercises to monitor the risk.

## Conflicts to resolve

Describe at least two real tensions. For each one, name both stakeholder IDs and either propose a decision or write a specific question that should go back to the stakeholders.

### Conflict 1

- Stakeholders: S1 and S2
- What conflicts: S1 wants RSVP participation to stay private unless the student opts in, while S2 needs a reliable way to know who RSVP'd so that place or time changes reach attendees.
- Proposed decision or follow-up question: Keep the RSVP list private by default and send change notifications through the service without exposing attendee names. Ask S2 whether any release-one workflow genuinely requires named attendance; if so, obtain DPO review from S5 before adding it.

### Conflict 2

- Stakeholders: S3 and S5
- What conflicts: S3 needs reports and evidence retained for moderation and appeals, while S5 requires personal data and attendance data to be minimised and deleted on schedule.
- Proposed decision or follow-up question: Store only the report, reason, decision, decision-maker, and necessary evidence; separate moderation records from attendance data. Ask S5 to confirm the retention period for moderation evidence, since the 30-day rule in the notes explicitly applies to attendance data.

### Conflict 3

- Stakeholders: S4 and S6
- What conflicts: S4 needs a trusted official badge for a 200-group pilot, while S6 may exploit a badge or compromised account to publish phishing events.
- Proposed decision or follow-up question: Release a badge only after a documented group check and provide a rapid hide, appeal, and badge-revocation process. Ask Student Affairs to confirm who owns periodic re-verification and emergency badge suspension.

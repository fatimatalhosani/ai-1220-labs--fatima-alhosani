# CampusPulse requirements review

Name or team: Student

Reviewer: Student self-review

Date: 2026-09-08

Review the completed `stakeholders.md` and `REQUIREMENTS.md`. Refer to specific
IDs and evidence in every answer. A yes or no by itself is not enough.

## Validity

Do the requirements represent what the stakeholders need? Which IDs did you
check, and what evidence supports them?

Response: Yes, the release represents the core needs in S1-S5 while addressing the abuse risk in S6. UR-1 and FR-1 cover S1's need to replace scattered channels with a followed-club feed. UR-2, FR-2, and FR-5 preserve S1/S5 RSVP privacy while still notifying attendees. UR-3 and FR-3 cover S2's two-officer and approved-publisher workflow; UR-4, FR-4, and FR-5 cover audience visibility and change notifications. UR-5 through FR-7 cover S3's report, hide, evidence, and decision-audit needs. UR-6 and FR-8 respond to S4's checked-badge requirement and S6's impersonation risk. UR-7, FR-9, and NFR-5 address S5's data-minimisation and 30-day attendance deletion rule.

## Consistency

Do any requirements contradict one another or the release scope?

Response: No unresolved contradiction remains. UR-2 and UR-4 might conflict if officers need named RSVP lists, so the decision is private-by-default RSVP with service notifications; FR-5 explicitly sends a change notification without exposing names. The scope excludes a native app but NFR-3 requires a phone-sized browser experience, which is consistent because the product is browser-based. The scope and MoSCoW Won't list both exclude direct messages, external users, paid promotion, video hosting, AI recommendations, and a native mobile application. The S5 retention rule is limited to attendance data in UR-7, while moderation evidence is identified as a separate open retention question in Q2.

## Completeness

Is an important actor, normal flow, failure, permission, privacy rule, or
boundary missing?

Response: The main actors S1-S6 are represented, including the negative stakeholder S6. Normal flows cover following and RSVP (US-1), officer publication (US-2), and reporting and moderation (US-3). Failure and permission cases are covered by the private RSVP criterion in US-1, the non-approved publisher and members-only access criteria in US-2, and unauthorised moderation access in US-3. Privacy is covered by UR-2, UR-7, NFR-2, and NFR-5. The remaining boundary questions are explicit: supported browser/screen-reader combinations in Q1, moderation evidence retention in Q2, peak traffic in Q3, and badge ownership in Q4.

## Realism

Can the proposed release and its quality targets reasonably be delivered? Mark unsupported targets as assumptions or open questions.

Response: The release scope is realistic because it is browser-based and uses a bounded pilot of 5,000 students and 200 groups from S4. NFR-4 is therefore a capacity target grounded in S4 rather than an invented traffic target. NFR-1, NFR-2, NFR-3, and NFR-5 are testable release-quality targets, although NFR-3 is marked Should. The handout supplies no peak traffic figure, so no response-time or concurrency promise was invented; that missing target is recorded as Q3. A1-A4 identify assumptions about sign-in, membership, pilot capacity, and the meaning of the 30-day rule.

## Verifiability

Could a tester decide whether each requirement passes or fails? Identify any
wording that is still vague.

Response: The FRs are observable actions and outcomes, and every NFR includes a measure and condition. A tester can verify FR-2's private default, FR-3's approval boundary, FR-5's notification recipients, FR-6/FR-7's evidence and audit record, and FR-9/NFR-5's deletion result. The remaining potentially vague terms are "supported browser pages" in NFR-1/NFR-3 and "necessary" data in FR-9. Q1 asks for the exact browser and screen-reader matrix, and A4 plus Q2 constrain what is retained; these must be resolved before final test planning. The phrase "release-critical" is operationally defined by the journeys listed in NFR-1 and NFR-3.

## One requirement you revised

- Requirement ID: NFR-5
- Before: The system shall delete attendance data within 30 days after each event.
- What was wrong or missing: The original wording repeated the stakeholder rule but did not define when compliance would be checked or how a tester would verify that deletion happened for every record.
- After: The system shall complete scheduled attendance-data deletion. [Measure: 100% of attendance records for events older than 30 days are deleted in the next scheduled retention run, with an auditable result] [Condition: after each daily retention run during the pilot] [Source: UR-7]
- Evidence or stakeholder to confirm the change: S5 explicitly requires deletion within 30 days; the Data Protection Officer should confirm that a daily run and auditable deletion result satisfy the policy.

## Final check

- [x] Stakeholder conflicts have a decision or a follow-up question.
- [x] Scope exclusions agree with the Won't list.
- [x] Every FR and NFR traces to a UR that exists.
- [x] Every NFR contains a measurable target and condition.
- [x] Traceability rows use IDs that exist in the document.
- [x] The revised requirement has also been updated in the traceability table.

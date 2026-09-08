# CampusPulse requirements

Name or team: Student

Date: 2026-09-08

Status: validated working draft

Use the source IDs `S1` to `S6` from the lab handout. Keep every requirement
short enough to test and trace.

## 1. Release scope

### In scope

The first release will provide:

- University sign-in and a feed of announcements and events from followed clubs.
- Verified groups, officer drafting and approval-based publishing, audience visibility, and corrections.
- Event RSVPs with privacy controls, change notifications, reports, moderation, evidence preservation, and appeals.

### Out of scope

The first release will exclude:

- Direct messages, external users, paid promotion, video hosting, and AI recommendations.
- A native mobile application; the release is browser-based, with responsive and screen-reader-accessible pages instead.

## 2. User requirements

- UR-1 [Must] As a student attendee, I need one place to follow clubs and find their announcements and events so that I do not have to check several channels. [Source: S1]
- UR-2 [Must] As a student attendee, I need to RSVP without my name appearing on a public list unless I choose that option so that I can protect my privacy. [Source: S1, S5]
- UR-3 [Must] As a group officer, I need to prepare an announcement with another officer and publish only when an approved officer authorises it so that group communications are controlled. [Source: S2]
- UR-4 [Must] As a group officer, I need to mark an event for the whole university or for members only and notify people who RSVP when its place or time changes. [Source: S2]
- UR-5 [Must] As a campus moderator, I need to review reports, hide a harmful event quickly, preserve the evidence, and record my decision so that moderation is accountable and appealable. [Source: S3, S6]
- UR-6 [Must] As a student or officer, I need to recognise groups with a checked official badge so that I can judge whether an announcement is trustworthy. [Source: S4, S6]
- UR-7 [Must] As a privacy reviewer, I need only necessary personal data collected and attendance data deleted within 30 days after an event so that the service respects data-protection obligations. [Source: S5]

## 3. Functional requirements

- FR-1 [Must] The system shall allow a signed-in user to follow and unfollow a group and shall display announcements and events from followed groups in the user's feed. [Source: UR-1]
- FR-2 [Must] The system shall let a student choose whether their RSVP name is visible on a public attendee list, with the default set to private. [Source: UR-2]
- FR-3 [Must] The system shall allow an approved group officer to create a draft, allow another officer to review or complete it, and allow publication only after an approved officer authorises it. [Source: UR-3]
- FR-4 [Must] The system shall restrict a members-only event to authenticated members of the relevant group and shall allow a whole-university event to be visible to signed-in university users. [Source: UR-4]
- FR-5 [Must] The system shall send a notification to every user with an RSVP when the event place or time changes, without exposing private RSVP names to other attendees. [Source: UR-2, UR-4]
- FR-6 [Must] The system shall let a user submit a report containing the reported event or announcement and a reason, and shall let a moderator hide the item while retaining the report and associated evidence. [Source: UR-5]
- FR-7 [Must] The system shall record the moderator identity, action, and timestamp for each hide, restore, badge-revocation, and appeal decision. [Source: UR-5, UR-6]
- FR-8 [Must] The system shall display an official badge only for a group with a completed verification record and shall support badge suspension when that record is revoked. [Source: UR-6]
- FR-9 [Must] The system shall collect only the account, group, event, RSVP, report, and decision data needed for the in-scope services and shall delete attendance data no later than 30 days after the event. [Source: UR-7]

## 4. Non-functional requirements

- NFR-1 [Must] The system shall present the feed, event details, RSVP controls, and report form with labels and status messages that a screen reader can identify and operate. [Measure: 100% of release-critical controls pass keyboard-only and automated accessibility checks, and no critical accessibility defect remains at release] [Condition: on supported responsive browser pages] [Source: UR-1, UR-2, UR-5]
- NFR-2 [Must] The system shall protect RSVP visibility and moderation evidence with authenticated, role-checked access. [Measure: 100% of unauthorised access tests are denied and 0 private RSVP-list or evidence disclosures occur in the release security test suite] [Condition: for student, officer, moderator, and unauthorised-user test accounts] [Source: UR-2, UR-5, UR-7]
- NFR-3 [Should] The system shall remain usable on a phone-sized browser viewport. [Measure: 100% of release-critical journeys complete without horizontal scrolling or overlapping controls in the supported phone viewport test set] [Condition: for sign-in, feed, event details, RSVP, and report journeys] [Source: UR-1, UR-2]
- NFR-4 [Must] The system shall support the planned pilot population. [Measure: the deployment shall provision accounts for at least 5,000 students and 200 groups without data loss] [Condition: before the Orientation Week pilot] [Source: UR-6]
- NFR-5 [Must] The system shall complete scheduled attendance-data deletion. [Measure: 100% of attendance records for events older than 30 days are deleted in the next scheduled retention run, with an auditable result] [Condition: after each daily retention run during the pilot] [Source: UR-7]

## 5. User stories and acceptance criteria

### US-1 [Source: S1, UR-1, UR-2]

As a student attendee,

I want to follow clubs, see their events, and RSVP privately,

so that I can discover campus activities without exposing my attendance.

Acceptance criteria:

- Given a signed-in student follows a club, when the student opens the feed, then the club's published events and announcements are shown.
- Given a student RSVPs without opting into public visibility, when another student views the event, then the RSVP student's name is not shown on the public attendee list.
- Given a student changes the visibility choice to public, when the event is viewed, then the student's name is shown; changing back to private removes it from the public list.

### US-2 [Source: S2, UR-3, UR-4]

As an approved group officer,

I want to collaborate on and publish an audience-controlled event,

so that the right people receive an authorised announcement.

Acceptance criteria:

- Given one approved officer creates a draft, when a second approved officer completes the review, then an approved officer can publish it; a non-approved account cannot publish it.
- Given an event is marked members-only, when a non-member opens its event link, then the event details are not displayed and the user receives an access message.
- Given an RSVP exists, when the place or time changes, then the RSVP user receives a change notification containing the updated field.

### US-3 [Source: S3, S5, S6, UR-5, UR-7]

As a campus moderator,

I want to investigate reports and hide unsafe events without losing evidence,

so that the campus is protected and an appeal can be reviewed.

Acceptance criteria:

- Given a report is submitted with an item and reason, when a moderator opens it, then both the reported item and reason are displayed; when the moderator hides it, then the evidence remains available to authorised appeal reviewers.
- Given a moderator hides or restores an item, when the decision is saved, then the decision-maker and timestamp appear in the audit record.
- Given a student without moderator permission attempts to hide an event or view moderation evidence, then the action is denied and no evidence is disclosed.

## 6. MoSCoW summary

- Must: UR-1, UR-2, UR-3, UR-4, UR-5, UR-6, UR-7; FR-1, FR-2, FR-3, FR-4, FR-5, FR-6, FR-7, FR-8, FR-9; NFR-1, NFR-2, NFR-4, NFR-5; US-1, US-2, US-3.
- Should: NFR-3, responsive phone usability beyond the release-critical journeys.
- Could: A richer notification preference centre and moderator dashboard metrics, if pilot capacity allows; these are not release gates.
- Won't this release: Direct messages, external users, paid promotion, video hosting, AI recommendations, and a native mobile application.

## 7. Traceability

Add at least four complete paths. Every row should connect evidence to a user
requirement, a system requirement, and a user story.

| Stakeholder need | User requirement | System requirement | User story |
|---|---|---|---|
| S1: one place for followed clubs | UR-1 | FR-1 | US-1 |
| S1/S5: private RSVP by default | UR-2 | FR-2 and FR-5 | US-1 |
| S2: approved publication and audience control | UR-3 and UR-4 | FR-3 and FR-4 | US-2 |
| S2: notify RSVP users of place/time changes | UR-4 | FR-5 | US-2 |
| S3/S6: report, hide, preserve evidence | UR-5 | FR-6 and FR-7 | US-3 |
| S4/S6: trustworthy checked badge | UR-6 | FR-8 and NFR-4 | US-2 |
| S5: minimise and delete attendance data | UR-7 | FR-9 and NFR-5 | US-3 |

## 8. Assumptions and open questions

Separate decisions your team has assumed from questions that still need an answer.

### Assumptions

- A1: University sign-in supplies a stable account identity and group membership for the release.
- A2: A members-only event can be evaluated using the university's group-membership data.
- A3: The 5,000-student and 200-group figures are the planned pilot capacity, not a peak-concurrent-traffic target.
- A4: The 30-day retention rule applies to attendance data; moderation evidence follows a separately approved retention schedule.

### Open questions

- Q1: What exact browser versions and screen-reader combinations must be supported at release?
- Q2: How long may moderation evidence be retained for appeals, and who may access it?
- Q3: What response-time and peak-concurrency target is required for Orientation Week? The handout supplies no peak traffic figure.
- Q4: Who performs periodic group verification and who can suspend a badge during an abuse incident?

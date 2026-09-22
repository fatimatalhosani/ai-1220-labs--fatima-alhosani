# Campus Workshop Board - Design notes

Name: Fatima Alhosani  
Student ID: 25011112

Let the diagrams carry the explanation. Complete only these short notes.

## Diagram files

| View | Editable source (and page if needed) | Export |
|---|---|---|
| 01-context | `diagrams/source/01-context.mmd` | `diagrams/exports/01-context.png` |
| 02-containers | `diagrams/source/02-containers.mmd` | `diagrams/exports/02-containers.png` |
| 03-components | `diagrams/source/03-components.mmd` | `diagrams/exports/03-components.png` |
| 04-code | `diagrams/source/04-code.mmd` | `diagrams/exports/04-code.png` |
| 05-dynamic | `diagrams/source/05-dynamic.mmd` | `diagrams/exports/05-dynamic.png` |

## One structural choice (Exercise 2)

The pilot uses a small web application backed by one relational database rather than separate services, because the 200-student scale and one-team ownership favour a simple deployment while database transactions enforce the reservation invariant reliably.

## Your components (Exercise 3)

| Name | Job | Customer rule(s) served |
|---|---|---|
| AuthContext | Turns the Campus Identity response into a verified session containing student ID, name and email. | R1, R4 |
| WorkshopCatalog | Creates, lists and publishes workshops; validates owner, title, time and capacity. | R2, R3 |
| ReservationService | Performs owner-independent reservation decisions, idempotent repeats, capacity checks and transaction boundaries. | R3, R4, R5 |
| AttendeeQuery | Applies the organiser-only access check before returning attendee names and emails. | R3 |
| WorkshopRepository / ReservationRepository | Provides typed persistence operations for workshops, ownership and reservations. | R4, R5 |
| ConfirmationNotifier | Requests one confirmation after commit and reports mail unavailability without losing the seat. | R6 |

## Reservation operation (Exercise 4)

Typed input: `ReservationRequest { workshopId: WorkshopId, studentId: StudentId }`, where `studentId` comes only from a verified session. Possible results are `created`, `already_reserved`, `full`, or `rejected`, each returning the current remaining-seat count and an optional mail warning. The service checks for an existing reservation, then locks the published workshop row and inserts within one transaction; the unique `(workshopId, studentId)` constraint and the lock/transaction prevent overlapping calls from creating duplicates or taking more seats than capacity. The confirmation request happens only after commit, so an unavailable mail service cannot remove a committed seat.

## Ari's incident (Exercise 5)

| Observation | Result |
|---|---|
| Stored state before | Workshop W17 is published with capacity 3 and reservations `{S21, S22}`; Ari is signed in as S23 and has no reservation. |
| Stored state after | Reservation `{W17, S23}` is committed; reservations are `{S21, S22, S23}`, remaining seats are 0, and no other state is changed. |
| Message Ari sees | `Reservation succeeded; confirmation email unavailable.` |

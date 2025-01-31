# Possible improvements

### Code Quality and Readability

- The function names like `goal` and `saveDomain` could be more descriptive to convey their purpose. Although the name was probably intended to make it clear for the assignment, `goal` could be renamed to `saveActionsToDatabase` or similar.
- Adding TypeScript to the project could improve the code quality and make it easier to maintain
- Using a linter like ESLint could help to enforce code quality standards
- Tests could be added to ensure the code works as expected and to prevent regressions
- The `worker.js` file is too long and could be split into smaller files to improve readability, as detailed in the Project Architecture section

### Project Architecture:

- Separation of concerns: the file `worker.js` is doing too much, it could be split into smaller files. One suggestion would be to split on modules such as:
  - `hubspotApi.js` - responsible for all HubSpot-related functions
  - `database.js` - responsible for handling the database operations
  - `queue.js` - responsible for for queue creation and handling
- It would be good to centralize configurable values like limit, retry attempts, and queue concurrency. This would simplify adjustments for different environments or loads.
- OAuth process could be improved:
  - It relies completely on the saved tokens, not allowing any other authentication method
  - If the refresh token gets invalidated, there is no way to authenticate again
- Error handling: errors are caught and logged but not re-thrown or handled further, which could result in partial data processing without notifying the system of a failure

### Performance:

- The three main tasks (`processCompanies`, `processContacts`, `processMeetings`) are executed sequentially. Running them in parallel using `Promise.all()` would significantly reduce execution time.
- The `async.queue` is set to an extremely high concurrency (100_000_000), which could lead to memory exhaustion. A more reasonable value should be set, depending on the available resources.

# Bug fixes:

- When generating the last modified date filter, `GTQ` and `LTQ` were used instead of `GTE` and `LTE`
- Fix `actionDate` in `processCompanies` function (it was subtracting 2000 from the date for some reason)

# Notes

- The screenshot provided on `execution.png` was running with a slight tweak on the date filter (GTE was commented). It was intended to test with actual results from the API, since filtering from `lastPulledDates` wouldn't return any results.

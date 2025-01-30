## To do:

- [ ] Create `processMeetings` function

### Bug fixes:

- The commit 9c0636e solved a bug when generating the last modified date filter

### Possible improvements:

- `processCompanies` and `processContacts` could be ran in parallel to improve performance
- Adding TypeScript to the project

### Might be issues:

- The `async.queue` takes 100_000_000 as the concurrency limit, which might be too high for some systems and could cause memory issues

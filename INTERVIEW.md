## Interview Guide: GreenhouseOS Tech Test — Next.js Weather App

### Interview agenda (45–60 min)

- 5–10 min: Requirements + walkthrough
- 15–20 min: Bug hunt + fixes
- 15–20 min: Refactor discussion
- 10 min: Extensions, testing, wrap-up

---

### Requirements and product understanding

- What does this app aim to do and who is it for?
- What’s “local” here and how is it encoded in the code?

### Code comprehension (walkthrough) (10-15 min)

- Walk through your submitted code, explain how it works and the changes you made.

### Bug hunt (observable, non-crashing) (5 min)

- Did you find any bugs within the code? Explain how you found them.
- Find and explain the temperature bug. What’s the correct formula and where should it live?
- Check the coordinates used for York, UK. Are they correct? How do you verify?

### Data usage and extension

- How would you add a “today min/max” summary? What fields would you use?
- How would you allow unit toggling (°C/°F, km/h/mph) while keeping a clean API?

### API correctness and resilience

- How would you handle API errors, slow responses, or partial data?

### TypeScript and correctness

- Where do you rely on array indexing? How would you guard against out-of-range?
- How would you ensure time zone correctness when selecting the “current” hour?

### UI/UX, styling, and accessibility

- What changes would improve readability of date/time and units?
- What simple affordances would help users (tooltips, legends, labels)?

### Testing strategy

- What unit tests would you write?
  - Outline tests for: temperature conversion, km/h→mph, code mapping, hour selection, URL building.

### Security and robustness

- Any sensitive data or keys? How to handle keys if added later?
  - Lets say we added another api call that required a key, how would you handle that securely?

### Performance and maintainability

- Any obvious performance wins (caching, payload reduction, limiting variables)?
- How would you keep the codebase tidy as features grow (folders, naming, boundaries)?

---

### Evaluator signals (quick rubric)

- Clarity: Explains problems and solutions succinctly.
- Debugging: Spots the conversion bug and coordinate issue.
- Design: Proposes sensible refactors and boundaries.
- Data thinking: Uses or proposes usage for unused fields meaningfully.
- Quality: Advocates testing, validation, and accessibility.

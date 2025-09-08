# GreenhouseOS Tech Test — Next.js Weather App

## Objective

Implement and improve a simple Next.js application that shows local weather for York, UK using the Open‑Meteo API.

## What you’ll do

- Run the app and verify the weather display.
- Read through the code and understand what it is doing, be prepared to explain it.
- Identify and fix an observable logic error in the displayed weather.
- Refactor code where a function has too many responsibilities.
- Optionally use more of the available (currently unused) data to enhance the UI.

## Getting started

### Prerequisites

- Node.js 18+ (LTS)
- npm, yarn, pnpm, or bun
- [Handy Link for installing both of the above](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Setup

Open this repository in VSCode or your preferred IDE, then in the terminal:

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open http://localhost:3000

## Where to look

- `src/lib/weather.ts` — Open‑Meteo fetch + transform the data before returning it to the page.
- `src/app/page.tsx` — Renders a subset of the weather data.

## Assessment notes (read carefully)

1. Logic bug

- A subtle error exists in unit conversion logic. The app still runs but the displayed value is obviously wrong when compared against the source unit.
- Fix the bug and add a small test or type-safe helper to prevent regressions.

2. Refactor opportunity

- `fetchYorkWeather` in `src/lib/weather.ts` intentionally mixes concerns: request construction, data fetch, parsing, selection, mapping, unit conversions, and view-model shaping. Split into smaller focused helpers.

3. Use more data (Optional)

- The TypeScript interface in `src/lib/weather.ts` models the full set of variables requested from Open‑Meteo (hourly + daily). Only a few are rendered. Consider using some additional fields. While not imperative that you complete this step, we would be interested to see how you approach it during a discussion.

## Contract and types

- `WeatherApiResponse` in `src/lib/weather.ts` models the response fields used in this app and includes more data than the UI currently displays.
- `WeatherViewModel` indicates which subset is rendered and which fields are available but not displayed.

## License and usage

- Open‑Meteo offers a free, no‑key API for non‑commercial use. See: https://open-meteo.com/en/license

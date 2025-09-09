# GreenhouseOS Tech Test — Next.js Weather App

## Objective

Read through the provided web application and identify improvements that can be made to the code. 
There are two small bugs in the system to find and fix, as well as opportunities to improve the structure of the existing code.
The task here is relatively open ended and we'd like you to analyze the existing app and improve it however you see best. 
This is deliberately a very open ended task, we are hoping that it will afford you the opportunity to showcase your skills and your thought process. If successful you may be invited to a technical review, where we will be asking you to talk through the project and any changes you made. 

## What you’ll do

- Run the app and verify the weather display.
- Read through the code and understand what it is doing, be prepared to explain it.
- Identify and fix one or more observable logic errors in the displayed data.
- Refactor code where a function has too many responsibilities.
- Optionally use more of the available (currently unused) data to enhance the UI.

## Getting started

### Prerequisites

- Node.js
- npm
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

3. Open http://localhost:3000 in your browser

## Where to look

- `src/lib/weather.ts` — Open‑Meteo fetch + transform the data before returning it to the page.
- `src/app/page.tsx` — Renders a subset of the weather data.

## Assessment notes (read carefully)

1. Logic bug

- A subtle error exists in unit conversion logic. The app still runs but the displayed value is obviously wrong when compared against the source unit.

2. Refactor opportunity

- `fetchYorkWeather` in `src/lib/weather.ts` intentionally mixes concerns: request construction, data fetch, parsing, selection, mapping, unit conversions, and view-model shaping.

3. Use more data (Optional)

- The TypeScript interface in `src/lib/weather.ts` models the full set of variables requested from Open‑Meteo (hourly + daily). Only a few are rendered. Consider using some additional fields. While not imperative that you complete this step, we would be interested to see how you approach it during a discussion.
- For context here, the `_2m` at the end of `temperature_2m` stands for 2 meters above ground, not 2 minutes! 

## Contract and types

- `WeatherApiResponse` in `src/lib/weather.ts` models the response fields used in this app and includes more data than the UI currently displays.
- `WeatherViewModel` indicates which subset is rendered and which fields are available but not displayed.

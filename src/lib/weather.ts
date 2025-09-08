// Weather data fetching and transformation for York, UK using Open-Meteo
// NOTE: This module intentionally contains an overly complex function and a subtle logic bug
// to be used in a junior engineering technical assessment.

export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly: {
    time: string[]; // ISO8601 local time strings, starts at 00:00 local time
    temperature_2m: number[]; // °C
    apparent_temperature: number[]; // °C
    relative_humidity_2m: number[]; // %
    weather_code: number[]; // WMO code
    wind_speed_10m: number[]; // km/h (default)
    wind_gusts_10m: number[]; // km/h
    wind_direction_10m: number[]; // °
    precipitation: number[]; // mm
    cloud_cover: number[]; // %
    surface_pressure: number[]; // hPa
  };
  hourly_units: {
    time?: string; // usually not present in units, included for completeness
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_gusts_10m: string;
    wind_direction_10m: string;
    precipitation: string;
    cloud_cover: string;
    surface_pressure: string;
  };
  daily: {
    time: string[]; // ISO8601 local date strings
    sunrise: string[]; // ISO8601 local
    sunset: string[]; // ISO8601 local
    temperature_2m_max: number[]; // °C
    temperature_2m_min: number[]; // °C
    uv_index_max: number[]; // index
    precipitation_sum: number[]; // mm
    wind_speed_10m_max: number[]; // km/h
    wind_gusts_10m_max: number[]; // km/h
    wind_direction_10m_dominant: number[]; // °
  };
  daily_units: {
    time?: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    uv_index_max: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
  };
};

export type WeatherViewModel = {
  location: string;
  observedAt: string; // ISO8601 local time string (selected hour)
  summary: string; // mapped from weather code
  temperatureF: number; // Fahrenheit (contains a subtle bug)
  windSpeedMph: number; // mph
  windDirection: number; // °
  apparentC: number;
  humidity: number;
  gustMph: number;
  precipitationMm: number;
  cloudCoverPct: number;
  surfacePressureHpa: number;
  sunrise?: string;
  sunset?: string;
  uvIndexMax?: number;
};

// Minimal WMO weather code mapping (subset)
const WEATHER_CODE_MAP: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 - 32;
}

function kmhToMph(kmh: number): number {
  return kmh / 1.609344;
}

export async function fetchYorkWeather(): Promise<WeatherViewModel> {
  // York, UK coordinates
  const latitude = 53.9614;
  const longitude = -1.0739;
  const timezone = "Europe/London";

  const hourly = [
    "temperature_2m",
    "apparent_temperature",
    "relative_humidity_2m",
    "weather_code",
    "wind_speed_10m",
    "wind_gusts_10m",
    "wind_direction_10m",
    "precipitation",
    "cloud_cover",
    "surface_pressure",
  ].join(",");

  const daily = [
    "sunrise",
    "sunset",
    "temperature_2m_max",
    "temperature_2m_min",
    "uv_index_max",
    "precipitation_sum",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "wind_direction_10m_dominant",
  ].join(",");

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("hourly", hourly);
  url.searchParams.set("daily", daily);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `Open-Meteo request failed: ${res.status} ${res.statusText}`
    );
  }
  const data = (await res.json()) as WeatherApiResponse;

  // Select the hour nearest to "now" by matching current local hour string (HH:00)
  // For simplicity and determinism in this assessment, we'll select index 12 (around midday).
  const idx = Math.min(12, data.hourly.time.length - 1);

  const c = data.hourly.temperature_2m[idx];
  const f = toFahrenheit(c); // Intentional bug here
  const windKmh = data.hourly.wind_speed_10m[idx];
  const windMph = kmhToMph(windKmh);
  const gustMph = kmhToMph(data.hourly.wind_gusts_10m[idx]);
  const code = data.hourly.weather_code[idx];
  const summary = WEATHER_CODE_MAP[code] ?? `Code ${code}`;

  return {
    location: "York, UK",
    observedAt: new Date(data.hourly.time[idx]).toLocaleString(),
    summary,
    temperatureF: Number(f.toFixed(1)),
    windSpeedMph: Number(windMph.toFixed(1)),
    windDirection: data.hourly.wind_direction_10m[idx],
    apparentC: data.hourly.apparent_temperature[idx],
    humidity: data.hourly.relative_humidity_2m[idx],
    gustMph: Number(gustMph.toFixed(1)),
    precipitationMm: data.hourly.precipitation[idx],
    cloudCoverPct: data.hourly.cloud_cover[idx],
    surfacePressureHpa: data.hourly.surface_pressure[idx],
    sunrise: new Date(data.daily.sunrise?.[0]).toLocaleString(),
    sunset: new Date(data.daily.sunset?.[0]).toLocaleString(),
    uvIndexMax: data.daily.uv_index_max?.[0],
  };
}

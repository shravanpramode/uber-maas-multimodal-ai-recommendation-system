import { useState, useEffect, useCallback } from "react";

interface AirQualityData {
  aqi: number; // 1-5 scale (Google UAQI) or mapped
  category: string; // "Good", "Moderate", "Unhealthy for Sensitive", "Unhealthy", "Very Unhealthy", "Hazardous"
  dominantPollutant: string;
  color: string; // hex color for UI
}

interface WeatherData {
  temperature: number; // Celsius
  condition: string; // "Clear", "Cloudy", "Rain", "Thunderstorm", etc.
  humidity: number;
  icon: string; // emoji
  isRaining: boolean;
}

interface EnvironmentalFactors {
  airQuality: AirQualityData | null;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Map Google AQI index (1-6) to user-friendly categories
function mapAqiToCategory(aqiIndex: number): {
  category: string;
  color: string;
} {
  if (aqiIndex <= 1)
    return { category: "Excellent", color: "#00E400" };
  if (aqiIndex <= 2)
    return { category: "Good", color: "#92D050" };
  if (aqiIndex <= 3)
    return { category: "Moderate", color: "#FFFF00" };
  if (aqiIndex <= 4)
    return { category: "Poor", color: "#FF7E00" };
  if (aqiIndex <= 5)
    return { category: "Very Poor", color: "#FF0000" };
  return { category: "Hazardous", color: "#7E0023" };
}

// Parse weather condition from Google Weather API response
function parseWeatherCondition(weatherData: any): WeatherData {
  try {
    const current = weatherData?.currentConditions;
    if (!current) {
      return {
        temperature: 0,
        condition: "Unknown",
        humidity: 0,
        icon: "🌤️",
        isRaining: false,
      };
    }

    const temp = current?.temperature?.degrees ?? 0;
    const humidity = current?.humidity ?? 0;
    const conditionType = current?.type ?? "";

    let condition = "Clear";
    let icon = "☀️";
    let isRaining = false;

    const condStr = conditionType.toLowerCase();
    if (condStr.includes("rain") || condStr.includes("drizzle")) {
      condition = "Rain";
      icon = "🌧️";
      isRaining = true;
    } else if (condStr.includes("thunder")) {
      condition = "Thunderstorm";
      icon = "⛈️";
      isRaining = true;
    } else if (condStr.includes("cloud") || condStr.includes("overcast")) {
      condition = "Cloudy";
      icon = "☁️";
    } else if (condStr.includes("fog") || condStr.includes("mist") || condStr.includes("haze")) {
      condition = "Hazy";
      icon = "🌫️";
    } else if (condStr.includes("snow")) {
      condition = "Snow";
      icon = "🌨️";
    } else {
      // Fallback: use temperature-based icon
      if (temp > 35) {
        condition = "Hot";
        icon = "🔥";
      } else if (temp > 25) {
        condition = "Warm";
        icon = "☀️";
      } else {
        condition = "Clear";
        icon = "🌤️";
      }
    }

    return { temperature: Math.round(temp), condition, humidity, icon, isRaining };
  } catch {
    return {
      temperature: 0,
      condition: "Unknown",
      humidity: 0,
      icon: "🌤️",
      isRaining: false,
    };
  }
}

export function useEnvironmentalFactors(
  lat: number | null,
  lng: number | null
): EnvironmentalFactors {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (lat == null || lng == null || !API_KEY) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch Air Quality
      const aqiResponse = await fetch(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: { latitude: lat, longitude: lng },
            extraComputations: ["DOMINANT_POLLUTANT_CONCENTRATION"],
          }),
        }
      );

      if (aqiResponse.ok) {
        const aqiData = await aqiResponse.json();
        const index = aqiData?.indexes?.[0];
        const aqiValue = index?.aqi ?? 50;
        const aqiCategory = index?.aqiDisplay
          ? parseInt(index.aqiDisplay)
          : Math.ceil(aqiValue / 50);
        const { category, color } = mapAqiToCategory(aqiCategory);

        setAirQuality({
          aqi: aqiValue,
          category,
          dominantPollutant: index?.dominantPollutant ?? "PM2.5",
          color,
        });
      }
    } catch (e) {
      console.warn("Air Quality API error:", e);
    }

    try {
      // Fetch Weather
      const weatherResponse = await fetch(
        `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: { latitude: lat, longitude: lng },
          }),
        }
      );

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        setWeather(parseWeatherCondition(weatherData));
      }
    } catch (e) {
      console.warn("Weather API error:", e);
    }

    setLoading(false);
  }, [lat, lng]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { airQuality, weather, loading, error };
}

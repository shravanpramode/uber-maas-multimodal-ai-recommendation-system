import type { Route } from "@/contexts/TripContext";

interface EnvironmentalContext {
  aqi: number | null; // Air Quality Index
  isRaining: boolean;
  temperature: number | null;
}

interface TimeContext {
  hour: number; // 0-23
  isLateNight: boolean; // 10pm - 5am
  isRushHour: boolean; // 8-10am, 5-8pm
}

export interface RouteRecommendation {
  routeId: string;
  tags: RecommendationTag[];
  score: number; // Higher = more recommended
  primaryTag: RecommendationTag | null;
}

export interface RecommendationTag {
  label: string;
  reason: string;
  icon: string;
  color: string; // Tailwind-compatible color class
  priority: number; // Higher = more important
}

function getTimeContext(): TimeContext {
  const hour = new Date().getHours();
  return {
    hour,
    isLateNight: hour >= 22 || hour <= 5,
    isRushHour: (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20),
  };
}

function hasPublicTransit(route: Route): boolean {
  return route.legs.some((leg) =>
    ["metro", "bus", "suburban-train"].includes(leg.mode)
  );
}

function isDirectRide(route: Route): boolean {
  return (
    route.legs.length === 1 &&
    ["auto", "bike", "uber-go", "go-sedan", "uber-xl"].includes(
      route.legs[0].mode
    )
  );
}

/**
 * Smart Recommendation Engine
 *
 * Automatically scores and tags routes based on:
 * - Environmental factors (AQI, rain, temperature)
 * - Time of day (rush hour, late night)
 * - Route characteristics (cost, duration, transit usage)
 *
 * Design principle from Phase-1 research:
 * "Frame multimodal options as time-reliable and cost-saving first,
 *  with decongestion/air-quality benefits as a reinforcing narrative."
 */
export function generateRecommendations(
  routes: Route[],
  env: EnvironmentalContext
): RouteRecommendation[] {
  const time = getTimeContext();

  return routes.map((route) => {
    const tags: RecommendationTag[] = [];
    let score = 0;

    // --- PRICE-BASED TAGS ---
    const cheapest = Math.min(...routes.map((r) => r.totalPrice));
    if (route.totalPrice === cheapest && routes.length > 1) {
      tags.push({
        label: "Best Price",
        reason: `Save ₹${Math.max(
          ...routes.map((r) => r.totalPrice)
        ) - route.totalPrice} vs. direct ride`,
        icon: "💰",
        color: "bg-green-100 text-green-800",
        priority: 7,
      });
      score += 15;
    }

    // --- TIME-BASED TAGS ---
    const fastest = Math.min(...routes.map((r) => r.totalDuration));
    if (route.totalDuration === fastest && routes.length > 1) {
      tags.push({
        label: "Fastest",
        reason: `Arrives ${
          Math.max(...routes.map((r) => r.totalDuration)) - route.totalDuration
        } min sooner`,
        icon: "⚡",
        color: "bg-blue-100 text-blue-800",
        priority: 8,
      });
      score += 20;
    }

    // --- RUSH HOUR LOGIC ---
    // During rush hour, multimodal with metro is king (avoids gridlock)
    if (time.isRushHour && hasPublicTransit(route)) {
      tags.push({
        label: "Beat the Traffic",
        reason: "Metro/train skips road congestion during rush hour",
        icon: "🚇",
        color: "bg-purple-100 text-purple-800",
        priority: 9,
      });
      score += 25;
    }

    // --- LATE NIGHT SAFETY ---
    // Per "Safe Shreya" persona: guaranteed safe last-mile matters most
    if (time.isLateNight && isDirectRide(route)) {
      tags.push({
        label: "Safe Choice",
        reason: "Direct door-to-door ride for late-night safety",
        icon: "🛡️",
        color: "bg-amber-100 text-amber-800",
        priority: 10,
      });
      score += 30;
    }

    // --- WEATHER LOGIC ---
    if (env.isRaining) {
      // During rain, penalise routes with walking legs
      const hasWalkLeg = route.legs.some((l) => l.mode === "walk");
      if (!hasWalkLeg && isDirectRide(route)) {
        tags.push({
          label: "Stay Dry",
          reason: "No walking in the rain — enclosed ride",
          icon: "🌧️",
          color: "bg-sky-100 text-sky-800",
          priority: 8,
        });
        score += 15;
      }
      if (hasWalkLeg) {
        score -= 10; // Penalise walking in rain
      }
    }

    // --- AIR QUALITY LOGIC ---
    if (env.aqi && env.aqi > 150 && hasPublicTransit(route)) {
      tags.push({
        label: "Healthier Route",
        reason: "Less exposure to outdoor pollution via metro/train",
        icon: "🫁",
        color: "bg-teal-100 text-teal-800",
        priority: 6,
      });
      score += 10;
    }

    // --- ECO TAG ---
    if (hasPublicTransit(route) && route.carbonSaved && route.carbonSaved > 0) {
      tags.push({
        label: "Eco-Friendly",
        reason: `Saves ~${route.carbonSaved}g CO₂ vs. direct cab`,
        icon: "🌱",
        color: "bg-emerald-100 text-emerald-800",
        priority: 4,
      });
      score += 5;
    }

    // --- EXISTING "isRecommended" FLAG ---
    if (route.isRecommended) {
      score += 10;
    }

    // Sort tags by priority (highest first)
    tags.sort((a, b) => b.priority - a.priority);

    return {
      routeId: route.id,
      tags,
      score,
      primaryTag: tags.length > 0 ? tags[0] : null,
    };
  });
}

/**
 * Returns the single top-recommended route ID
 */
export function getTopRecommendation(
  routes: Route[],
  env: EnvironmentalContext
): string | null {
  const recs = generateRecommendations(routes, env);
  if (recs.length === 0) return null;
  recs.sort((a, b) => b.score - a.score);
  return recs[0].routeId;
}

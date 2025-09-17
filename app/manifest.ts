import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GalaxyInfo — Explore Planets, Moons, Asteroids & Comets",
    short_name: "GalaxyInfo",
    description:
      "Discover and explore celestial bodies in our solar system with detailed information about planets, moons, asteroids, and comets.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f17",
    theme_color: "#5b9cff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}

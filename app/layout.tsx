import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "GalaxyCalc — Advanced Space Calculations & Celestial Body Explorer",
  description:
    "Calculate orbital mechanics, explore celestial bodies, and discover detailed astronomical data for planets, moons, asteroids, and comets in our solar system.",
  generator: "GalaxyCalc",
  keywords: [
    "space calculations",
    "orbital mechanics",
    "planets",
    "moons",
    "asteroids",
    "comets",
    "solar system",
    "astronomy calculator",
    "celestial bodies",
    "space exploration",
    "escape velocity",
    "orbital velocity",
    "gravitational force",
  ],
  authors: [{ name: "GalaxyCalc Team" }],
  creator: "GalaxyCalc",
  publisher: "GalaxyCalc",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GalaxyCalc — Advanced Space Calculations & Celestial Body Explorer",
    description: "Calculate orbital mechanics and explore celestial bodies with detailed astronomical data",
    type: "website",
    siteName: "GalaxyCalc",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GalaxyCalc — Advanced Space Calculations & Celestial Body Explorer",
    description: "Calculate orbital mechanics and explore celestial bodies with detailed astronomical data",
    site: "@galaxycalc",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Science & Technology",
  classification: "Educational",
  other: {
    "theme-color": "#0ea5e9",
    "color-scheme": "light dark",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GalaxyCalc",
              description: "Advanced space calculations and celestial body exploration platform",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"}/logo.png`,
              sameAs: ["https://github.com/galaxycalc", "https://twitter.com/galaxycalc"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"}/browse?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GalaxyCalc",
              description:
                "Calculate orbital mechanics, explore celestial bodies, and discover detailed astronomical data",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://galaxycalc.com"}/browse?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "GalaxyCalc",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

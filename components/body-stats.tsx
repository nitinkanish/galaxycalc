import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stat } from "@/components/stat"
import { formatNumber, formatMass, formatVolume, formatTemperature, formatDuration } from "@/lib/utils"
import type { Body } from "@/lib/types"

interface BodyStatsProps {
  body: Body
}

export function BodyStats({ body }: BodyStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Stat label="Mean Radius" value={formatNumber(body.meanRadius)} unit="km" />
          <Stat label="Equatorial Radius" value={formatNumber(body.equaRadius)} unit="km" />
          <Stat label="Polar Radius" value={formatNumber(body.polarRadius)} unit="km" />
          <Stat label="Mass" value={formatMass(body.mass)} />
          <Stat label="Volume" value={formatVolume(body.vol)} />
          <Stat label="Density" value={formatNumber(body.density)} unit="g/cm³" />
          <Stat label="Gravity" value={formatNumber(body.gravity)} unit="m/s²" />
          <Stat label="Escape Velocity" value={formatNumber(body.escape)} unit="m/s" />
          <Stat label="Flattening" value={formatNumber(body.flattening)} />
          <Stat label="Average Temperature" value={formatTemperature(body.avgTemp)} />
          <Stat label="Axial Tilt" value={formatNumber(body.axialTilt)} unit="°" />
          <Stat label="Semimajor Axis" value={formatNumber(body.semimajorAxis)} unit="km" />
          <Stat label="Perihelion" value={formatNumber(body.perihelion)} unit="km" />
          <Stat label="Aphelion" value={formatNumber(body.aphelion)} unit="km" />
          <Stat label="Eccentricity" value={formatNumber(body.eccentricity)} />
          <Stat label="Inclination" value={formatNumber(body.inclination)} unit="°" />
          <Stat label="Sidereal Orbit" value={formatDuration(body.sideralOrbit)} />
          <Stat label="Sidereal Rotation" value={formatDuration(body.sideralRotation)} />
          <Stat label="Mean Anomaly" value={formatNumber(body.mainAnomaly)} unit="°" />
          <Stat label="Argument of Periapsis" value={formatNumber(body.argPeriapsis)} unit="°" />
          <Stat label="Longitude of Ascending Node" value={formatNumber(body.longAscNode)} unit="°" />
        </dl>
      </CardContent>
    </Card>
  )
}

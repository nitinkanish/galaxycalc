interface StatProps {
  label: string
  value: string | number | null | undefined
  unit?: string
}

export function Stat({ label, value, unit }: StatProps) {
  const displayValue = value !== null && value !== undefined ? value : "—"
  const formattedValue = typeof displayValue === "number" ? displayValue.toLocaleString() : displayValue

  return (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold">
        {formattedValue}
        {unit && displayValue !== "—" && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
      </dd>
    </div>
  )
}

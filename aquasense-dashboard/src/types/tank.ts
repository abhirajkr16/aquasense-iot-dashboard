export interface TankReading {
  timestamp: string
  level_percent: number
}

export interface TankSummary {
  current: TankReading
  minimum: TankReading
  maximum: TankReading
  lowLevelReadings: TankReading[]
  // Validated and sorted readings for the reporting day, used by the chart and history table
  dayReadings: TankReading[]
}
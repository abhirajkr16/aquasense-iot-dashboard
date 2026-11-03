export interface TankReading {
    timestamp: string
    level_percent: number
  }
  
  export interface TankSummary {
    current: TankReading
    minimum: TankReading
    maximum: TankReading
    lowLevelReadings: TankReading[]
  }
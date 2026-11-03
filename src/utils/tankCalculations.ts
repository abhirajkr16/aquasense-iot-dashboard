
import type { TankReading, TankSummary } from '../types/tank'

const LOW_LEVEL_THRESHOLD = 20

export function getTankSummary(
  readings: TankReading[]
): TankSummary | null {
  // Remove readings with invalid timestamps or water levels
  const validReadings = readings.filter((reading) => {
    const timestamp = new Date(reading.timestamp).getTime()

    return (
      Number.isFinite(timestamp) &&
      Number.isFinite(reading.level_percent) &&
      reading.level_percent >= 0 &&
      reading.level_percent <= 100
    )
  })

  if (validReadings.length === 0) {
    return null
  }

  // Sort readings by timestamp
  const sortedReadings = [...validReadings].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() -
      new Date(b.timestamp).getTime()
  )

  // Find the date of the latest reading
  const latestDate = sortedReadings[
    sortedReadings.length - 1
  ].timestamp.slice(0, 10)

  // Get readings belonging to the latest date
  const latestDayReadings = sortedReadings.filter(
    (reading) => reading.timestamp.slice(0, 10) === latestDate
  )

  // Find the minimum and maximum water levels
  const minimum = latestDayReadings.reduce((lowest, reading) =>
    reading.level_percent < lowest.level_percent ? reading : lowest
  )

  const maximum = latestDayReadings.reduce((highest, reading) =>
    reading.level_percent > highest.level_percent ? reading : highest
  )

  // Get the latest available reading
  const current = sortedReadings[sortedReadings.length - 1]

  // Find readings below the configured threshold
  const lowLevelReadings = latestDayReadings.filter(
    (reading) => reading.level_percent < LOW_LEVEL_THRESHOLD
  )

  return {
    current,
    minimum,
    maximum,
    lowLevelReadings,
    // Validated and sorted readings for the reporting day
    dayReadings: latestDayReadings,
  }
}

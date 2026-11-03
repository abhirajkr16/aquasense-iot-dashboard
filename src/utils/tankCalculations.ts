import type { TankReading, TankSummary } from '../types/tank'

const LOW_LEVEL_THRESHOLD = 20

export function getTankSummary(
  readings: TankReading[]
): TankSummary | null {
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

  const sortedReadings = [...validReadings].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() -
      new Date(b.timestamp).getTime()
  )

  const latestDate = sortedReadings[
    sortedReadings.length - 1
  ].timestamp.slice(0, 10)

  const todayReadings = sortedReadings.filter(
    (reading) => reading.timestamp.slice(0, 10) === latestDate
  )

  const minimum = todayReadings.reduce((lowest, reading) =>
    reading.level_percent < lowest.level_percent ? reading : lowest
  )

  const maximum = todayReadings.reduce((highest, reading) =>
    reading.level_percent > highest.level_percent ? reading : highest
  )

  const current = sortedReadings[sortedReadings.length - 1]

  const lowLevelReadings = todayReadings.filter(
    (reading) => reading.level_percent < LOW_LEVEL_THRESHOLD
  )

  return {
    current,
    minimum,
    maximum,
    lowLevelReadings,
  }
}
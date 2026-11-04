# AquaSense – Water Tank Monitoring Dashboard

## About the Project

I built AquaSense as part of the Mini-Build assignment from Nivoryx Systems.

The idea was to create a simple dashboard that shows the water level of a tank using the JSON data provided in the assignment. It displays the latest reading, the minimum and maximum water levels, and highlights readings that fall below 20%.

The dashboard currently works with the supplied sample data. It is not connected to a real water tank or sensor.

## What the Dashboard Shows

- **Current tank level:** Shows the latest available reading. For the supplied data, it is 55%.
- **Minimum and maximum:** Finds the lowest reading (18%) and highest reading (78%) for the reporting date.
- **Low-level alert:** Highlights readings below 20%. In the supplied data, the level reaches 18% at 16:00.
- **Water level chart:** Shows how the water level changes throughout the day. Hover over a point to see its time and reading.
- **Tank visual:** Displays the current water level inside a tank illustration.
- **Reading history:** Shows all eight readings in a table.

## Tools and Technologies

I used the following to build the dashboard:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts for the chart
- Lucide React for icons

## How the Data Works

The sample readings are stored in `src/data/tankReadings.json`.

Each reading has two fields:

- `timestamp` – when the reading was recorded.
- `level_percent` – the water level at that time.

The calculation logic is in `src/utils/tankCalculations.ts`.

It first filters out invalid readings and sorts the remaining readings by time. It then takes the date of the latest reading and uses readings from that date to calculate the minimum, maximum and low-level readings. The latest valid reading is treated as the current tank level.

The alert threshold is set to 20%.

**A note about the date:** All the supplied readings are from 2 November 2026. The dashboard uses the date in the sample data, rather than the computer's current date, when calculating the daily statistics.

## Project Structure

```text
aquasense-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── tankReadings.json   ← mock sensor readings
│   ├── types/
│   │   └── tank.ts             ← TankReading and TankSummary interfaces
│   ├── utils/
│   │   └── tankCalculations.ts ← validation, sorting, min/max/alert logic
│   ├── App.tsx                 ← dashboard layout and all UI components
│   ├── App.css                 ← all styles and responsive breakpoints
│   ├── index.css               ← base reset and font settings
│   └── main.tsx                ← React entry point
├── index.html
├── package.json
└── README.md
```

## Run the Project Locally

You need Node.js and npm installed.

First, clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project folder:

```bash
cd aquasense-dashboard
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal to view the dashboard.

## Build and Lint

To check the production build:

```bash
npm run build
```

To run the lint checks:

```bash
npm run lint
```


Built as part of the AquaSense Mini-Build assignment for Nivoryx Systems Private Limited.
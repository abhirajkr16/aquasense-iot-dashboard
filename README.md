
# AquaSense Mini-Build

A smart water monitoring mini-project developed as part of the AquaSense assignment for Nivoryx Systems Private Limited.

## Project Overview

This repository contains two parts:

### Part A: Tank Level Dashboard

A responsive dashboard that displays mock water tank readings.

Features:
- Current tank level
- Daily minimum and maximum levels
- Low water level alert when the tank level falls below 20%
- Mock readings from the provided JSON data

Folder: `aquasense-dashboard/`

### Part B: API Testing

Automated tests for the assumed AquaSense login and device status APIs.

Features:
- Login API testing
- Authentication checks
- Device status testing
- Offline device handling
- Malformed response validation
- Stale timestamp detection

Folder: `aquasense-api-testing/`

## Technologies Used

- React
- TypeScript
- JavaScript
- Node.js
- Axios
- Jest
- Nock

## Running the Projects

### Part A

```bash
cd aquasense-dashboard
npm install
npm run dev
```

### Part B

```bash
cd aquasense-api-testing
npm install
npm test
```

## API Testing Results

The automated test suite currently contains 8 test cases, all passing with mocked API responses.

No live backend or physical IoT device was provided. API responses are simulated using Nock.

## Documentation

- Part A details: `aquasense-dashboard/README.md`
- AI usage note: `aquasense-dashboard/ai-usage.md`
- Part B test plan: `aquasense-api-testing/test-plan.md`
- Part B details: `aquasense-api-testing/README.md`

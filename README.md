# AquaSense – Smart Water Monitoring

AquaSense is a mini-project developed for the AquaSense assignment by **Nivoryx Systems Private Limited**. It consists of a tank monitoring dashboard and an automated API testing module.

The project uses mock tank readings and simulated API responses to demonstrate the dashboard functionality and API testing approach.

## Project Overview

### Part A – Tank Level Dashboard

A web dashboard that displays water tank readings using the JSON data provided in the assignment.

**Features**
- Displays the current tank water level.
- Shows the minimum and maximum water levels for the day.
- Displays a low-water alert when the tank level drops below 20%.
- Presents the readings through a visual dashboard.

**Folder:** `aquasense-dashboard/`

### Part B – API Testing

An automated testing module for the assumed AquaSense login and device status APIs.

**Features**
- Tests login with valid and invalid credentials.
- Checks authentication using valid, invalid and missing tokens.
- Handles simulated offline device responses.
- Validates malformed device responses.
- Detects stale device timestamps.
- Checks tank-level boundary values (0% and 100%).

**Folder:** `aquasense-api-testing/`

## Tech Stack

### Frontend – Part A

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| TypeScript 7 | Type safety and maintainable code |
| Tailwind CSS 4 | Styling and responsive layouts |
| Vite 8 | Development server and build tool |
| Recharts 3 | Displaying tank readings through charts |
| Lucide React | Icons |
| Oxlint | Code linting |

### API Testing – Part B

| Technology | Purpose |
|---|---|
| JavaScript | Test and API client implementation |
| Node.js | JavaScript runtime |
| Axios | Sending HTTP requests |
| Jest | Running automated tests |
| Nock | Mocking API responses |

## Getting Started

Make sure Node.js and npm are installed before running either part.

### Run Part A – Dashboard

```bash
cd aquasense-dashboard
npm install
npm run dev
```

Vite will start the development server and provide a local URL to open the dashboard in your browser.

To create a production build:

```bash
npm run build
```

### Run Part B – API Tests

```bash
cd aquasense-api-testing
npm install
npm test
```

Jest will execute the automated test suite and display the results in the terminal.

## API Test Results

The Part B test suite contains **10 automated test cases**, covering:

1. Login with valid credentials.
2. Login with invalid credentials.
3. Login with missing credentials.
4. Device status with a valid token.
5. Device status with an invalid token.
6. Device status without a token.
7. Offline device response.
8. Malformed device response.
9. Stale `last_seen` timestamp.
10. Tank-level boundary values.

All 10 tests passed in the latest test run.

## Project Structure

```text
aquasense/
├── aquasense-dashboard/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── aquasense-api-testing/
│   ├── src/
│   │   └── apiClient.js
│   ├── tests/
│   │   └── api.test.js
│   ├── test-plan.md
│   ├── package.json
│   └── README.md
│
├── screenshots/
├── .gitignore
└── README.md
```

## Documentation

- [Dashboard Documentation](aquasense-dashboard/README.md)
- [AI Usage Note](aquasense-dashboard/ai-usage.md)
- [API Test Plan](aquasense-api-testing/test-plan.md)
- [API Testing Documentation](aquasense-api-testing/README.md)

## Notes

The dashboard uses the mock readings supplied in the assignment. For Part B, API responses are simulated using Nock because no live backend or physical IoT device was provided.

The offline response, HTTP status codes and five-minute stale-data threshold are testing assumptions rather than confirmed specifications from a live API.

---

**AquaSense Mini-Build Assignment**  
Developed by Abhiraj Kumar
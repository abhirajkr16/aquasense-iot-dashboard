# AquaSense API Testing

This section is for the API testing part of my AquaSense Mini-Build project at Nivoryx Systems Private Limited.

There are 2 APIs in this assignment. First is the user login API and second is the water tank device status API. As there was no real backend provided, I had to use mock responses to test how the API client would respond to different scenarios.

## Tools and Technologies

- **JavaScript** – writing the API client and test cases
- **Node.js** – running the project
- **Axios** – sending API requests
- **Jest** – running the tests
- **Nock** – mocking API responses

## Project Structure

```text
aquasense-api-testing/
├── src/
│   └── apiClient.js
├── tests/
│   └── api.test.js
├── test-plan.md
├── package.json
├── package-lock.json
└── README.md
```

## APIs Covered

### 1. Login

`POST /login`

This endpoint accepts an email and password. If the credentials are valid, it is expected to return an authentication token.

### 2. Device Status

`GET /device/{id}/status`

This endpoint returns the latest available information for a device.

Example response:

```json
{
  "level_percent": 75,
  "pump_state": "off",
  "last_seen": "2026-11-04T10:00:00Z"
}
```

The response contains the tank level, current pump state and the time when the device last reported its status.

## Running the Project

First, open the project folder:

```bash
cd aquasense-api-testing
```

Install the required packages:

```bash
npm install
```

Run the tests:

```bash
npm test
```

Jest will execute the test cases and show which tests passed or failed in the terminal.

## What I Tested

I wrote 10 automated test cases to cover normal usage as well as situations where something goes wrong.

| No. | Test case |
|---|---|
| 1 | Login with valid credentials |
| 2 | Login with invalid credentials |
| 3 | Login with missing credentials |
| 4 | Get device status using a valid token |
| 5 | Get device status using an invalid token |
| 6 | Get device status without a token |
| 7 | Handle a device-unavailable response |
| 8 | Handle an invalid device response |
| 9 | Identify an old `last_seen` timestamp |
| 10 | Check tank level values of 0% and 100% |

All 10 tests passed in my latest test run.

The detailed test scenarios and expected results are available in [test-plan.md](test-plan.md).

## How Mocking Works

I used Nock to intercept the HTTP requests made through Axios. Instead of sending requests to a real backend, Nock returns the responses defined in the test file.

This made it possible to test successful login, authentication errors and device-related edge cases without needing an actual server or IoT device.

## Assumptions

The assignment does not define exact error responses or a threshold for stale device data, so I used the following assumptions:

- HTTP 401 indicates an authentication failure.
- HTTP 503 indicates that the device is unavailable.
- A `last_seen` timestamp older than 5 minutes is considered stale.
- Tank levels between 0% and 100%, including both limits, are valid.

These values are used for the tests and are not confirmed specifications of a live AquaSense API.

## Limitations

Since the tests use mocked responses, they only check how my API client behaves with the simulated data. They do not test a real backend, actual device communication or network failures.

The project is intended to demonstrate the API testing approach described in the assignment.

## Test mobile app when Wi-Fi is disconnected.

I would first connect the mobile app and AquaSense device to the network and check whether the app is receiving real-time tank readings. Then I would perform a pump operation while disconnecting the device's Wi-Fi. I would check whether the app detects the connection loss and displays a message informing the user about the issue. The app should display the last known tank level along with its timestamp and indicate that the device is offline. If the device loses its connection after a pump command is sent, the app should not automatically assume that the command failed, as the device might have already received and executed it. Once Wi-Fi is restored, the app should fetch the latest device status and check the actual pump state. The command should only be sent again if necessary. This would help prevent duplicate commands and incorrect status information.
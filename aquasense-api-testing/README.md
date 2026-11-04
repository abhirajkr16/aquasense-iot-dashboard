# AquaSense API Testing

This project contains automated tests for the AquaSense login and device status APIs. It is developed as Part B of the AquaSense Mini-Build assignment for Nivoryx Systems Private Limited.

The tests use mocked API responses because a live backend was not provided.

## 1. Tech Stack

- JavaScript
- Node.js
- Axios
- Jest
- Nock

## 2. Project Structure

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

## 3. API Endpoints

### Login API

`POST /login`

Accepts email and password and returns an authentication token when login is successful.

### Device Status API

`GET /device/{id}/status`

Returns device information:

```json
{
  "level_percent": 75,
  "pump_state": "off",
  "last_seen": "2026-11-04T10:00:00Z"
}
```

## 4. Installation

Navigate to the API testing folder:

```bash
cd aquasense-api-testing
```

Install dependencies:

```bash
npm install
```

## 5. Running Tests

Execute the automated test suite:

```bash
npm test
```

Jest runs the test cases and displays the execution results in the terminal.

## 6. Test Coverage

The project contains 10 automated test cases covering:

1. Login with valid credentials.
2. Login with invalid credentials.
3. Login with missing credentials.
4. Device status with a valid token.
5. Device status with an invalid token.
6. Device status without a token.
7. Offline device response.
8. Malformed device response.
9. Stale `last_seen` timestamp.
10. Tank level boundary values (0% and 100%).

Refer to `test-plan.md` for the complete test scenarios and expected results.

## 7. Mocking

Nock intercepts HTTP requests and returns predefined responses. This allows the tests to run without connecting to an actual backend.

Axios is used to make HTTP requests, while Jest checks the returned data and expected errors.

## 8. Assumptions

- HTTP 401 represents an authentication failure.
- HTTP 503 represents an unavailable device.
- Device data older than 5 minutes is considered stale.
- Tank levels from 0% to 100% are considered valid.

These assumptions are used because the assignment does not specify exact error responses or a stale-data threshold.

## 9. Limitations

The automated tests verify client-side behavior against mocked API responses. They do not verify the actual Nivoryx backend, physical IoT devices, or real network communication.

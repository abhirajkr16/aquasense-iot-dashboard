# AquaSense API Test Plan

## 1. Objective

The objective is to test the AquaSense login API and device status API using automated tests. Jest is used as the testing framework, Axios handles HTTP requests, and Nock simulates API responses.

Since a live backend was not provided, all API responses are mocked.

## 2. Test Environment

| Component | Technology |
|---|---|
| Programming Language | JavaScript |
| Runtime | Node.js |
| HTTP Client | Axios |
| Testing Framework | Jest |
| API Mocking | Nock |

**Mock API Base URL:** `https://api.aquasense.test`

## 3. Test Cases

| ID | Test Scenario | Type | Expected Result |
|---|---|---|---|
| TC01 | Login with valid credentials | Positive | API returns an authentication token |
| TC02 | Login with invalid credentials | Negative | Login is rejected with HTTP 401 |
| TC03 | Login with missing credentials | Negative | Client rejects the request before sending it |
| TC04 | Get device status with a valid token | Positive | Device status is returned successfully |
| TC05 | Get device status with an invalid token | Negative | API rejects the request with HTTP 401 |
| TC06 | Get device status without a token | Negative | Client rejects the request before sending it |
| TC07 | Device is offline | Edge | API returns HTTP 503 and the client handles the error |
| TC08 | API returns malformed device data | Negative | Client rejects invalid tank-level data |
| TC09 | Device returns an old `last_seen` timestamp | Edge | Client identifies the data as stale |
| TC10 | Tank level boundary values (0% and 100%) | Edge | Both boundary values are accepted |

## 4. Automated Testing

The test cases are automated using Jest and Nock.

- Jest executes the test cases and checks the expected results.
- Axios sends requests to the mock API.
- Nock intercepts HTTP requests and provides predefined responses.
- Validation functions check device data and timestamp freshness.

Run the tests using:

```bash
npm test
```

## 5. Test Execution Results

Update this section after running the final test suite.

- Total test cases: 10
- Passed: To be confirmed
- Failed: To be confirmed

## 6. Assumptions

- HTTP 401 represents an authentication failure.
- HTTP 503 represents an unavailable device.
- Device data older than 5 minutes is considered stale.
- Tank level must be between 0 and 100 percent, inclusive.
- The API response structure follows the assignment description.
- The offline response and stale-data threshold are assumptions because exact specifications were not provided.

## 7. Mobile App Wi-Fi Disconnection Testing

To test the mobile app when the device loses Wi-Fi during an operation, I would first connect the device and mobile app to the network and verify that the app displays the latest tank status. Then I would disconnect the device's Wi-Fi while a pump operation is in progress. The app should detect that the device is unavailable, display an appropriate offline message and show the last known status with its timestamp instead of displaying outdated information as current. After reconnecting the device, the app should fetch the latest status and verify the actual pump state before retrying any pending operation. This helps prevent duplicate commands and incorrect status updates.

## 8. Limitations

These tests verify the API client's behavior using simulated responses. They do not verify the actual Nivoryx backend, physical IoT hardware, or real network communication.


# AquaSense API Test Plan

## 1. Objective

The purpose of these tests is to verify the login API and device status API. The tests cover successful requests, authentication failures, invalid responses, offline devices and timestamp validation.

## 2. Test Environment

- Runtime: Node.js
- Testing framework: Jest
- HTTP mocking: Nock
- HTTP client: Axios
- API base URL: https://api.aquasense.test

All API responses are mocked using Nock. No real backend or physical AquaSense device is required.

## 3. Test Cases

| ID | Test Scenario | Expected Result | Execution Result |
|---|---|---|---|
| TC01 | Login with valid credentials | API returns an authentication token | Passed |
| TC02 | Login with invalid credentials | API returns HTTP 401 | Passed |
| TC03 | Login with missing credentials | Client rejects the request | Passed |
| TC04 | Get device status with a valid token | Device status is returned successfully | Passed |
| TC05 | Get device status with an invalid token | API returns HTTP 401 and the invalid token is sent | Passed |
| TC06 | Get device status without a token | Client rejects the request | Passed |
| TC07 | Request status from an offline device | API returns HTTP 503 | Passed |
| TC08 | Receive a malformed device response | Client rejects the invalid tank level | Passed |
| TC09 | Receive an invalid last_seen timestamp | Client rejects the invalid timestamp | Passed |
| TC10 | Check device data older than five minutes | Data is identified as stale | Passed |
| TC11 | Check device data 4 minutes 59 seconds old | Data is identified as fresh | Passed |
| TC12 | Validate tank levels at 0% and 100% | Both boundary values are accepted | Passed |

## 4. Execution Results

The automated tests were executed using:

```bash
npm test
```

**Results:**
- Total test cases: 12
- Passed: 12
- Failed: 0

All 12 automated tests passed successfully.

## 5. How Mocking Works

Nock is used to mock HTTP requests made by Axios. It provides predefined responses for each test scenario, such as successful login, invalid credentials and unavailable devices.

This allows the API client to be tested without depending on a real backend or physical IoT device.

## 6. Mobile App Wi-Fi Disconnection Testing

To test the mobile app when the device loses Wi-Fi during an operation, I would first connect the device and mobile app to the network and verify that the app displays the latest tank status. Then I would disconnect the device's Wi-Fi while a pump operation is in progress. The app should detect that the device is unavailable, display an appropriate offline message and show the last known status with its timestamp instead of displaying outdated information as current. After reconnecting the device, the app should fetch the latest status and verify the actual pump state before retrying any pending operation. This helps prevent duplicate commands and incorrect status updates.

## 7. Assumptions and Limitations

- HTTP 401 represents an authentication failure.
- HTTP 503 represents an unavailable device.
- Device data older than five minutes is considered stale.
- Tank levels between 0 and 100, inclusive, are valid.
- The five-minute threshold and response status codes are assumptions for this assignment.
- All tests use mocked API responses. They do not verify communication with a real backend or physical IoT device.
- The mobile Wi-Fi scenario is a proposed manual testing approach, not an executed test.

const nock = require("nock");

const {
  login,
  getDeviceStatus,
  isLastSeenStale,
  validateDeviceStatus,
} = require("../src/apiClient");

const BASE_URL = "https://api.aquasense.test";

afterEach(() => {
  nock.cleanAll();
});

describe("Login API tests", () => {
  test("should return a token for valid credentials", async () => {
    nock(BASE_URL).post("/login").reply(200, { token: "test-token" });

    const result = await login("user@test.com", "password123");

    expect(result.token).toBe("test-token");
  });

  test("should reject invalid credentials", async () => {
    nock(BASE_URL)
      .post("/login")
      .reply(401, { message: "Invalid credentials" });

    await expect(
      login("user@test.com", "wrong-password"),
    ).rejects.toMatchObject({
      response: { status: 401 },
    });
  });

  test("should reject login when credentials are missing", async () => {
    await expect(login("", "password123")).rejects.toThrow(
      "Email and password are required",
    );
  });
});

describe("Device status API tests", () => {
  test("should return device status with a valid token", async () => {
    nock(BASE_URL)
      .get("/device/tank-101/status")
      .matchHeader("Authorization", "Bearer test-token")
      .reply(200, {
        level_percent: 75,
        pump_state: "off",
        last_seen: "2026-11-04T10:00:00Z",
      });

    const result = await getDeviceStatus("tank-101", "test-token");

    expect(result.level_percent).toBe(75);
    expect(result.pump_state).toBe("off");
  });

  test("should reject an invalid token", async () => {
    nock(BASE_URL)
      .get("/device/tank-101/status")
      .reply(401, { message: "Unauthorized" });

    await expect(
      getDeviceStatus("tank-101", "invalid-token"),
    ).rejects.toMatchObject({
      response: { status: 401 },
    });
  });

  test("should reject a request with a missing token", async () => {
    await expect(getDeviceStatus("tank-101", "")).rejects.toThrow(
      "Authentication token is required",
    );
  });

  test("should handle an offline device", async () => {
    nock(BASE_URL)
      .get("/device/tank-101/status")
      .reply(503, { message: "Device unavailable" });

    await expect(
      getDeviceStatus("tank-101", "test-token"),
    ).rejects.toMatchObject({
      response: { status: 503 },
    });
  });

  test("should reject a malformed device response", async () => {
    nock(BASE_URL).get("/device/tank-101/status").reply(200, {
      level_percent: "seventy-five",
      pump_state: "off",
      last_seen: "invalid-date",
    });

    await expect(getDeviceStatus("tank-101", "test-token")).rejects.toThrow(
      "Invalid tank level",
    );
  });

  test("should identify stale device data", () => {
    const lastSeen = "2026-11-04T10:00:00Z";
    const currentTime = new Date("2026-11-04T10:10:00Z");

    const result = isLastSeenStale(lastSeen, currentTime);

    expect(result).toBe(true);
  });

  test("should accept tank level boundary values of 0 and 100", () => {
    const zeroLevel = {
      level_percent: 0,
      pump_state: "off",
      last_seen: "2026-11-04T10:00:00Z",
    };

    const fullLevel = {
      level_percent: 100,
      pump_state: "on",
      last_seen: "2026-11-04T10:00:00Z",
    };

    expect(() => validateDeviceStatus(zeroLevel)).not.toThrow();
    expect(() => validateDeviceStatus(fullLevel)).not.toThrow();
  });
});

const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.aquasense.test",
  timeout: 5000,
});

// Login tests use this function
async function login(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const response = await api.post("/login", { email, password });
  return response.data;
}

// Check whether device data has the expected fields
function validateDeviceStatus(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid device response");
  }

  if (
    typeof data.level_percent !== "number" ||
    data.level_percent < 0 ||
    data.level_percent > 100
  ) {
    throw new Error("Invalid tank level");
  }

  if (!["on", "off"].includes(data.pump_state)) {
    throw new Error("Invalid pump state");
  }

  if (!data.last_seen || Number.isNaN(Date.parse(data.last_seen))) {
    throw new Error("Invalid last_seen timestamp");
  }
}

// Check whether the last device update is older than 5 minutes
function isLastSeenStale(lastSeen, now = new Date(), maxAgeMinutes = 5) {
  const lastSeenTime = Date.parse(lastSeen);

  if (Number.isNaN(lastSeenTime)) {
    return true;
  }

  const ageInMinutes = (now.getTime() - lastSeenTime) / 60000;

  return ageInMinutes > maxAgeMinutes;
}

// Get the latest device status
async function getDeviceStatus(deviceId, token) {
  if (!token) {
    throw new Error("Authentication token is required");
  }

  const response = await api.get(`/device/${deviceId}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  validateDeviceStatus(response.data);

  return response.data;
}

module.exports = {
  login,
  getDeviceStatus,
  validateDeviceStatus,
  isLastSeenStale,
};

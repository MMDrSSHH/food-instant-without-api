import { getApiRoute } from "./constants";

// utils/auth.js
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

async function fetchAccessToken() {
  if (isRefreshing) {
    // If a refresh is already in progress, wait for it to complete
    return new Promise((resolve) => {
      subscribeTokenRefresh(resolve);
    });
  }

  isRefreshing = true;

  try {
    const res = await fetch(`${getApiRoute()}/auth/refresh-token`, {
      method: "GET",
      credentials: "include", // Send cookies with the request
    });

    if (res.ok) {
      // Call all waiting subscribers with the new token
      onRefreshed();
      isRefreshing = false;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    isRefreshing = false;
    throw error;
  }
}

export async function getAccessToken() {
  return await fetchAccessToken();
}

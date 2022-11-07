const API_URL = `http://localhost:${
  process.env.NODE_ENV === "production" ? 4000 : 8000
}`;

async function httpGetPlanets() {
  const res = await fetch(`${API_URL}/planets`);
  return await res.json();
}

async function httpGetLaunches() {
  const res = await fetch(`${API_URL}/launches`);
  const launchesList = await res.json();
  return launchesList.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

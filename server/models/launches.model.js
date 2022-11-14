const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["NASA", "ZTM"],
  upcoming: true,
};

saveLaunch(launch);

async function getLatestFlightNumber() {
  const lastestFlightNumber = await launchesDatabase
    .findOne()
    .sort({ flightNumber: -1 });

  if (!getLatestFlightNumber) {
    DEFAULT_FLIGHT_NUMBER;
  }

  return lastestFlightNumber.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
  });

  await saveLaunch(newLaunch);
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  Object.assign(aborted, {
    ...aborted,
    upcoming: false,
    success: false,
  });

  return aborted;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};

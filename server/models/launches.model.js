const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

let latestFlightNumber = 100;

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
    {
      ...launch,
    },
    {
      upsert: true,
    }
  );
}

function addNewLaunch(newLaunch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(newLaunch, {
      flightNumber: latestFlightNumber,
      launchDate: new Date(newLaunch.launchDate),
      customer: ["NASA", "ZTM"],
      upcoming: true,
      success: true,
    })
  );

  return newLaunch;
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
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};

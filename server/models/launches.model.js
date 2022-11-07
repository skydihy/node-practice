const launches = new Map();
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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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

  return newLaunch
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};

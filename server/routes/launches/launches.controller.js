const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  if (isNaN(new Date(launch.launchDate))) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  let newLaunch = {
    ...launch,
    launchDate: new Date(req.body.launchDate),
  };

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};

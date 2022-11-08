const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
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

function httpAbortLaunch(req, res) {
  const id = +req.params.id;

  if (!existsLaunchWithId(id)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(id)
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};

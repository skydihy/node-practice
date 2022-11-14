const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
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

  scheduleNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
  const id = +req.params.id;

  const existsLaunch = await existsLaunchWithId(id);

  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(id);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};

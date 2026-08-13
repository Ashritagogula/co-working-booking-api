const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res, next) => {
  try {
    const workspace = new Workspace(req.body);
    await workspace.save();
    res.status(201).json(workspace);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ errors: [{ msg: 'Workspace name must be unique' }] });
    }
    next(err);
  }
};

exports.getWorkspaces = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const workspaces = await Workspace.find(filter);
    res.status(200).json(workspaces);
  } catch (err) {
    next(err);
  }
};

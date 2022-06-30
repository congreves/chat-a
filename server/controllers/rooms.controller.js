/*const model = require("../models/rooms.model");

async function createRoom(req, res) {
  if (!res) {
    return console.log("The must be a user");
  }
  try {
    const result = await model.createOne(req, res);
    return result;
  } catch (error) {
    return console.log("Oh no, room could not be created");
  }
}
async function getOneRoom(req, res) {
  if (!res) {
    return console.log("Room does not exist");
  }
  try {
    const result = await model.getOne(req);
    return result;
  } catch (error) {
    return console.log("Oh no, user could not be created");
  }
}

async function getAllRooms(req, res) {
  if (!res) {
    return console.log("No rooms!");
  }
  try {
    const result = await model.getAll(req);
    return result;
  } catch (error) {
    return console.log("Oh no, could not get rooms");
  }
}
async function deleteOneRoom(req, res) {
    if (!res) {
      return console.log("There must be a room");
    }
    try {
      const result = await model.deleteOne(req);
      return result;
    } catch (error) {
      return console.log("Oh no, Could not delete room");
    }
  }

module.exports = {
  createRoom,
  getOneRoom,
  getAllRooms,
  deleteOneRoom
};
*/
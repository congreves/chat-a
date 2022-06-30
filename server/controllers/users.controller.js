/* const model = require("../models/users.model");

async function createUser(req, res) {
  if (!res) {
    return console.log("The must be a user");
  }
  try {
    const result = await model.createOne(req, res);
    return result;
   
  } catch (error) {
    return console.log("Oh no, user could not be created");
  }
}
async function getOneUser(req, res) {
    if (!res) {
      return console.log("User does not exist");
    }
    try {
      const result = await model.getOne(req, res);
      return result;
     
    } catch (error) {
      return console.log("Oh no, user could not be created");
    }
  }

  async function getAllUsers(req, res) {
    if (!res) {
      return console.log("The must be a user");
    }
    try {
      const result = await model.getAll(req, res);
      return result;
     
    } catch (error) {
      return console.log("Oh no, user could not be created");
    }
  }


module.exports = {
createUser,
getOneUser,
getAllUsers,
}
*/
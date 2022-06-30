const db = require("../config/db");


function createOne(name) {
  const sql = "INSERT INTO rooms (room_name) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.run(sql, name, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(name);
    });
  });
}

function getOne(id) {
  const sql = "SELECT * FROM rooms WHERE id =?";
  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, room) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}
function getAll() {
  const sql = "SELECT * FROM rooms";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, room) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}

function deleteOne(room_name) {
  const sql = "DELETE FROM rooms WHERE room_name = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, room_name, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room_name);
    });
  });
}

module.exports = {
  createOne,
  getOne,
  getAll,
  deleteOne
};

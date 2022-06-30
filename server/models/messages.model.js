const db = require("../config/db");

function createMessage({ message, username, user_id, room_name, avatar, time }) {
  const sql = "INSERT INTO messages (message, username, user_id, room_name, avatar, time) VALUES (?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.run(sql, [message, username, user_id, room_name, avatar, time], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getRoomMessages(room_name) {
  const sql = "SELECT * FROM messages WHERE room_name =?";
  return new Promise((resolve, reject) => {
    db.all(sql, room_name, (error, room) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}


function deleteRoomMessages(room_name) {
  const sql = "DELETE FROM messages WHERE room_name = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, room_name, (error, room) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}

module.exports = {
  createMessage,
  getRoomMessages,
  deleteRoomMessages,
};

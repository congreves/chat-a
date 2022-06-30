const db = require("../config/db");


function createOne(id, username) {
    const sql = "INSERT INTO users (id, username) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        db.run(sql, [id, username], (error, user) => {
            if(error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        })
    })

}

function getOne(id) {
const sql = "SELECT * FROM users WHERE id =?"
return new Promise((resolve, reject) => {
    db.get(sql, id, (error, user) => {
        if (error) {
            console.error(error.message);
            reject(error);
        }
        resolve(user);
    })

})
}
function getAll() {
    const sql = "SELECT * FROM users"
    return new Promise((resolve, reject) => {
        db.all(sql, (error, user) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(user);
        })
    })
    }

module.exports = {
    createOne,
    getOne,
    getAll
}
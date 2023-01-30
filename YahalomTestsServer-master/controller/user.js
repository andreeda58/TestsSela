const db = require("../DAL/db.userRepository");

class UserController {
  // Get Questions
  getAllUsers() {
    return db.getAllUsers();
  }

  // Add question to the list
  addUser(user) {
    return db.addUser(user);
  }

  getUserById(id){
    return db.getUserByID(id);
  }

  editUser(newUser){

    return db.editUser(newUser);
  }

}

module.exports = new UserController();

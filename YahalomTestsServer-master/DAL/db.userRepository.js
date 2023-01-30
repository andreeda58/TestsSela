const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const UserDataFile = "./data/jsonUserData.json";

class DBUserRepository {

  async getUserByID(userID) {
    return JSON.parse(await readFile(UserDataFile)).filter(element => element.id == userID)
  }

  async getAllUsers() {
    const data = JSON.parse(await readFile(UserDataFile));
    return data;
  }

  async addUser(user) {
    let data = JSON.parse(await readFile(UserDataFile));

    let newUser =
    {
      id: user.id,
      name:user.name,
      lastName:user.lastName,
      email:user.email,
      //examId:user.examId,
     
    };

    try {
      data.push(newUser);
      await writeFile(UserDataFile, JSON.stringify(data));

    } catch (error) {
      console.log(error);
    }
    return newUser;
  }

  async editUser(updateUser) {
    
    let data =JSON.parse( await readFile(UserDataFile));
    
    let newdata=data.filter(a=>a.id!=updateUser.id);
    newdata.push(updateUser);
    await writeFile(UserDataFile, JSON.stringify(newdata));
    return updateUser;
  }
}


module.exports = new DBUserRepository();

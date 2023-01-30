import http from "./httpService";



const serverRoute = "/api/User/";

const UserService = {
  async getAllUsers() {
    return await http.get(serverRoute + "getUsers");
  },

  async addUser(user) {
    return await http.post(serverRoute + "addUser", user);
  },
  async getUserById(id) {
    
    return await http.get(serverRoute + `getUserById/${id}`);
  },

  async editUser(user){
    return await http.put(serverRoute + "editUser", user);
  }
};

export default UserService;

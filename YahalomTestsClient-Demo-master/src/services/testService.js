import http from "./httpService";



const serverRoute = "/api/Test/";

const TestService = {
  async getAllTests() {
    return await http.get(serverRoute + "getTests");
  },

  async addTest(test) {
    return await http.post(serverRoute + "addTest", test);
  },

  async getTestById(id) {
    
    return await http.get(serverRoute + `getTestById/${id}`);
  },

  async editTest(newTest){
    return await http.put(serverRoute + `editTest`,newTest);
  }
};

export default TestService;
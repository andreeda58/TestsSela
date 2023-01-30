import http from "./httpService";



const serverRoute = "/api/Questions/";

const QuestionService = {
  async getAllQuestions() {
    return await http.get(serverRoute + "getQuestions");
  },

  async addQuestion(question) {
    return await http.post(serverRoute + "addQuestion", question);
  },
  async getQuestionById(id) {
    
    return await http.get(serverRoute + `getQuestionById/${id}`);
  },

  async editQuestion(newQuestion){
    return await http.put(serverRoute + "editQuestion", newQuestion);
  }
};

export default QuestionService;

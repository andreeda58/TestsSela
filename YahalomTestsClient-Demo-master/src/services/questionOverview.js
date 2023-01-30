import http from "./httpService";



const serverRoute = "/api/QuestionOverview/";

const QuestionOverviewService = {
  async getAllQuestionsOverview() {
    return await http.get(serverRoute + "getQuestionsOverview");
  },

  async addQuestionOverview(question) {
    return await http.post(serverRoute + "addQuestionOverview", question);
  },
  async getQuestionOverviewById(id) {
    
    return await http.get(serverRoute + `getQuestionOverviewById/${id}`);
  },

  async editQuestionOverview(newQuestion){
    return await http.put(serverRoute + "editQuestionOverview", newQuestion);
  },

  async GetAllAnswersUserByExamId(id){
    return await http.get(serverRoute + `GetAllAnswersUserByExamId/${id}`);
  },

  async GetQuestionOverviewsByQuestionId(id){
    return await http.get(serverRoute + `getQuestionOverviewsByQuestionId/${id}`);
  }
  
};

export default  QuestionOverviewService ;
  

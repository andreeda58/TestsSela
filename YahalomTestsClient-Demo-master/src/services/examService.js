import http from "./httpService";



const serverRoute = "/api/Exam/";

const ExamService = {
  async getAllExams() {
    return await http.get(serverRoute + "getExams");
  },

  async addExam(exam) {
    return await http.post(serverRoute + "addExam", exam);
  },
  async getExamById(id) {
    
    return await http.get(serverRoute + `getExamById/${id}`);
  },

  async editExam(newExam){
    return await http.put(serverRoute + "ediExam", newExam);
  },

  async getTestsByDate(start, end){
    debugger
    return await http.post(serverRoute + "examsByDate",{startDate:start,endDate:end})
  },
  
  async getExamsByUserId(id){
    return await http.get(serverRoute + `examsByUserId/${id}`)
  }
};

export default ExamService;

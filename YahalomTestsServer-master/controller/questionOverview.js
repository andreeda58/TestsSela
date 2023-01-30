const db = require("../DAL/db.questionOverviewRepository.js");

class QuestionOverviewController {
 
  getAllQuestionsOverview() {
    return db.getAllQuestionsOverview();
  }

  getQuestionOverviewById(id){
    return db.getQuestionOverviewById(id);
  }

  editQuestionOverview(newQuestion){

    return db.editQuestionOverview(newQuestion);
  }

  
  addQuestionOverview(question) {
    
    return db.addQuestionOverview(question);
  }

  getAllAnswersById(id){
    
    return db.getAllAnswersById(id);
  }

  
  getQuestionOverviewByQuestionId(id){
    
    return db.getQuestionOverviewsByQuestionId(id);
  }
}

module.exports = new QuestionOverviewController();

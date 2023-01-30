const db = require("../DAL/db.questionsRepository.js");

class QuestionsController {
  // Get Questions
  getAllQuestions() {
    return db.getAllQuestions();
  }

  getQuestionById(id){
    return db.getQuestionByID(id);
  }

  editQuestion(newQuestion){

    return db.editQuestion(newQuestion);
  }

  // Add question to the list
  addQuestion(question) {
    return db.addQuestion(question);
  }
}

module.exports = new QuestionsController();

const db = require("../DAL/db.examRepository");

class ExamController {
  // Get Questions
  getAllExams() {
    return db.getAllExams();
  }

  // Add question to the list
  addExam(exam) {
    return db.addExam(exam);
  }

  getExamById(id){
    return db.getExamByID(id);
  }

  editExam(newExam){

    return db.editExam(newExam);
  }

  getTestsByDate(exams){
    console.log(exams);
    return db.getTestsByDate(exams);
   
  }

  getExamsByUserId(id){
    console.log("getExamsByUserId")
    console.log(id)

    return db.getExamsByUserId(id);
  }

}

module.exports = new ExamController();

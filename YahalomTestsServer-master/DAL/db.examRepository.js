const fs = require("fs");
const { start } = require("repl");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const ExamDataFile = "./data/jsonExamData.json";

class DBExamRepository {

  async getExamByID(ExamID) {
    return JSON.parse(await readFile(ExamDataFile)).filter(element => element.id == ExamID)
  }

  async getAllExams() {
    const data = JSON.parse(await readFile(ExamDataFile));
    return data;
  }

  async addExam(exam) {
    const data = JSON.parse(await readFile(ExamDataFile));

    let newExam =
    {
      id: exam.id,
      user: exam.user,
      testId: exam.testId,
      studentId: exam.studentId,
      questionOverviewId: exam.questionOverviewId,
      numOfQuestionsAnswered: exam.numOfQuestionsAnswered,
      grade:exam.grade,
      status:exam.status,
      correctAnswers:exam.correctAnswers,
      date: new Date(Date.now()).toLocaleDateString()
    };

    try {
      data.push(newExam);
      await writeFile(ExamDataFile, JSON.stringify(data));

    } catch (error) {
      console.log(error);
    }
    return newExam;
  }

 
  async getTestsByDate(dates) {

    const data = JSON.parse(await readFile(ExamDataFile));
    const tests = data.filter(n => n.date>=dates.startDate && n.date<=dates.endDate)

    return tests;
  }

  async getExamsByUserId(id){
    const data = JSON.parse(await readFile(ExamDataFile));
    const examsByUserId=data.filter(n=>n.user.id==id);
    return examsByUserId
  }

}

module.exports = new DBExamRepository();

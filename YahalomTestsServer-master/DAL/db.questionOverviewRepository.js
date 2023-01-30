const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const questionDataFile = "./data/jsonQuestionsOverviewData.json";

class DBQuestionsOverviewRepository {

  async getQuestionOverviewById(questionID) {
    return JSON.parse(await readFile(questionDataFile)).filter(element => element.id == questionID)
  }

  async getAllQuestionsOverview() {
    const data = JSON.parse(await readFile(questionDataFile));
    return data;
  }

  async addQuestionOverview(question) {
    let data = JSON.parse(await readFile(questionDataFile));

    try {
      data.push(question);
      await writeFile(questionDataFile, JSON.stringify(data));

    } catch (error) {
      console.log(error);
    }
    return newQuestion;
  }

  async editQuestionOverview(updateQuestion) {

    let data = JSON.parse(await readFile(questionDataFile));
    let newdata = data.filter(a => a.questionId != updateQuestion.id);

    newdata.push(updateQuestion);
    await writeFile(questionDataFile, JSON.stringify(newdata));
    return updateQuestion;
  }

  async getQuestionOverviewsByQuestionId(id) {

    console.log(id);
    const data = JSON.parse(await readFile(questionDataFile));
    let data2= data.filter((q) => q.questionId ==id);
    return data2;
  }


  async getAllAnswersById(id) {
    let answersUser;
    try {

      const data = JSON.parse(await readFile(questionDataFile));
      answersUser = data.filter(a => a.examId == id);

    } catch (error) {
      console.log(error);

    }

    return answersUser;
  }
}


module.exports = new DBQuestionsOverviewRepository();

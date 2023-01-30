const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const questionDataFile = "./data/jsonQuestionsData.json";

class DBQuestionsRepository {

  async getQuestionByID(questionID) {
    return JSON.parse(await readFile(questionDataFile)).filter(element => element.id == questionID)
  }

  async getAllQuestions() {
    const data = JSON.parse(await readFile(questionDataFile));
    return data;
  }

  async addQuestion(question) {
    let data = JSON.parse(await readFile(questionDataFile));
    let biggestId = 0;
    if (data.length)
      biggestId = Math.max.apply(Math, data.map((question) => question.id));

    let newQuestion =
    {
      id: biggestId + 1,
      content: question.content,
      tags: question.tags,
      complementContent: question.complementContent,
      display: question.display,
      questionKind: question.questionKind,
      topic: question.topic,
      answer: question.answer,
      lastChange: new Date(Date.now()).toLocaleDateString()
    };

    try {
      data.push(newQuestion);
      await writeFile(questionDataFile, JSON.stringify(data));

    } catch (error) {
      console.log(error);
    }
    return newQuestion;
  }

  async editQuestion(updateQuestion) {
    
    let data =JSON.parse( await readFile(questionDataFile));
    
    let newdata=data.filter(a=>a.id!=updateQuestion.id);
    newdata.push(updateQuestion);
    await writeFile(questionDataFile, JSON.stringify(newdata));
    return updateQuestion;
  }
}


module.exports = new DBQuestionsRepository();

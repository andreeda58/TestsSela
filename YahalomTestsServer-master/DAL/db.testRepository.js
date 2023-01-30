const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonTestFileName = "./data/jsonTestData.json";

class DBTestRepository {
  async getTestByID(testID) {
    return JSON.parse(await readFile(jsonTestFileName)).filter(element => element.id == testID)
  }

  async getAllTests() {
    const data = JSON.parse(await readFile(jsonTestFileName));
    return data;
  }

  async addTest(test) {
    let data = JSON.parse(await readFile(jsonTestFileName));
    let biggestId = 0;
    if (data.length)
      biggestId = Math.max.apply(Math, data.map((test) => test.id));

      let testToAdd=
      {
        id:biggestId+1,
        name:test.name,
        topic:test.topic,
        questions:test.questions,
        lenguage:test.lenguage,
        noteToPass:test.noteToPass,
        showAnswer:test.showAnswer,
        textSucced:test.textSucced,
        textFailed:test.textFailed,
        header:test.header,
        numbersOfQuestions:test.questions.length,
        date: new Date(Date.now()).toLocaleDateString()
      }
      
    try {
      data.push(testToAdd);
      await writeFile(jsonTestFileName, JSON.stringify(data));

    } catch (error) {
      console.log(error);
    }
    return testToAdd;
  }

  async editTest(updateTest) {
   
    let data =JSON.parse( await readFile(jsonTestFileName));
    
    let newdata=data.filter(a=>a.id!=updateTest.id);
    newdata.push(updateTest);
    await writeFile(jsonTestFileName, JSON.stringify(newdata));
    return updateTest;
  }
  
}

module.exports = new DBTestRepository();
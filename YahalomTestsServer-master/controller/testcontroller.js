const db = require("../DAL/db.testRepository");

class TestController {


  
  getTestById(id){
    return db.getTestByID(id);
  }

  // Get Questions
  getAllTests() {
    return db.getAllTests();
  }

  // Add question to the list
  addTest(test) {
    console.log(test);
    return db.addTest(test);
  }

  editTest(newTest){
    console.log(newTest);
    return db.editTest(newTest);
  }
}

module.exports = new TestController();

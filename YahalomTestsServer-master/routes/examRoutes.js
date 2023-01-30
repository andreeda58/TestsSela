const express = require("express");
const router = express.Router();
const controller = require("../controller/Exam");
const asyncHandler = require("../helpers/asyncHandler");

router.get(
  "/getExams",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllExams();
    res.send(data);
  })
);


router.get("/getExamById/:id", asyncHandler(async (req, res) => {

  const Id = req.params.id;

  try {
    const data = await controller.getExamById(Id);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}))


// Add question to the list in json
router.post(
  "/addExam",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.addExam(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

////async getTestsByDate(start, end){
// return await http.post(serverRoute + "examsByDate",{startDate:start,endDate:end})

router.post("/examsByDate", asyncHandler(async (req, res) => {
  const data = await controller.getTestsByDate(req.body)
  res.status(200).send(data);

}))


router.get("/examsByUserId/:id", asyncHandler(async (req, res) => {
  const data = await controller.getExamsByUserId(req.params.id)
  res.status(200).send(data);
}))


router.put("/ediExam", asyncHandler(async (req, res) => {

  //const Id =req.params.id;
  try {
    console.log(req.body);
    const data = await controller.editExam(req.body);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }

}))

module.exports = router;

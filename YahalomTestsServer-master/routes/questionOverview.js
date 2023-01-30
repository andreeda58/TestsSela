const express = require("express");
const router = express.Router();
const controller = require("../controller/questionOverview");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json

router.get("/getQuestionOverviewsByQuestionId/:id",asyncHandler(async(req,res)=>{

  const Id =req.params.id;
  const data = await controller.getQuestionOverviewByQuestionId(Id);

  res.send(data);
}));

router.get(
  "/getQuestionsOverview",
  asyncHandler(async (req, res) => {
    
    const data = await controller.getAllQuestionsOverview();

    res.send(data);
  })
);


router.get("/getQuestionOverviewById/:id",asyncHandler(async(req,res)=>{

  const Id =req.params.id;

  try {
    const data = await controller.getQuestionOverviewById(Id);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}))


router.get("/GetAllAnswersUserByExamId/:id",asyncHandler(async(req,res)=>{

  const Id =req.params.id;

  try {
    const data = await controller.getAllAnswersById(Id);
    
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}))



// Add question to the list in json
router.post(
  "/addQuestionOverview",
  asyncHandler(async (req, res) => {
    try {
      
      console.log(req.body);
     
      const data = await controller.addQuestionOverview(req.body);

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

router.put("/editQuestionOverview", asyncHandler(async (req,res)=>{

  //const Id =req.params.id;
   try {
     console.log(req.body);
    const data = await controller.editQuestionOverview(req.body);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }

}))

module.exports = router;

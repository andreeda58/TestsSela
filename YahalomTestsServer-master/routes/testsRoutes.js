const express = require("express");
const router = express.Router();
const controller = require("../controller/testcontroller");
const asyncHandler = require("../helpers/asyncHandler");

router.get("/getTestById/:id",asyncHandler(async(req,res)=>{

  const Id =req.params.id;

  try {
    const data = await controller.getTestById(Id);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}))
// Get questions from json
router.get(
  "/getTests",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllTests();

    res.send(data);
  })
);

// Add question to the list in json
router.post(
  "/addTest",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.addTest(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

router.put(
  "/editTest",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.editTest(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const asyncHandler = require("../helpers/asyncHandler");



router.get(
  "/getUsers",
  asyncHandler(async (req, res) => {
    
    const data = await controller.getAllUsers();

    res.send(data);
  })
);


router.get("/getUserById/:id",asyncHandler(async(req,res)=>{

  const Id =req.params.id;

  try {
    const data = await controller.getUserById(Id);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}))


// Add question to the list in json
router.post(
  "/addUser",
  asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.params);
      const data = await controller.addUser(req.body);

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

router.put("/editUser", asyncHandler(async (req,res)=>{

  //const Id =req.params.id;
   try {
     console.log(req.body);
    const data = await controller.editUser(req.body);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }

}))

module.exports = router;

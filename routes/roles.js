var express = require('express');
var router = express.Router();
const Roles = require("../db/models/Roles");
const Roles = require("../lib/Response");
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const _enum = require('../config/enum');

router.get("/", async (req, res) => {
  
  try {
    let roles = await Roles.find();
    res.json(Response.succesResponse(roles));



  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
  
})

router.post("/add", async (req, res) => {
  let body = req.body;
  try {
    if(!body.role_name) throw CustomError(_enum.HTTP_CODES.BAD_REQUEST, "Name field must be filled!")
    let role = new Roles({
      role_name: body.role_name,
      is_active: true,
      created_by: req.user?.id,
    });

    await role.save();

    res.json(Response.succesResponse({succes: true,}));

  } catch (error) {
        let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
})

router.post("/update", async (req, res) => {
  let body = req.body;
  try {


    if(!body._id) throw CustomError(_enum.HTTP_CODES.BAD_REQUEST, "ID field must be filled!")

    let updates = {};

    let role = new Roles({
      role_name: body.role_name,
      is_active: true,
      created_by: req.user?.id,
    });

    await role.save();

    res.json(Response.succesResponse({succes: true,}));

  } catch (error) {
        let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
})



module.exports = router;

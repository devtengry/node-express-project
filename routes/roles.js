var express = require('express');
var router = express.Router();
const Roles = require("../db/models/Roles");
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
    if(!body.role_name) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST, "Name field must be filled!")
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


    if(!body._id) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST, "ID field must be filled!")

    let updates = {};

    if (body.role_name) updates.role_name = body.role_name;
    if(typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await Roles.updateOne({_id: body._id}, updates);


    res.json(Response.succesResponse({succes: true,}));

  } catch (error) {
        let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
})

router.post("/delete", async (req, res) => {
  let body = req.body;
  try {

    if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user.language), i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user.language, ["_id"]));

    await Roles.deleteOne({_id: body._id});


    res.json(Response.succesResponse({succes: true,}));

  } catch (error) {
        let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.code).json(errorResponse);
  }
})



module.exports = router;

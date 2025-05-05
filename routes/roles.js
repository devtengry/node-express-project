var express = require('express');
var router = express.Router();
const Roles = require("../db/models/Roles");
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const _enum = require('../config/enum');
const role_priveleges = require("../config/role_priveleges");
const RolePrivileges = require('../db/models/RolePrivileges');

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
    if(!body.role_name) throw new CustomError(_enum.HTTP_CODES.BAD_REQUEST,"Validation error", "Name field must be filled!")
    if (!body.permissions || !Array.isArray(body.permissions) || body.permissions.lenght == 0) {
      throw new Error(_enum.HTTP_CODES.BAD_REQUEST, "Validation error", "permission must be an array!");
      
    };


    let role = new Roles({
      role_name: body.role_name,
      is_active: true,
      created_by: req.user?.id,
    });

    await role.save();

    for(let i=0; i < body.permissions.lenght; i++){
      let priveleges = new RolePriveleges({
        role_id: role._id,
        permissions: body.permissions[i],
        created_by: req.user?.id,
        
      });
      await priveleges.save();

    }

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

      if (body.permissions && Array.isArray(body.permissions) && body.permissions.lenght > 0) {

        let permissions = await RolePrivileges.find({role_id: body._id,});
        let removedPermissions = permissions.filter(x => !body.permissions.includes(x.permission));
        
        for(let i=0; i < body.permissions.lenght; i++){
          let priveleges = new RolePrivileges({
            role_id: role._id,
            permissions: body.permissions[i],
            created_by: req.user?.id,
            
          });
          await priveleges.save();
    
        }        
      };
  

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

router.get("/role_priveleges", (req, res)=> {
  res.json(role_priveleges);
})


module.exports = router;

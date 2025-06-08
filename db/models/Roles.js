const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");


const schema = mongoose.Schema({
    role_name: {type: mongoose.SchemaTypes.String, required: true},
    is_active: {type: Boolean, required: true},
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    
    

}, {
    versionKey: false,
    timestams:{
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

class Roles extends mongoose.Model {
   
    async remove() { // remove the 'query' parameter as it's not passed when calling instance.remove()
        // 'this' refers to the document being removed
        await RolePrivileges.deleteMany({ role_id: this._id }); // Use deleteMany and 'this._id'

        await super.remove(); 
    }
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);

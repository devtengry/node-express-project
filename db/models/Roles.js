const mongoose = require("mongoose")


const schema = mongoose.Schema({
    role_name: {type: mongoose.SchemaTypes.String, required: true},
    is_active: {type: Boolean, required: true},
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    
    

}, {
    versionKey: false,
    timestams:{
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

class Roles extends mongoose.Model {
   
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
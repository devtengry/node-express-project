// db/Databese.js

const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../config/index.js"); 

let instance = null;

class Database {
    constructor() {
        if (!instance) {
            this.mongoConnecion = null;
            instance = this;
        }
        return instance;
    }

    async connect() {
        try {
            console.log("DB Connecting.");
            let db = await mongoose.connect(CONNECTION_STRING); 
            this.mongoConnecion = db;
            console.log("DB Connected.");
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
}

module.exports = Database;

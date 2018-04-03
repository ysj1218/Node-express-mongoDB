const db = require('../utils/database.js');

const schema = new db.Schema({
	logo:{
		type: String
	},
	jobName:{
		type: String
	},
	companyName: {
		type: String
	},
	experience: {
		type: String
	},
	jobType: {
		type: String
	},
	address: {
		type: String
	},
	salary: {
		type: String
	}
})

const Job = db.model("jobs", schema);

module.exports = Job;
const Job = require("../models/job.js");
const {getResponse} = require("../utils/utils.js");

const addOrUpdate = function(req, res, next) {

	if (!req.body.id) {
		const Info = new Job({
			logo: req.file && req.file.filename ? req.file.filename: "",
			jobName: req.body.jobName,
			companyName: req.body.companyName,
			experience: req.body.experience,
			jobType: req.body.jobType,
			address: req.body.address,
			salary: req.body.salary
		});

		Info.save().then(() => {
			res.redirect("/position")
		})
	}else {

		const setObj = {
			jobName: req.body.jobName,
			companyName: req.body.companyName,
			experience: req.body.experience,
			jobType: req.body.jobType,
			address: req.body.address,
			salary: req.body.salary
		}

		if (req.file && req.file.filename) {
			setObj.logo = req.file.filename;
		}

		Job.findByIdAndUpdate(req.body.id, {
			$set: setObj
		}).then(() => {
			res.redirect("/position")
		})
	}
}

const getList = function(req, res, next) {
	let {pageNum, pageSize} = req.query;
	Job.find({})
		.then((items) => {
			let total = items.length;
			Job.find({})
				.skip((pageNum - 1) * pageSize)
				.limit(parseInt(pageSize, 10))
				.then((results) => {
					res.json(getResponse({
						list: results,
						total: total,
						pageSize: pageSize,
						pageNum: pageNum,
						totolPage: Math.ceil(total / pageSize)
					}));
				})
		})
}

const getItem = function(req, res, next) {
	Job.findOne({_id:req.query.id})
		.then((item) => {
			res.json(getResponse({item: item}));
		})
}

const deleteItem = function(req, res, next) {
	Job.findByIdAndRemove(req.query.id)
		.then((result) => {
			console.log(req.body.id);
			res.json(getResponse({delete: true}));
		})
}

module.exports = {addOrUpdate, getList, deleteItem, getItem};
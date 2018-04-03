var Page = function() {
	this.dialogElem = $("#posadd-modal");
	this.idInput = this.dialogElem.find("#id");
	this.logoInput = this.dialogElem.find("#logo");
	this.jobNameInput = this.dialogElem.find("#jobName");
	this.companyNameInput = this.dialogElem.find("#companyName");
	this.experienceInput = this.dialogElem.find("#experience");
	this.jobTypeInput = this.dialogElem.find("#jobType");
	this.addressInput = this.dialogElem.find("#address");
	this.salaryInput = this.dialogElem.find("#salary");
}

$.extend(Page.prototype, {

	init: function() {
		this.createHeader();
		this.initList();
		this.bindEvents();
	},

	createHeader: function() {
		this.header = new Header(1);
	},

	initList: function() {
		var container = $("#list-con");
		this.pageList = new JobList(container);
	},

	bindEvents: function() {
		var submitBtn = $("#submitBtn"),
			addItemBtn = $("#addItemBtn"),
			pageList = $(this.pageList);
		submitBtn.on("click", $.proxy(this.handleSubmitClick, this));
		addItemBtn.on("click", $.proxy(this.handleAddItemClick, this));
		pageList.on("update", $.proxy(this.getItemById, this));
		pageList.on("data", $.proxy(this.handleGetPageData, this))
	},

	handleAddItemClick: function() {
		this.logoInput.val("");
		this.idInput.val("");
		this.jobNameInput.val("");	
		this.companyNameInput.val("");
		this.experienceInput.val("");
		this.jobTypeInput.val("");
		this.addressInput.val("");
		this.salaryInput.val("");
	},

	handleSubmitClick: function() {
		$("#postJobForm").submit();
	},

	getItemById: function(e) {
		$.ajax({
      		url: '/api/job/getItem',
		    data: {id: e.id},
		    success: $.proxy(this.handleGetItemSucc, this)
    	})
	},

	handleGetItemSucc: function(res) {
		var result = res.data.item;
		this.logoInput.val("");
		this.idInput.val(result._id);
		this.jobNameInput.val(result.jobName);	
		this.companyNameInput.val(result.companyName);
		this.experienceInput.val(result.experience);
		this.jobTypeInput.val(result.jobType);
		this.addressInput.val(result.address);
		this.salaryInput.val(result.salary);
		this.dialogElem.modal("show");
	},

	handleGetPageData: function(e) {
		if (!this.pagination) {
			var container = $("#paginationCon");
			this.pagination = new ListPagination(container);
			$(this.pagination).on("change", $.proxy(this.handlePageChange, this));
		}
		this.pagination.render(e.res);
	},

	handlePageChange: function(e) {
		this.pageList.getListInfo(e.page);
	}
	
})
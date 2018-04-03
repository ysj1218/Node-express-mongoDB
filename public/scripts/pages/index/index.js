var Page = function() {}

$.extend(Page.prototype, {

	init: function() {
		this.createHeader();
	},

	createHeader: function() {
		this.header = new Header(0);
	}
	
})
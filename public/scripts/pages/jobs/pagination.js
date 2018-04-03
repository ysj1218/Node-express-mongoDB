var ListPagination = function(container) {
	this.container = container;
	this.init();
}

ListPagination.Temp = `
    <li page="1">
        <a href="#" aria-label="Previous">
        	<span aria-hidden="true">&laquo;</span>
        </a>
    </li>

    <% for (var i = 1; i <= totolPage; i++) {
			if (i == pageNum) { %>
    <li class="active" page="<%= i %>"><a href="#"><%= i %></a></li>
    <% } else { %>
        <li page="<%= i %>"><a href="#"><%= i %></a></li>
    <% }} %>
    
    <li page="<%= totolPage %>">
        <a href="#" aria-label="Next">
        	<span aria-hidden="true">&raquo;</span>
        </a>
    </li>
`

$.extend(ListPagination.prototype, {

	init: function() {
		this.bindEvents();
	},

	render: function(data) {
		var element = $(new EJS({text: ListPagination.Temp}).render(data));
		this.container.html(element);
		this.currentPage = data.pageNum;
	},

	bindEvents: function() {
		this.container.on("click", $.proxy(this.handlePaginationClick, this));
	},

	handlePaginationClick: function(e) {
		var target = $(e.target),
			parent = target.closest("li"),
			page = parent.attr("page");
		
		if (this.currentPage != page) {
			$(this).trigger(new $.Event("change", {
				page: page
			}))
		}
	}
})
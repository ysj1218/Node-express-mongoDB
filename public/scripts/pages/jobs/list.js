var JobList = function(container) {
	this.container = container;
	this.pageSize = 2;
	this.init();
}

JobList.listTemp = `
	<% if (datalist.length > 0) {
        for (var i = 0; i < datalist.length; i++) {
    %>
    <tr id="<%= datalist[i]._id %>">
        <td><%= (i+1) %></td>
        <td><img src="/uploads/<%= datalist[i].logo %>" width="50" height="25"/></td>
        <td><%= datalist[i].jobName %></td>
        <td><%= datalist[i].companyName %></td>
        <td><%= datalist[i].experience %></td>
        <td><%= datalist[i].jobType %></td>
        <td><%= datalist[i].address %></td>
        <td><%= datalist[i].salary %></td>
        <td><a href="#" id="modify-item">修改</a>  <a href="#" id="delete-item">删除</a></td>
      </tr>
    <%
    	}
       }else {
    %>
      <tr>
        <td colspan="8">暂无数据</td>
      </tr>
    <% } %>
`

$.extend(JobList.prototype, {

	init: function() {
		this.getListInfo(1);
		this.bindEvents();
	},

	getListInfo: function(pageNum) {
		$.ajax({
      		url: '/api/job/getList',
		    data: {
		        pageNum: pageNum,
		        pageSize: this.pageSize
		    },
		    success: $.proxy(this.handleGetListSucc, this)
    	})
	},

	handleGetListSucc: function(res) {
		var element = $(new EJS({text: JobList.listTemp}).render({
			datalist: res.data.list
		}));
		this.container.html(element);
		$(this).trigger(new $.Event("data",{
			res: res.data
		}))
	},

	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleListClick,this));
	},

	handleListClick: function(e) {
		var target = $(e.target)
			type = target.attr("id");
		if (type === "delete-item") {
			var id = target.closest("tr").attr("id");
			this.deleteItem(id);
		}
		if (type === "modify-item") {
			var id = target.closest("tr").attr("id");
			$(this).trigger(new $.Event("update", {id: id}))
		}
	},

	deleteItem: function(id) {
		$.ajax({
      		url: '/api/job/deleteItem',
		    data: {
		        id: id
		    },
		    success: $.proxy(this.handleDeleteItemSucc, this)
    	})
	},

	handleDeleteItemSucc: function(res) {
		if (res.data.delete) {
			window.location.reload();
		}
	}
	
})
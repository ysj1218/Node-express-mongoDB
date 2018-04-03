var SighUp = function(container) {
	this.container = container ? this.container : $("body");
	this.init();
}

SighUp.template = `
	<div class="modal fade" id="signup-modal">
			<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button class="close" data-dismiss="modal">&times;</button>
					<h4>用户注册</h4>
				</div>
					<div class="modal-body">
			        <form id="signupform" method="post" action="/api/users/signup">
			        	<div class="form-group">
			            	<label for="username">用户名</label>
			              	<input type="text" class="form-control" id="username" name="username" placeholder="输入用户名">
			          	</div>
			          	<div class="form-group">
			            	<label for="password">密码</label>
			              	<input type="password" class="form-control" id="password" name="password" placeholder="输入密码">
			         	</div>
			          	<div class="form-group">
			            	<label for="confirmpwd">确认密码</label>
			            	<input type="password" class="form-control" id="confirmpwd" name="confirmpwd" placeholder="再次输入密码">
			          	</div>
			          	<div class="form-group">
			            	<label for="email">邮箱</label>
			            	<input type="email" class="form-control" id="email" name="email" placeholder="输入e-mail地址">
			          	</div>
			        </form>
					</div>
				<div class="modal-footer">
					<button id="signupsubmit" class="btn btn-primary">注册</button>
				</div>
			</div>
		</div>
	</div>`;

$.extend(SighUp.prototype, {

	init: function() {
		this.createDom();
        this.bindEvents();
	},

	createDom: function() {
		this.element = $(new EJS({text: SighUp.template}).render({}));
		this.container.append(this.element);

		this.usernameInput = this.element.find("#username");
		this.usernameParent = this.usernameInput.parent();
		this.passwordInput = this.element.find("#password");
		this.passwordParent = this.passwordInput.parent();
		this.confirmInput = this.element.find("#confirmpwd");
		this.confirmParent = this.confirmInput.parent();
		this.emailInput = this.element.find("#email");
		this.emailParent = this.emailInput.parent();
	},

    bindEvents: function() {
   		var submitBtn = this.element.find("#signupsubmit");
    	submitBtn.on('click', $.proxy(this.handleSubmit, this));
    },

    handleSubmit: function() {
    	var username = this.usernameInput.val(),
    		password = this.passwordInput.val(),
    		confirm = this.confirmInput.val(),
    		email = this.emailInput.val(),
    		formGroups = this.element.find(".form-group");

    	formGroups.removeClass("has-error");

    	if(!username) {
    		this.usernameParent.addClass("has-error");
    		return;
    	}

    	if(!password) {
    		this.passwordParent.addClass("has-error");
    		return;
    	}

    	if(!confirm || confirm !== password) {
    		this.confirmParent.addClass("has-error");
    		return;
    	}

    	if (!email) {
    		this.emailParent.addClass("has-error");
    		return;
    	}

    	this.sendSignUpRequest(username, password, email);
    	
    },

    sendSignUpRequest: function(username, password, email) {
    	$.ajax({
      		url: '/api/user/signUp',
		    type: 'post',
		    contentType: 'application/json; charset=utf-8',
		    data: JSON.stringify({
		        username: username,
		        password: password,
		        email: email
		    }),
		    success: $.proxy(this.handleSignUpSucc, this)
    	})
    },

    handleSignUpSucc: function(response) {
    	if (response.data.success) {
    		alert("注册成功");
    		this.element.modal('hide');
    	}else {
    		alert("注册失败，您注册的用户名已存在")
    	}
    }

}); 
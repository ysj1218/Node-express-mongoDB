var SignIn = function(container) {
	this.container = container ? this.container : $("body");
	this.init();
}

SignIn.template = `
	<div class="modal fade" id="signin-modal">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button class="close" data-dismiss="modal">&times;</button>
					<h4>用户登录</h4>
				</div>
      			<div class="modal-body">
        			<form action="/api/users/signin" method="post" id="signinform">
        				<div class="form-group">
            				<label for="username">用户名</label>
            				<input type="text" class="form-control" id="username" name="username" placeholder="输入用户名">
        				</div>
        				<div class="form-group">
        					<label for="password">密码</label>
            				<input type="password" class="form-control" id="password" name="password" placeholder="输入密码">
        				</div>
        			</form>
      			</div>
   				<div class="modal-footer">
        			<button id="signinsubmit" class="btn btn-primary">登录</button>
    			</div>
    		</div>
  		</div>
	</div>`;

$.extend(SignIn.prototype, {

	init: function() {
		this.createDom();
        this.bindEvents();
	},

	createDom: function() {
		this.element = $(new EJS({text: SignIn.template}).render({}));
		this.container.append(this.element);

		this.usernameInput = this.element.find("#username");
		this.usernameParent = this.usernameInput.parent();
		this.passwordInput = this.element.find("#password");
		this.passwordParent = this.passwordInput.parent();
	},

    bindEvents: function() {
   		var submitBtn = this.element.find("#signinsubmit");
    	submitBtn.on('click', $.proxy(this.handleSubmit, this));
    },

    handleSubmit: function() {
    	var username = this.usernameInput.val(),
    		password = this.passwordInput.val(),
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

    	this.sendSignupRequest(username, password);
    	
    },

    sendSignupRequest: function(username, password) {
    	$.ajax({
      		url: '/api/user/signIn',
		    type: 'post',
		    contentType: 'application/json; charset=utf-8',
		    data: JSON.stringify({
		        username: username,
		        password: password
		    }),
		    success: $.proxy(this.handleSignupSucc, this)
    	})
    },

    handleSignupSucc: function(response) {
    	if (response.data.login) {
    		this.element.modal('hide');
            $(this).trigger(new $.Event("login", {
                username: response.data.username
            }))
    	}else {
    		alert("登陆失败，您注册的用户名已存在")
    	}
    }

}); 
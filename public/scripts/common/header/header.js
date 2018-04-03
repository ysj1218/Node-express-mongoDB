var Header = function(activeIndex, container) {
    this.activeIndex = activeIndex ? activeIndex: 0;
	this.container = container ? this.container : $("body");
	this.init();
}

Header.template = `<nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target="#response-navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand">拉勾网管理系统</a>
            </div>
            <div class="collapse navbar-collapse" id="response-navbar">
                <ul class="nav navbar-nav" id="nav-list">
                    <li <% if(index == 0){ %>class="active"<% } %>><a href="/">首页</a></li>
                    <li <% if(index == 1){ %>class="active"<% } %>><a href="/position">职位管理</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right <%= login ? 'hide' : '' %>" id="js-unlogin">
                    <li><a href="#" data-toggle="modal" data-target="#signin-modal">登录</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#signup-modal">注册</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right <%= login ? '' : 'hide' %>"" id="js-login">
                    <li><a href="#">你好，<span id="js-username"><%= userName %><span></a></li>
                    <li id="js-logout"><a href="#">注销</a></li>
                </ul>
            </div>
        </div>
    </nav>`;

$.extend(Header.prototype, {

	init: function() {
        this.getLoginState();    
	},

    getLoginState: function() {
        $.ajax({
            url: '/api/user/isLogin',
            success: $.proxy(this.handleGetLoginSucc, this)
        })
    },

    handleGetLoginSucc: function(res) {
        this.login = res.data.login;
        this.userName = res.data.userName;

        this.createDom();
        this.bindEvents();
    },

	createDom: function() {

		this.element = $(new EJS({text: Header.template}).render({
            index: this.activeIndex,
            login: this.login,
            userName: this.userName
        }));

        this.loginArea = this.element.find("#js-login");
        this.unloginArea = this.element.find("#js-unlogin");
        this.userNameElem = this.element.find("#js-username");
        this.logoutBtn = this.element.find("#js-logout");

		this.container.prepend(this.element);

        this.signUu = new SighUp();
        this.signIn = new SignIn();
	},

    bindEvents: function() {
        $(this.signIn).on("login", $.proxy(this.handleLogin.bind(this)));
        this.logoutBtn.on("click", $.proxy(this.handleLogout.bind(this)))
    },

    handleLogin: function(e) {
        console.log(this.loginArea);
        this.userNameElem.text(e.username);
        this.loginArea.removeClass("hide");
        this.unloginArea.addClass("hide");
    },

    handleLogout: function() {
        $.ajax({
            url: '/api/user/logout',
            success: $.proxy(this.handleLogoutSucc, this)
        })
    },

    handleLogoutSucc: function() {
        window.location.href = "/";
    }

}); 
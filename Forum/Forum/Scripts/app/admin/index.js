$(function () {
    $("#txtUsername").focus();

    $("#btnReset").click(function () {
        $("#txtUsername").val("");
        $("#txtPassword").val("");
        $("#txtUsername").focus();
    });

    $("#btnLogin").click(function () {
        Dialog.showWaitDialog("用户登陆中，请稍候。。。", "用户登陆");
        $.post("/DataAdmin/Login", {
            "Username": $("#txtUsername").val(),
            "Password": $("#txtPassword").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                location = "/Admin/Main";
                return;
            }
            Dialog.showAlertDialog(data.ServerMessage, "用户登陆", function () {
                if (data.ServerCode == 501) {
                    $("#txtUsername").focus();
                } else {
                    $("#txtPassword").focus();
                }
            });
        }, "json");
    });

});
$(function () {
    //获取sid的信息
    var queryString = location.href.substring(
        location.href.indexOf("?") + 1);
    var sid = queryString.substring(4);

    function query() {
        Dialog.showWaitDialog("查询中...", "论坛");
        $.post("/DataSubject/QueryBySid", { "Sid": sid }
            , function (data) {
                Dialog.hideWaitDialog();
                if (!data.Success) {
                    Dialog.showAlertDialog(data.ServerMessage, "论坛");
                    return;
                }
                $("#divSubject").html(data.Subject.sname
                    + "-" + data.Subject.sinfo);

            }, "json");
    }

    query();
});
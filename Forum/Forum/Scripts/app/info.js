$(function () {
    //获取iid的信息
    var queryString = location.href.substring(
        location.href.indexOf("?") + 1);
    var iid = queryString.substring(4);

    function query() {
        Dialog.showWaitDialog("查询中。。。", "论坛");
        $.post("/DataInfo/QueryInfo", { "Iid": iid }
            , function (data) {
                Dialog.hideWaitDialog();
                if (!data.Success) {
                    Dialog.showAlertDialog(data.ServerMessage, "论坛");
                    return;
                }
                $("#divTypeInfo").html(data.InfoData.title +
                    "(" + data.InfoData.tname + "-"
                    + data.InfoData.sname + ")");

                $("#divInfo").html(data.InfoData.info.replace(/[\r\n]/g, "<br/>"));
                $("#divCreateDate").html(data.InfoData.nickname + "-"
                    + data.InfoData.createdate);
            }, "json");
    }

    query();

});
$(function () {
    //获取iid的信息
    var queryString = location.href.substring(
        location.href.indexOf("?") + 1);
    var iid = queryString.substring(4);

    $("#btnAddReturns").click(function () {
        if (!window.UserIsLogin) {
            Dialog.showAlertDialog("请先登陆", "论坛");
            return;
        }
        Dialog.showWaitDialog("回帖中。。。", "论坛");
        $.post("/DataInfo/AddReturns", {
            "Iid": iid,
            "Content": $("#txtContent").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                query();
                return;
            }
            Dialog.showAlertDialog(data.ServerMessage, "论坛");
        }, "json");
    });
    var pageSize = 3;
    var step = 5;

    $("#btnMore").click(function () {
        pageSize = pageSize + step;
        query();
    });

    function query() {
        Dialog.showWaitDialog("查询中。。。", "论坛");
        $.post("/DataInfo/QueryInfo", {
            "Iid": iid,
            "PageInfo.PageSize": pageSize
        }, function (data) {
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
            //回帖信息
            $("#divReturns").html("");
            $.each(data.ReturnList, function (i, v) {
                var div = $(document.createElement("div"));
                div.append("<br/>" + v.nickname + ":" + v.content + "<br/>");
                div.append(v.createdate + "<br/>");
                $("#divReturns").append(div);
            });
        }, "json");
    }

    query();

});
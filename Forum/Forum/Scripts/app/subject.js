$(function () {
    var PageInfo = { "PageSize": 2, "PageNumber": 1 };

    function toPage(page) {
        PageInfo.PageNumber = page;
        query();
    }

    $("#btnPre").click(function () {
        var page = PageInfo.PageNumber - 1;
        if (page > 0) {
            toPage(page);
        }
    });

    $("#btnNext").click(function () {
        var page = PageInfo.PageNumber + 1;
        if (page <= PageInfo.PageCount) {
            toPage(page);
        }
    });

    $("#btnFirst").click(function () {
        toPage(1);
    });

    $("#btnLast").click(function () {
        toPage(PageInfo.PageCount);
    });

    //获取sid的信息
    var queryString = location.href.substring(
        location.href.indexOf("?") + 1);
    var sid = queryString.substring(4);

    function queryData(v) {
        var tr = $(document.createElement("tr"));
        var td;
        td = $(document.createElement("td"));
        td.append(v.title);
        tr.append(td);
        td = $(document.createElement("td"));
        var ahref = $(document.createElement("a"));
        ahref.attr("href", "/Info?iid=" + v.iid);
        ahref.append(v.info);
        td.append(ahref);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.nickname);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.createdate);
        tr.append(td);

        $("#tbInfos").append(tr);
    }

    function query() {
        Dialog.showWaitDialog("查询中...", "论坛");
        $.post("/DataSubject/QueryBySid", {
            "Sid": sid,
            "PageInfo.PageSize": PageInfo.PageSize,
            "PageInfo.PageNumber": PageInfo.PageNumber
        }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛");
                return;
            }
            $("#divSubject").html(data.Subject.sname
                + "-" + data.Subject.sinfo);
            //发帖信息
            PageInfo = data.PageInfo;
            $("#spPageInfo").html("记录总数" + PageInfo.Count + "-总页数/当前页" + PageInfo.PageCount + "/" + PageInfo.PageNumber);
            $("#tbInfos").html("");
            $.each(data.InfoList, function (i, v) {
                queryData(v);
            });

        }, "json");
    }

    $("#btnToAddInfo").click(function () {
        if (!window.UserIsLogin) {
            Dialog.showAlertDialog("请先登陆", "论坛");
            return;
        }
        Dialog.showCustomDialog($("#dialogAddInfo"), "论坛");
    });

    $("#btnAddInfo").click(function () {
        Dialog.showWaitDialog("发布中。。。", "论坛");
        $.post("/DataInfo/Add", {
            "Sid": sid,
            "Title": $("#txtTitle").val(),
            "Info": $("#txtInfo").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.ServerCode == 1000) {
                Dialog.showAlertDialog("请先登陆", "论坛", function () {
                    location.reload();
                });
                return;
            }
            if (data.Success) {
                Dialog.hideCustomDialog();
                Dialog.showAlertDialog("发布成功", "论坛", function () {
                    query();
                });
                return;
            }
            Dialog.showAlertDialog(data.ServerMessage, "论坛");
        }, "json");

    });

    $("#btnCancel").click(function () {
        Dialog.hideCustomDialog();
    });

    query();
});
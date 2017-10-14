$(function () {
    var PageInfo = { "PageSize": 3, "PageNumber": 1 };

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


    function showModify(v) {
        $("#txtSid").val(v.sid);
        $("#txtTid").val(v.tid);
        $("#txtSname").val(v.sname);
        $("#txtSinfo").val(v.sinfo);
        $("#txtIsEnable").val(v.isenable);
        Dialog.showCustomDialog($("#divModify"), "主题管理-修改信息");
    }

    $("#btnAdd").click(function () {
        $("#txtIsEnable").val("y");
        Dialog.showCustomDialog($("#divModify"), "主题管理-添加");
    });

    function resetForm() {
        $("#txtSid").val("");
        $("#txtSname").val("");
        $("#txtSinfo").val("");
    }

    function queryData(v) {
        var tr = $(document.createElement("tr"));
        var td;
        td = $(document.createElement("td"));
        td.append(v.tname);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.sname);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.sinfo);
        tr.append(td);
        td = $(document.createElement("td"));
        var isenable = v.isenable == "y" ? "启用中" : "停用中";
        td.append(isenable);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.createdate);
        tr.append(td);

        td = $(document.createElement("td"));
        var span = $(document.createElement("span"));
        span.append("修改");
        span.attr("class", "btn btn-primary");
        span.click(function () {
            showModify(v);
        });
        td.append(span);
        tr.append(td);

        $("#tbSubjects").append(tr);
    }

    function query() {
        Dialog.showWaitDialog("查询数据中。。。", "主题管理");
        $.post("/DataSubject/Index", {
            "PageInfo.PageSize": PageInfo.PageSize,
            "PageInfo.PageNumber": PageInfo.PageNumber
        }, function (data) {
            Dialog.hideWaitDialog();
            $("#tbSubjects").html("");
            if (data.Success) {

                if (!data.TypeList || data.TypeList.length <= 0) {
                    Dialog.showAlertDialog("还没有创建分类", "主题管理", function () {
                        location.href = "/Admin/TypeInfo";
                    });
                    return;
                }
                $("#txtTid").html("");
                $.each(data.TypeList, function (i, v) {
                    var opt = $(document.createElement("option"));
                    opt.val(v.tid);
                    opt.attr("title", v.tinfo);
                    opt.append(v.tname);
                    $("#txtTid").append(opt);
                });
                $("#txtTid").val(data.TypeList[0].tid);

                PageInfo = data.PageInfo;
                $("#spPageInfo").html("记录总数" + PageInfo.Count + "-总页数/当前页" + PageInfo.PageCount + "/" + PageInfo.PageNumber);
                $.each(data.SubjectList, function (i, v) {
                    queryData(v);
                });
            } else {
                Dialog.showAlertDialog(data.ServerMessage, "主题管理");
            }
        }, "json");

    }

    $("#btnReset").click(resetForm);

    $("#btnCancel").click(function () {
        resetForm();
        Dialog.hideCustomDialog();
    });

    $("#btnSave").click(function () {
        var saveurl = "/DataSubject/Add";
        var savedata = {
            "Tid": $("#txtTid").val(),
            "Sname": $("#txtSname").val(),
            "Sinfo": $("#txtSinfo").val(),
            "IsEnable": $("#txtIsEnable").val()
        };
        if ($("#txtSid").val() != "") { //修改
            saveurl = "/DataSubject/Modify";
            savedata.Sid = $("#txtSid").val();
        }
        Dialog.showWaitDialog("正在保存数据...", "主题管理");
        $.post(saveurl, savedata, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                Dialog.showAlertDialog("保存成功", "主题管理", function () {
                    resetForm();
                    Dialog.hideCustomDialog();
                    query();
                });
            } else {
                Dialog.showAlertDialog(data.ServerMessage, "主题管理");
            }
        }, "json");

    });

    query();

});
$(function () {

    function showModify(v) {
        $("#txtMTid").val(v.tid);
        $("#txtMTname").val(v.tname);
        $("#txtMTinfo").val(v.tinfo);
        $("#txtMIsEnable").val(v.isenable);
        Dialog.showCustomDialog($("#divModify"), "分类管理-修改信息");
    }

    function resetForm() {
        $("#txtTname").val("");
        $("#txtTinfo").val("");
        $("#txtTname").focus();
    }

    function queryData(v) {
        var tr = $(document.createElement("tr"));
        var td;
        td = $(document.createElement("td"));
        td.append(v.tname);
        tr.append(td);
        td = $(document.createElement("td"));
        td.append(v.tinfo);
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

        $("#tbTypes").append(tr);
    }

    function query() {
        Dialog.showWaitDialog("查询数据中。。。", "分类管理");
        $.post("/DataType/Index", {}, function (data) {
            Dialog.hideWaitDialog();
            $("#tbTypes").html("");
            if (data.Success) {
                $.each(data.TypeList, function (i, v) {
                    queryData(v);
                });
            } else {
                Dialog.showAlertDialog(data.ServerMessage, "分类管理");
            }
        }, "json");

    }

    $("#btnReset").click(resetForm);

    $("#btnAdd").click(function () {
        Dialog.showWaitDialog("添加数据中。。。", "分类管理");
        $.post("/DataType/Add", {
            "Tname": $("#txtTname").val(),
            "Tinfo": $("#txtTinfo").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                Dialog.showAlertDialog("添加成功", "分类管理", function () {
                    query();
                });
            } else {
                Dialog.showAlertDialog(data.ServerMessage, "分类管理");
            }
        }, "json");
    });

    $("#btnCancel").click(function () {
        Dialog.hideCustomDialog();
    });

    $("#btnSave").click(function () {
        Dialog.showWaitDialog("正在保存数据...", "分类管理");
        $.post("/DataType/Modify", {
            "Tid": $("#txtMTid").val(),
            "Tname": $("#txtMTname").val(),
            "Tinfo": $("#txtMTinfo").val(),
            "IsEnable": $("#txtMIsEnable").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                Dialog.showAlertDialog("修改成功", "分类管理", function () {
                    Dialog.hideCustomDialog();
                    query();
                });
            } else {
                Dialog.showAlertDialog(data.ServerMessage, "分类管理");
            }
        }, "json");

    });

    query();

});
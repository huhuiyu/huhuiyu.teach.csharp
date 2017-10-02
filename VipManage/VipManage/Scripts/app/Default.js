/* Default.js */
$(function () {
    $("#btnDelAll").click(function () {
        var chkDel = $("input[name='chkDel']");
        var ids = [];
        $.each(chkDel, function (i, v) {
            if ($(v).prop("checked")) {
                ids.push($(v).val());
            }
        });
        if (ids.length <= 0) {
            return;
        }
        showWaitDialog("删除中。。。");
        $.post("/VipCard/DeleteAll", {
            "Username": ids.join(",")
        }, function (data) {
            hideWaitDialog();
            if (data.Success) {
                query();
            } else {
                showAlertDialog(data.ServerMessage);
            }
        }, "json");

    });

    $("#chkAll").click(function () {
        var chkDel = $("input[name='chkDel']");
        $.each(chkDel, function (i, v) {
            console.log(v);
            $(v).prop("checked"
                , $("#chkAll").prop("checked"));
        });
    });

    function delete1(vip) {
        showWaitDialog("删除会员", "删除");
        $.post("/VipCard/Delete1", {
            "Vcid": vip.vcid
        }, function (data) {
            hideWaitDialog();
            if (data.Success) {
                query();
            } else {
                showAlertDialog(data.ServerMessage);
            }
        }, "json");
    }



    /*修改对话框*/
    function showModifyDialog(vipcard) {
        $("#MVcid").val(vipcard.vcid);
        $("#MUsername").val(vipcard.username);
        $("#MPhone").val(vipcard.phone);
        $("#MCardno").val(vipcard.cardno);
        $("#MBalance").val(vipcard.balance);

        $("#modifyDialog").modal("show");
    }

    $("#btnMCancel").click(function () {
        $("#modifyDialog").modal("hide");
    });

    $("#btnModify").click(function () {
        showWaitDialog("保存会员卡更改中...", "修改");
        $.post("/VipCard/Modify", {
            "Vcid": $("#MVcid").val(),
            "Username": $("#MUsername").val(),
            "Phone": $("#MPhone").val(),
            "Cardno": $("#MCardno").val(),
            "Balance": $("#MBalance").val()
        }, function (data) {
            hideWaitDialog();
            if (data.Success) {
                showAlertDialog("修改成功", "修改"
                    , function () {
                        $("#modifyDialog").modal("hide");
                        query();
                    });
            } else {
                showAlertDialog(data.ServerMessage);
            }
        }, "json");

    });

    /*测试确认对话框

    showConfirmDialog("测试确认对话框", "测试"
        , function () {
            alert("点击确定");
        }, function () {
            alert("点击取消");
        });
*/
    /*测试确定对话框*/
    //showAlertDialog("测试确定", "哈哈哈", function () {
    //    alert("嘻嘻嘻");
    //});
    /*测试等待对话框*/
    //showWaitDialog("测试等待对话框！");
    //setTimeout(function () {
    //    hideWaitDialog();
    //}, 2000);

    $("#txtUsername").focus();
    //删除的部分===========================
    function deleteVip(vcid) {
        showWaitDialog("正在删除会员，请稍候。。。");
        $.post("/VipCard/Delete", { "Vcid": vcid },
            function (data) {
                hideWaitDialog();
                if (data.Success) {
                    showAlertDialog(
                        "删除成功", "删除会员",
                        function () {
                            alert(1);
                            query();
                        });

                } else {
                    alert(data.ServerMessage);
                }
            }, "json");
    }

    ///=============

    //重置表单
    function resetAdd() {
        $("#txtUsername").val("");
        $("#txtPhone").val("");
        $("#txtCardno").val("");
        $("#txtBalance").val("");
        $("#txtUsername").focus();
    }

    $("#btnReset").click(resetAdd);

    $("#btnAdd").click(function () {
        showWaitDialog("正在添加会员信息，请稍候。。。");
        $.post("/VipCard/Add", {
            "Username": $("#txtUsername").val(),
            "Phone": $("#txtPhone").val(),
            "Cardno": $("#txtCardno").val(),
            "Balance": $("#txtBalance").val()
        }, function (data) {
            hideWaitDialog();
            alert(data.ServerMessage);
            if (data.Success) {
                resetAdd();
                query(); //添加成功要重新查询
            }
        }, "json");
    });

    var pageNumber = 1;

    $("#btnPre").click(function () {
        toPage(pageNumber - 1);
    });

    $("#btnNext").click(function () {
        toPage(pageNumber + 1);
    });

    function toPage(pn) {
        pageNumber = pn;
        query();
    }

    //查询数据
    function query() {
        //处理查询参数
        var param = {
            "PageInfo.PageSize": $("#pageSize").val(),
            "PageInfo.PageNumber": pageNumber,
            "Username": $("#txtQUsername").val()
            , "Phone": $("#txtQPhone").val()
        };
        showWaitDialog("查询数据，请等待...");
        $.post("/VipCard/PageQuery", param, function (data) {
            hideWaitDialog();
            //以服务器的结果为准
            pageNumber = data.PageInfo.PageNumber;

            var pageinfo =
                "记录数" + data.PageInfo.Count;
            pageinfo += ",总页数" + data.PageInfo.PageCount;
            pageinfo += ",当前页：" + data.PageInfo.PageNumber;
            $("#spPageInfo").html(pageinfo);

            $("#tbDataBody").html("");
            if (data.Success) {
                $.each(data.VipCardList,
                    function (i, v) {
                        var tr = $(document.createElement("tr"));
                        var td = $(document.createElement("td"));
                        var checkbox =
                            $(document.createElement("input"));
                        checkbox.attr("type", "checkbox");
                        checkbox.attr("name", "chkDel");
                        checkbox.val(v.vcid);
                        td.append(checkbox);
                        tr.append(td);

                        td = $(document.createElement("td"));
                        td.append(v.username);
                        tr.append(td);
                        td = $(document.createElement("td"));
                        td.append(v.phone);
                        tr.append(td);
                        td = $(document.createElement("td"));
                        td.append(v.cardno);
                        tr.append(td);
                        td = $(document.createElement("td"));
                        td.append(v.balance);
                        tr.append(td);
                        td = $(document.createElement("td"));
                        td.append(v.createdate);
                        tr.append(td);
                        //操作部分
                        td = $(document.createElement("td"));
                        var spdel =
                            $(document.createElement("span"));
                        spdel.attr("class", "btn btn-primary");
                        spdel.append("删除");
                        spdel.click(function () {
                            showConfirmDialog("是否删除" + v.username + "?"
                                , "删除会员"
                                , function () {
                                    deleteVip(v.vcid);
                                });
                        });
                        td.append(spdel);
                        //修改按钮
                        var spmodi = $(document.createElement("span"));
                        spmodi.append("修改");
                        spmodi.attr("class", "btn btn-danger");
                        spmodi.click(function () {
                            showModifyDialog(v);
                        });
                        td.append(spmodi);
                        tr.append(td);

                        //冻结按钮
                        var spf = $(document.createElement("span"));
                        spf.append("冻结");
                        spf.attr("class", "btn btn-primary");
                        spf.click(function () {
                            delete1(v);
                        });
                        td.append(spf);


                        $("#tbDataBody").append(tr);




                    });

            } else {
                alert(data.ServerMessage);
            }
            //data && data.VipCardList && dataVipCardList.le...
            if (data.VipCardList.length == 0) {
                $("#divNodata").show();
                $("#tbData").hide();
            }
            else {
                $("#divNodata").hide();
                $("#tbData").show();
            }

        }, "json");
    }

    query();

    $("#btnQuery").click(function () {
        query();
    });

    $("#btnQueryReset").click(function () {
        $("#txtQUsername").val("");
        $("#txtQPhone").val("");
        query();
    });

    //前后台开发分离模式（主流）
    //16 vue angular react
    //后台统一返回json或者xml作为处理的应答结果
    //不在考虑页面是什么技术
    //前端通过调用后台的数据决定流程和呈现格式
    //数据包含控制信息(Success,ServerMessage)和数据
    //(VipCardList...)
    //jquery通过$.post()连接前后台

});
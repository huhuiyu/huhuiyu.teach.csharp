$(function () {

    function query() {
        $.post("/DataDefault/Index", {}, function (data) {
            $("#divTypes").html("");
            if (data.Success) {
                $.each(data.TypeList, function (i, v) {
                    var div1 = $(document.createElement("div"));
                    div1.attr("class", "col-xs-6 col-sm-4 col-md-3 col-lg-2 pd-5");
                    var div2 = $(document.createElement("div"));
                    div2.attr("class", "panel panel-primary ani-shake-div");
                    div1.append(div2);
                    var div3 = $(document.createElement("div"));
                    div3.attr("class", "panel-heading");
                    div3.append(v.tname);
                    div2.append(div3);
                    var div4 = $(document.createElement("div"));
                    div4.attr("class", "panel-body");
                    var ahref = $(document.createElement("a"));
                    ahref.attr("href", "javascript:void(0);");
                    ahref.append(v.tinfo);
                    ahref.click(function () {
                        changeType(v);
                    });
                    div4.append(ahref);
                    div4.append(document.createElement("hr"));
                    var div5 = $(document.createElement("div"));
                    div5.attr("class", "text-right text-info");
                    div5.append(v.createdate);
                    div4.append(div5);
                    div2.append(div4);

                    $("#divTypes").append(div1);
                });
            }
            else {
                Dialog.showAlertDialog(data.ServerMessage, "简易论坛");
            }
        }, "json");

    }

    function changeType(type) {
        $("#divTitle").html(type.tname);
        $("#divTypes").fadeOut(500);
        $("#divSubject").fadeIn(500, function () {
            querySubject(type);
        });
    }

    function querySubject(type) {
        Dialog.showWaitDialog("查询中。。。", "论坛");
        $.post("/DataSubject/QueryByType", { "Tid": type.tid },
            function (data) {
                Dialog.hideWaitDialog();
                if (!data.Success) {
                    Dialog.showAlertDialog(data.ServerMessage, "论坛");
                    return;
                }
                $("#divSubjects").html("");
                $.each(data.SubjectList, function (i, v) {
                    var div1 = $(document.createElement("div"));
                    div1.attr("class", "col-xs-6 col-sm-4 col-md-3 col-lg-2 pd-5");
                    var div2 = $(document.createElement("div"));
                    div2.attr("class", "panel panel-danger ani-shake-div");
                    div1.append(div2);
                    var div3 = $(document.createElement("div"));
                    div3.attr("class", "panel-heading");
                    div3.append(v.sname);
                    div2.append(div3);
                    var div4 = $(document.createElement("div"));
                    div4.attr("class", "panel-body");
                    var ahref = $(document.createElement("a"));
                    ahref.attr("href", "javascript:void(0);");
                    ahref.append(v.sinfo);
                    ahref.click(function () {
                        location = "/Subject?sid=" + v.sid;
                    });
                    div4.append(ahref);
                    div4.append(document.createElement("hr"));
                    var div5 = $(document.createElement("div"));
                    div5.attr("class", "text-right text-info");
                    div5.append(v.createdate);
                    div4.append(div5);
                    div2.append(div4);

                    $("#divSubjects").append(div1);
                });
            }, "json");
    }

    $("#btnBack").click(function () {
        $("#divTypes").fadeIn(500);
        $("#divSubject").fadeOut(500);
    });

    query();

});
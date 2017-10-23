/*/Scripts/app/dialog.js*/
$(function () {
    var dialog = {};


    var alertDialogTitle = "会员管理";

    function showWaitDialog(info, title) {
        $("#waitBody").html(info);
        if (title) {
            $("#waitTitle").html(title);
        } else {
            $("#waitTitle").html(alertDialogTitle);
        }
        $("#waitDialog").modal("show");
    }

    function hideWaitDialog() {
        $("#waitDialog").modal("hide");
    }


    //确定的回调函数
    var alertOk;

    function showAlertDialog(info, title, cb) {
        alertOk = cb; //记录回调
        $("#alertBody").html(info);
        //title参数可以省略
        if (title) {
            $("#alertTitle").html(title);
        } else {
            $("#alertTitle").html(alertDialogTitle);
        }
        $("#alertDialog").modal("show");

    }

    //确认对话框yes按钮的回调
    var confirmCby;
    //确认对话框no按钮的回调
    var confirmCbn;

    function showConfirmDialog(info, title, cby, cbn) {
        $("#confirmBody").html(info);
        $("#confirmTitle").html(title);
        //记录回调函数
        confirmCby = cby;
        confirmCbn = cbn;
        $("#confirmDialog").modal("show");
    }

    //自定义页面元素对话框
    var customEl;//要显示的元素
    var customElParent; //要显示的元素的父元素

    function showCustomDialog(el, title) {
        $("#customTitle").html(title);
        customEl = el;
        customElParent = el.parent();
        $("#divCustomBody").append(customEl);
        $("#customDialog").modal("show");
        customEl.show();
    }

    function hideCustomDialog() {
        $("#customDialog").modal("hide");
        customEl.hide();
        customElParent.append(customEl);
    }

    //确认事件
    $("#alertDialog").on("hidden.bs.modal"
        , function () {
            if (alertOk) {
                alertOk();
            }
        });

    //yes按钮事件
    $("#btnConfirmYes").click(function () {
        $("#confirmDialog").modal("hide"); //关闭对话框
        if (confirmCby) { //回调
            confirmCby();
        }
    });
    //no按钮事件
    $("#btnConfirmNo").click(function () {

        $("#confirmDialog").modal("hide"); //关闭对话框
        if (confirmCbn) { //回调
            confirmCbn();
        }
    });

    //委托方法
    dialog.showWaitDialog = showWaitDialog;
    dialog.hideWaitDialog = hideWaitDialog;
    dialog.showAlertDialog = showAlertDialog;
    dialog.showConfirmDialog = showConfirmDialog;
    dialog.showCustomDialog = showCustomDialog;
    dialog.hideCustomDialog = hideCustomDialog;

    //创建全局对话框对象
    window.Dialog = dialog;
});
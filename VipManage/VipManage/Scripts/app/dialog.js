/*/Scripts/app/dialog.js*/
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

$(function () {
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

});







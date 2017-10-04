$(function () {
    $("#btnDialog").click(function () {
        Dialog.showConfirmDialog("显示等待对话框？", "对话框", function () {
            Dialog.showWaitDialog("5秒后消失，请稍候。。。", "处理中");
            setTimeout(function () {
                Dialog.hideWaitDialog();
            }, 5000);
        }, function () {
            Dialog.showAlertDialog("你选择了不显示等待对话框", "信息", function () {
                Dialog.showCustomDialog($("#customEl"), "自定义对话框");
            });
        });
    });

    $("#btnCustomDialog").click(function () {
        Dialog.showCustomDialog($("#customEl"), "自定义对话框");
    });

    $("#btnCloseDialog").click(function () {
        Dialog.hideCustomDialog();
    });
});
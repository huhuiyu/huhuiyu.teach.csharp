/*
    /Scripts/app/test.js
*/
$(function () {
    $("#btnEcho").click(function () {
        $.post("/DataTest",
            { "Echo": $("#txtEcho").val() }
        , function (data) {
            alert(data.ServerMessage + "=>"
                + data.Success);
        }, "json");
    });

    $("#btnAdd").click(function () {
        $.post("/DataTest/Add",
            { "Tinfo": $("#txtTinfo").val() },
            function (data) {
                if (data.Success) {
                    alert("添加成功!");
                } else {
                    alert(data.ServerMessage);
                }
            }, "json");
    });

    $("#btnDatabase").click(function () {
        $.post("/DataTest/DataBase", {},
            function (data) {
                alert(data.ServerMessage);
            }, "json");
    });

});
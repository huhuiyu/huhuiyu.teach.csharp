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
    var iid = queryString.substring(4);
    alert(iid);
});
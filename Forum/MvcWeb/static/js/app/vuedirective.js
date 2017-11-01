(function() {

    var weekNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    function formatDate(timestamp, format) {
        var date = new Date();
        if (timestamp) {
            date.setTime(timestamp);
        }
        if (!format) { // 默认格式
            format = "y-M-d h:m:s";
        }
        var year = date.getFullYear() + "";
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour + "";
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute + "";
        var seconds = date.getSeconds();
        seconds = seconds < 10 ? "0" + seconds : seconds + "";
        var result = format.replace("y", year);
        result = result.replace("M", month);
        result = result.replace("d", day);
        result = result.replace("h", hour);
        result = result.replace("m", minute);
        result = result.replace("s", seconds);
        result = result.replace("w", weekNames[date.getDay()]);
        return result;
    };

    Vue.directive("showdate", function(el, binding) {
        try {
            console.log("directive showdate");
            console.log(el, binding.value);
            if (binding && binding.value) {
                var ts = parseInt(binding.value.date.replace(/\D/g, ""));
                $(el).html(formatDate(ts, binding.value.format));
            }
        } catch (e) {
            console.log(e);
            $(el).html("");
        }
    });
})();
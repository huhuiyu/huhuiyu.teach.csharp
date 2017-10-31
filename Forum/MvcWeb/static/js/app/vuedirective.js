(function() {
    Vue.directive("showdate", function(el, binding) {
        console.log("directive showdate");
        console.log(el, binding.value);
        var ts = parseInt(binding.value.replace(/\D/g, ""));
        var date = new Date(ts);
        $(el).html(date.toLocaleString());
    });
})();
(function(win) {

    Vue.config.errorHandler = function(err, vm, info) {
        console.log("===Vue error info====");
        console.log(err);
        console.log(info);
        console.log("=====================");
        alert("程序无法运行");
    };

    $(function() {
        var app = new Vue({
            el: "#divVue",
            data: {
                loading: true,
                MenuList: [],
                Menu: {}
            },
            methods: {
                addMenu: function() {
                    app.$data.loading = true;
                    $.post("/DataMenu/Add", {
                        "Menu.Title": app.Menu.Title,
                        "Menu.Url": app.Menu.Url,
                        "Menu.Info": app.Menu.Info
                    }, function(data) {
                        app.$data.loading = false;
                        if (data.Success) {
                            alert("添加成功");
                            loadData();
                        } else {
                            alert(data.ServerMessage);
                        }
                    }, "json");
                }
            }
        });

        function loadData() {
            app.$data.loading = true;
            $.post("/DataMenu/Query", {}, function(data) {
                app.$data.loading = false;
                app.$data.MenuList = data.MenuList;
            }, "json");
        }

        loadData();

    });
})(window);
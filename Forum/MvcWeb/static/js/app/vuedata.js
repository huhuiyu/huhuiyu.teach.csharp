(function(win) {
    $(function() {
        var app = new Vue({
            el: "#divVue",
            data: {
                loading: true,
                MenuList: [],
                Menu: {}
            },
            mounted: function() {
                console.log("vue mounted...");
                loadData();
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
            $.post("/DataMenu/Query", {}, function(data) {
                console.log(data);
                app.$data.loading = false;
                app.$data.MenuList = data.MenuList;
            }, "json");
        }

    });
})(window);
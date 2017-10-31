(function(win) {
    $(function() {
        var showother = false;
        var vueapp = new Vue({
            el: "#divVue",
            data: {
                simple: {
                    id: 100,
                    name: "张三"
                },
                eventtext: "确定"
            },
            methods: {
                clickEvent: function(info) {
                    console.log("外部事件处理", info);
                },
                showComp: function() {
                    this.$refs.ce1.callMe({
                        "show": true,
                        "text": "点击我"
                    });
                },
                hideComp: function() {
                    this.$refs.ce1.callMe({
                        "show": false
                    });
                },
                showAlert: function() {
                    var config = showother ? {
                        title: "自定义标题",
                        body: "内容" + new Date().getTime(),
                        ok: "自定义按钮",
                        cb: function() {
                            console.log("回调事件");
                        }
                    } : {
                        body: "内容" + new Date().getTime()
                    };
                    showother = !showother;
                    this.$refs.dialog1.show(config);
                }
            }
        });
        console.log("vuecomp");
    });
})(window);
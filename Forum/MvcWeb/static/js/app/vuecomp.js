(function(win) {
    $(function() {
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
                }
            }
        });
        console.log("vuecomp");
    });
})(window);
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
                },
                showAlertHide: function() {
                    this.$refs.dialog1.show({
                        body: "自动隐藏对话框",
                        cb: function() {
                            console.log("自动隐藏");
                        }
                    });
                    setTimeout(function() {
                        vueapp.$refs.dialog1.hide();
                    }, 2000)
                },
                showConfirm: function() {
                    var config = showother ? {
                        title: "自定义确认对话框",
                        yes: "是",
                        no: "否",
                        body: "内容" + new Date().getTime(),
                        cby: function() {
                            alert("yes");
                        },
                        cbn: function() {
                            alert("no");
                        }
                    } : {
                        body: "内容" + new Date().getTime(),
                        cby: function() {
                            console.log("yes");
                        },
                        cbn: function() {
                            console.log("no");
                        }
                    };

                    showother = !showother;
                    this.$refs.dialog2.show(config);
                },
                showWait: function() {
                    this.$refs.dialog3.show({
                        title: "登录",
                        body: "数据处理中，请等待。。。",
                        cb: function() {
                            vueapp.$refs.dialog1.show({
                                body: "处理完毕"
                            });
                        }
                    });
                    setTimeout(function() {
                        vueapp.$refs.dialog3.hide();
                    }, 2000)
                }
            }
        });
        console.log("vuecomp");
    });
})(window);
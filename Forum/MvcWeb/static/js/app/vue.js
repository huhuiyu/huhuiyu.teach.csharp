(function (win) {
    $(function () {
        var vueapp = new Vue({
            el: "#divVue",
            data: {
                color: "text-danger",
                computenums: {
                    num1: 0,
                    num2: 0
                }, list: [{ id: 100, name: "张三" },
                    { id: 200, name: "李四" },
                    { id: 300, name: "张三丰" },
                    { id: 400, name: "王四" }
                ],
                enstyle: false,
                tab: "index",
                step: 1,
                filterNumbs: "",
                filterDatas: ""
            },
            filters: {
                nums: function (v) {
                    if (!v) {
                        return v;
                    }
                    return v.replace(/\D/g, "");
                },
                chars: function (v) {
                    if (!v) {
                        return v;
                    }
                    return v.replace(/\d/g, "");
                }
            },
            computed: {
                nums: function () {
                    var n1 = this.computenums.num1;
                    var n2 = this.computenums.num2;
                    if (isNaN(n1) || isNaN(n2)) {
                        return "请输入数字";
                    }
                    return "计算的结果是：" + (n1 * n2).toFixed(2);
                }, computelist: function () {
                    var instance = this;
                    var result = []; //= this.list;
                    $.each(instance.list, function (i, v) {
                        if (instance.filterDatas == "" || v.name.indexOf(instance.filterDatas) > -1) {
                            result.push(v);
                        }
                    });
                    return result;
                }
            },
            methods: {
                changeColor: function (color) {
                    vueapp.color = color;
                },
                changeTal: function (tab) {
                    vueapp.tab = tab;
                }
            }
        });
    });
})(window);

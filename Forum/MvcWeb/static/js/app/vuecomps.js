(function() {
    $(function() {

        Vue.component("simple", {
            props: ["simpleData"],
            template: "<span>=={{simpleData.id}}-{{simpleData.name}}==</span>"
        });
        Vue.component("simple2", {
            template: "#my-template"
        });
        Vue.component("compevent", {
            template: "<span v-show='show' class='btn btn-primary' v-on:click='clickMe'>{{text}}</span>",
            data: function() {
                return {
                    show: false,
                    text: ""
                };
            },
            methods: {
                clickMe: function() {
                    console.log("click之前。。。");
                    this.$emit("click-me", "传递参数");
                    console.log("click之后。。。");
                },
                callMe: function(data) {
                    console.log("被其它组件调用。。。", $(this.$el));
                    if (data.show) {
                        $(this.$el).attr("style", "color:red;");
                        this.$data.text = data.text;
                    }
                    this.$data.show = data.show;
                }
            }
        });
        console.log("simple component...");
    });
})();
(function() {
    //确定对话框
    var dialog; //对话框对象
    var dialogcb; //关闭对话框的回掉
    var defaultInfo = {
        title: "vue演示项目",
        body: "",
        ok: "确定"
    };

    Vue.component("alertDialog", {
        data: function() {
            return {
                title: defaultInfo.title,
                body: defaultInfo.body,
                ok: defaultInfo.ok
            };
        },
        methods: {
            show: function(dialoginfo) {
                dialogcb = dialoginfo.cb ? dialoginfo.cb : null;
                this.title = dialoginfo.title ? dialoginfo.title : defaultInfo.title;
                this.body = dialoginfo.body ? dialoginfo.body : defaultInfo.body;
                this.ok = dialoginfo.ok ? dialoginfo.ok : defaultInfo.ok;
                if (!dialog) { //初始化对话框
                    dialog = $(this.$el);
                    dialog.on("hidden.bs.modal", function() {
                        console.log("dialog hidden...");
                        if (dialogcb) {
                            dialogcb();
                        }
                    });
                }
                dialog.modal("show");
            },
            hide: function() {
                if (dialog) {
                    dialog.modal("hide");
                }
            }

        },
        template: '<div class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="z-index: 1990;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{title}}</h4></div><div class="modal-body">{{body}}</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">{{ok}}</button></div></div></div></div>'
    });

})();
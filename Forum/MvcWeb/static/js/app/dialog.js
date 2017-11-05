(function() {
    //确定对话框
    var dialog; //对话框对象
    var dialogcb; //关闭对话框的回调
    var defaultInfo = {
        title: "确定",
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
        template: '<div class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="z-index: 1991;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{title}}</h4></div><div class="modal-body">{{body}}</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">{{ok}}</button></div></div></div></div>'
    });

})();

(function() {
    //确认对话框
    var dialog; //对话框对象
    var dialogcby; //对话框yes按钮回调
    var dialogcbn; //对话框no按钮回调

    var defaultInfo = {
        title: "确认信息",
        body: "",
        yes: "确定",
        no: "取消"
    };

    Vue.component("confirmDialog", {
        data: function() {
            return {
                title: defaultInfo.title,
                body: defaultInfo.body,
                yes: defaultInfo.yes,
                no: defaultInfo.no
            };
        },
        methods: {
            show: function(dialoginfo) {
                dialogcby = dialoginfo.cby ? dialoginfo.cby : null;
                dialogcbn = dialoginfo.cbn ? dialoginfo.cbn : null;
                this.title = dialoginfo.title ? dialoginfo.title : defaultInfo.title;
                this.body = dialoginfo.body ? dialoginfo.body : defaultInfo.body;
                this.yes = dialoginfo.yes ? dialoginfo.yes : defaultInfo.yes;
                this.no = dialoginfo.no ? dialoginfo.no : defaultInfo.no;
                if (!dialog) { //初始化对话框
                    dialog = $(this.$el);
                }
                dialog.modal("show");
            },
            clickYes: function() {
                this.hide();
                if (dialogcby) {
                    dialogcby();
                }
            },
            clickNo: function() {
                this.hide();
                if (dialogcbn) {
                    dialogcbn();
                }
            },
            hide: function() {
                if (dialog) {
                    dialog.modal("hide");
                }
            }

        },
        template: '<div class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="z-index: 1990;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{title}}</h4></div><div class="modal-body">{{body}}</div><div class="modal-footer"><button type="button" class="btn btn-primary" @click="clickYes">{{yes}}</button><button type="button" class="btn btn-primary" @click="clickNo">{{no}}</button></div></div></div></div>'
    });

})();

(function() {
    //等待对话框
    var dialog; //对话框对象
    var dialogcb; //对话框关闭回调


    var defaultInfo = {
        title: "等待",
        body: ""
    };

    Vue.component("waitDialog", {
        data: function() {
            return {
                title: defaultInfo.title,
                body: defaultInfo.body
            };
        },
        methods: {
            show: function(dialoginfo) {
                dialogcb = dialoginfo.cb ? dialoginfo.cb : null;
                this.title = dialoginfo.title ? dialoginfo.title : defaultInfo.title;
                this.body = dialoginfo.body ? dialoginfo.body : defaultInfo.body;
                if (!dialog) { //初始化对话框
                    dialog = $(this.$el);
                    dialog.on("hidden.bs.modal", function() {
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
        template: '<div class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="z-index: 2000;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{title}}</h4></div><div class="modal-body text-center">{{body}}</div></div></div></div>'
    });

})();

(function() {
    //自定义对话框
    var dialog; //对话框对象
    var dialogcb; //对话框关闭回调
    var customParent; //自定义元素的原始位置（父元素）
    var customEl; //自定义元素

    var defaultInfo = {
        title: "自定义",
        body: ""
    };

    Vue.component("customDialog", {
        data: function() {
            return {
                title: defaultInfo.title,
                body: defaultInfo.body
            };
        },
        methods: {
            show: function(dialoginfo) {
                dialogcb = dialoginfo.cb ? dialoginfo.cb : null;
                if (!dialoginfo.el) {
                    return;
                }
                customEl = dialoginfo.el;
                customParent = dialoginfo.el.parent();
                this.title = dialoginfo.title ? dialoginfo.title : defaultInfo.title;
                if (!dialog) { //初始化对话框
                    dialog = $(this.$el);
                    dialog.on("hidden.bs.modal", function() {
                        customParent.append(customEl); //还原位置
                        if (dialogcb) {
                            dialogcb();
                        }
                    });
                }
                dialog.find(".modal-body").append(customEl);
                customEl.show();
                dialog.modal("show");
            },
            hide: function() {
                if (dialog) {
                    customEl.hide();
                    dialog.modal("hide");
                }
            }

        },
        template: '<div class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="z-index: 2000;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{title}}</h4></div><div class="modal-body text-center"></div></div></div></div>'
    });

})();
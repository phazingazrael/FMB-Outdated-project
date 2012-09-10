require(['libs/text!home.html', 'libs/text!footer.html','js/champs.js','libs/text!templates/champbox.html'], function (homeTpl, footerTpl, champDB, champTpl) {
	
    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "*actions": "home"
        },
        initialize: function() {
            this.footerView = new FooterView();
            this.footerView.render();
            //this.Pageview = new pageView();
            //this.Pageview.render();
        },
        home: function() {
            this.homeView = new SelectView();
            this.homeView.render();
        }
    });

    FooterView = Backbone.View.extend({
        el: "#footer",
        template: footerTpl,
        render: function() {
            this.$el.html(_.template(this.template));
        }
    })
    SelectView = Backbone.View.extend({
        el: "#content",
        initialize: function() {
            Name=champDB.name;
            Rp_Point=champDB.Rp_Point;
            Ip_Point=champDB.Ip_Point;
        },
        render: function() {
            _.each(champDB,function(){
                console.log("Beginning");
                _.templateSettings.interpolate = /\{\{(.+?)\}\}/g; //The mustache regexp thing.
                console.log("first Bit");
                var template = _.template(champTpl);
                console.log("second Bit");
                $('#content').append(template);
                console.log("last Bit");
            })
            
        }
    });
    pageView = Backbone.View.extend({
        el: "#pages",
        initialize:function(){},
        render: function(){
            for (var e = 0, len = champDB.length; e<len; e++){
                $('<div class="'+champDB[e].Name+'-page"></div>').appendTo('#pages');
            }
        }
    });
	
	
    app = new ApplicationRouter();
    Backbone.history.start();	
});



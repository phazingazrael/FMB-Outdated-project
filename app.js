require(['libs/text!home.html', 'libs/text!footer.html','js/champs.js','libs/text!templates/champbox.html', 'libs/text!templates/champpage.html'], function (homeTpl, footerTpl, champDB, champTpl, pageTpl) {
	
    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "*actions": "home"
        },
        initialize: function() {
            this.footerView = new FooterView();
            this.footerView.render();
            this.Pageview = new pageView();
            this.Pageview.render();
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
            Rp_Point = champDB.Rp_Point;
            Ip_Point = champDB.Ip_Point;
        },
        render: function() {
            _.each(champDB,function(champ){
                _.templateSettings.interpolate = /\{\{(.+?)\}\}/g; //The mustache regexp thing.
                var template = _.template(champTpl);
                $('#content').append(template(champ));
            })
            
        }
    });
    pageView = Backbone.View.extend({
         el: "#pages",
        initialize: function() {
            Name=champDB.Name;
            Title = champDB.Title;
        },
        render: function() {
            _.each(champDB,function(page){
                _.templateSettings.interpolate = /\{\{(.+?)\}\}/g; //The mustache regexp thing.
                var template = _.template(pageTpl);
                $('#pages').append(template(page));
                
            })
            
        }
    });
	
	
    app = new ApplicationRouter();
    Backbone.history.start();	
});



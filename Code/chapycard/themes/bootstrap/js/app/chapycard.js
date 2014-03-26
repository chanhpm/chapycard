/**
* ChapyCard the core function of application
*
* @param object $framecard	Jquery object for iframe
* @param object $manifest	manifest setting for card
**/
	ChapyCard.Builder = function($framecard, $manifest, $controls){

		if ($framecard.length !== 1){
			$.error("the application requires only one iframe");
		}
			

		var self = this;

		self.contents = $framecard.contents();
		self.tabs = {};
		self.stylesheet = new ChapyCard.Stylesheet();
		self.style = $("<style>");
		self.controls = $controls;
		self.app = {};	

		self.build($manifest);
	};

	ChapyCard.Builder.prototype = {

		constructor: ChapyCard.Builder,
		/**
		* build to init the card
		*
		* @param object $manifest	manifest setting
		* @return void
		**/
		build: function($manifest){
			var self = this;

			self.loadDom($manifest);
			self.loadApp($manifest);

			self.style.appendTo(self.contents.find("head"));

		},
		/**
		* load app setting
		*
		* @param object $manifest 	manifest setting
		* @return void
		**/
		loadApp: function($manifest){
			var self = this;

			$.each($manifest.app, function(sidename, sideinfo){
				self.app[sidename] = sideinfo.selector;
			});
		},
		/**
		* load manifest to dom
		*
		* @param object $manifest 	manifest setting
		* @return void
		**/
		loadDom: function($manifest){
			var self = this;

			$.each($manifest.tab, function(tabname, $tabinfo){
				self.tabs[$tabinfo.name] = new ChapyCard.Tab(tabname, self);
				var tb = self.tabs[$tabinfo.name];
				$.each($tabinfo.controls, function(ctr_name, ctrinfo){
					var control = new ChapyCard.Control(self.tabs[$tabinfo.name], self);					
					$.extend(control, ChapyCard.Controls.get(ctr_name));
					control.selector = ctrinfo.selector;
					control.init();					
					self.tabs[$tabinfo.name].addControl(control);
				});				
				self.tabs[$tabinfo.name].build();				
				if($tabinfo.init){
					self.tabs[$tabinfo.name].active();
				}
				self.controls.append(self.tabs[$tabinfo.name].element);
			});
		},
		/**
		* get current active tab
		*
		* @return tab object|null
		**/
		getActiveTab: function(){
			var self = this, t = null;

			$.each(self.tabs, function(tab_name, tab){
				if(tab.status === true){
					t = tab;
				}					
			});

			return t;
		},
		/**
		* activate a tab
		*
		* @param string name 	name of tab need to activate
		* @return void
		**/
		activeTab: function(name){
			this.tabs[name].active();
		},
		/**
		* deactive a tab
		*
		* @param string name 	name of tab need to deactivate
		* @return void
		**/
		deactiveTab: function(name){
			this.tabs[name].deactive();
		},
		/**
		* sync stylesheet to DOM
		*
		* @return void
		**/
		syncStyle: function(){
			var self = this;
			self.stylesheet.writeTo(self.style);
		},

		/**
		* get current selector
		*
		* return string
		**/
		getSelector: function(){
			var self = this;
			var activeCard = self.contents.find(".active").first();
			return self.app[activeCard.attr('name')];
		}
	};
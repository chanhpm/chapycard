/**
* ChapyCard Tab - Each tab will be container for grouping a number of controls belong to.
*
* @param string name 		name of tab
* @param ChapyCard.Builder card  ChapyCard.Builder object
**/
	ChapyCard.Tab = function(name, card){

		var self = this;
		self.name = name;
		self.card = card;
		self.status = false;
		
		self.element = $("<div/>",{
			id: self.name +"_tab",			
			class: "chapy-tab"
		});
		$('<span />', {text: self.name}).appendTo(self.element);
		self.controls = $("<div/>",{
			class: "chapy-control-group"
		});

	};

	ChapyCard.Tab.prototype = {

		constructor: ChapyCard.Tab,
		/**
		* build a tab with appending its own controls
		* 
		* @return void
		**/
		build: function(){
			var self = this;
			if(self.element && self.controls){
				self.element.append(self.controls);					
			}
			self.element.bind("click", $.proxy(self.tabClick, self));
			self.controls.bind("click", self.controlsClick);
		},
		/**
		* callback function for tab click
		*
		* return void
		**/
		tabClick: function(){
			var self = this;

			if(self.card.getActiveTab() && self.card.getActiveTab().name === self.name){
				console.log("click myself");
			}
			else{
				self.card.getActiveTab().deactive();
				self.active();
			}

		},
		/**
		* Prevent click event on child elements
		*
		* @return void
		**/
		controlsClick: function(event){
			event.stopPropagation();
		},
		/**
		* activate a tab
		* 
		* @return void
		**/
		active: function(){
			var self = this;

			self.status = true;
			self.controls.addClass('active');
		},
		/**
		* deactivate a tab
		* 
		* @return void
		**/
		deactive: function(){
			var self = this;

			self.status = false;
			self.controls.removeClass('active');
		},
		/**
		* add control to tab
		* 
		* @param ChapyCard.Control control 	control object
		* @return void
		**/
		addControl: function(control){
			var self = this;

			if(control.constructor !== ChapyCard.Control){
				$.error("control adding need to be an ChapyCard.Control");
			}
			self.controls.append(control.element);
		},
		/**
		* remove control from tab
		* 
		* @param ChapyCard.Control control 	control object
		* @return void
		**/
		removeControl: function(control){
			var self = this;

			if(control.constructor !== ChapyCard.Control){
				$.error("control removing need to be an ChapyCard.Control");
			}

			self.controls.find(control.element).remove();
		}
	};
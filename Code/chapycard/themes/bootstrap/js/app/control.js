/**
* ChapyCard Control
*
* @param 	Object options 	The configuration of control
* @param 	Object card 	ChapyCard.builder instance
**/
	ChapyCard.Control = function(tab, card){
		var self = this;

		self.selector = "";
		self.element = "";
		self.fields = {};
		self.card = card;
		self.tab = tab;
		self.distinct = false; // indicate control need to apply for each side of card (false as default)
	};
	
	ChapyCard.Control.prototype = {

		constructor: ChapyCard.Control,
		/**
		* build and add element to DOM
		*
		* @return void
		**/
		build: function(){
			var self = this;
			if(self.element){				
				self.element.appendTo(self.tab.controls);
			}
		},

		/**
		* this function need to be overrided by corresponding control
		*
		* @return void
		**/
		init: function(){
				console.log("init");		
		},
		/**
		* validate control
		* 
		* return $.error|true
		**/
		check: function(){
			var self = this;
			if (!self.selector){
				$.error('Check control: missing selector');
			}
			return true;
		},
		/**
		* cache old value of control
		* 
		* @return void
		**/
		cacheOldValue: function(){
			var self = this;
			$.each(self.fields, function(field_name, field){
				field.data("oldvalue", field.val());
			});
		},
		/**
		* update Css for control to DOM
		* 
		* @param string property property of style
		* @param string value  		value of property
		* @return void
		**/
		updateCss: function(property, value, knownSelector){
			var self = this;

			self.card.stylesheet.addRule(self.getSelector(knownSelector), property, value);			
			self.card.syncStyle();

		},
		getCss: function(){

		},
		/**
		* build selector for control
		*
		* @return string
		**/
		getSelector: function(knownSelector){
			var self = this;

			if(!self.distinct){
				return self.selector;
			}
				
			if(knownSelector){
				return "." + knownSelector + self.selector;
			}else if(self.card.getSelector()){
				return self.card.getSelector() + self.selector;
			}else{
				return self.selector;
			}			
		}
	};
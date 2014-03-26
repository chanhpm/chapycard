/**
* stylesheet representation
* 
* return (void)
**/

ChapyCard.Stylesheet = function(){
	this.rules = {};
};

ChapyCard.Stylesheet.prototype = {

	constructor: ChapyCard.Stylesheet,

	/**
	* add a new rule to stylesheet
	*
	* @param string selector 	selector of rule
	* @param string property 	property of css
	* @param string value 		value of css property
	* 
	* return (void)
	**/
	addRule: function(selector, property, value){
		var self = this;

		if(!self.rules.hasOwnProperty(selector)){
			self.rules[selector] = {};
		}

		self.rules[selector][property] = value;
	},

	/**
	* get all rules
	*
	* @return (void)
	**/
	getRules: function(){
		return this.rules;
	},
	/**
	* merge new stylesheet to existing rules.
	* 
	* @param Chapy.Stylesheet $stylesheet 	 the other stylesheet object
	*
	* return Chapy.Stylesheet
	**/
	mergeRules: function($stylesheet){
		this.rules = $.extend(true, {}, this.rules, $stylesheet);
	},

	/**
	* remove rule from stylesheet
	*
	* @param string selector 	selector of rule
	* @param string property 	property of selector of rule
	*
	* @return void
	**/
	removeRule: function(selector, property){
		var self = this;

		if(self.rules.hasOwnProperty(selector)){
			delete self.rules[selector][property];
		}
			

		if($.isEmptyObject(self.rules[selector])){
			delete self.rules[selector];
		}
			
	},
	/**
	* clear all rules
	*
	* @return (void)
	**/
	clearRule: function(){
		this.rules = {};
	},

	/**
	* get specific value for rule
	* 
	* @return value|false
	**/
	getValueOfRule: function(selector, property){
		var self = this;

		if(self.rules.hasOwnProperty(selector) && self.rules[selector].hasOwnProperty(property)){
			return self.rules[selector][property];
		}
			

		return false;
	},
	/**
	* get string represent for all rules
	*
	* return string
	**/
	toString: function(){
		var style = "";
		var self = this;

		$.each(self.rules, function(selector, $properties){
			style += selector + '{' + "\n";
			$.each($properties, function(property, value){
				style += '\t' + property + ':' + value + ';' + "\n";
			});
			style += '}' + "\n";
		});

		return $.trim(style);
	},

	/**
	* write css to DOM
	*
	* @param Object $stylesheet Jquery Object of style
	**/
	writeTo: function($stylesheet){
		var self = this;
		$stylesheet.html(self.toString());
	},

};
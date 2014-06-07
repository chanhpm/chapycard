/*
  chapycard 0.0.1 2014-05-03
  Copyright (c) 2014 

  Released under  License
*/

(function($, ChapyCard, undefined){

"use strict";

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
/**
* Global collection of available controls
*
* use ChapyCardControls.add(...) for adding control
* use ChapyCardControls.get for retrieving control
**/
	ChapyCard.Controls = {
		controls: {},
		/**
		* add control
		*
		*@param ChapyCardControl control 	object of ChapyCardControl
		**/
		add: function(name,control){
			if(!$.isPlainObject(control)){
				$.error("ChapyCardControls.add: control must be an object");
			}
			this.controls[name] = $.extend({}, new ChapyCard.Control({}),control);

		},
		/**
		* retrieve control by name
		*
		*@param String name 	name of control want to retrieve
		*@return ChapyCardControl
		**/
		get: function(name){
			var self = this;
			//if(!$.isPlainObject(self.controls[name])){
				//$.error("GetCardControl: Invalid index provided:" + name);				
			//}
			return self.controls[name];
		}
	};
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
			self.element.addClass('active');
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
			self.element.removeClass('active');
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
ChapyCard.Util = {

	getJSONData: function(controlname, property){
		if(JSONData.hasOwnProperty(controlname) && JSONData[controlname].hasOwnProperty(property)){
			return JSONData[controlname][property];
		}
			
		else{
			return null;
		}
			
	},

	updateJSONData: function(controlname, property, value, tabname){
		if (!JSONData.hasOwnProperty(controlname)){
			JSONData[controlname] = {};
		}
		JSONData[controlname][property] = value;
		if(!tabname){
			JSONData[controlname]['tab'] = tabname;
		}
			
	}
};
ChapyCard.Controls.add("background", {
    /**
     * Initializes the control by adding the following instance variables:
     *
     * this.element // jQuery object for the entire control
     * this.fields   // hash of jQuery objects for all form fields in the control
     *
     * @return  void
     */
	init: function(){
		var self =  this;

		self.distinct = true;
		self.element = $("<div class='background-controls card-control'><label for='background'>Background: </label> <input id='background' /> <input name='files' id='files' type='file' /></div>");
		self.fields = {			
			bgColor: self.element.find("#background"),
			bgImage: self.element.find("#files")		
		};
		
		self.fields.bgColor.kendoColorPicker({
            value: "#ffffff",
            buttons: false,
            select: $.proxy(self.bgColorChange, this)
        });
		self.fields.bgImage.kendoUpload();
       	self.kendoFields = {			
			bgColor: self.fields.bgColor.data('kendoColorPicker')			
		};		
		self.kendoFields.bgColor.wrapper.addClass('color');
		//self.kendoFields.borderStyle.wrapper.addClass('border-style');
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var bgColor = ChapyCard.Util.getJSONData('background', 'backgroundColor');
		
		
		if(bgColor){
			self.kendoFields.bgColor.value(bgColor);
			self.bgColorChange();
			var frontside = ChapyCard.Util.getJSONData("background", "frontside"),
				backside = ChapyCard.Util.getJSONData("background", "backside");
			if(frontside){
				self.bgColorChangeWithValue(frontside['backgroundColor'], "frontside");
			}
			if(backside){
				self.bgColorChangeWithValue(backside['backgroundColor'], "backside")
			}
		}		
			
	},
	
	/**
	* event triggered when changing border color value
	*
	* return void
	**/
	bgColorChange: function(event){		
		this.updateCss("background-color", this.fields.bgColor.val());
	},
	/**
	* event triggered when changing border style
	* @param: value of changing
	* @return void
	**/
	bgColorChangeWithValue: function(value, knownSelector){
		this.updateCss("background-color",value, knownSelector);		
	}
});
ChapyCard.Controls.add("border", {
    /**
     * Initializes the control by adding the following instance variables:
     *
     * this.element // jQuery object for the entire control
     * this.fields   // hash of jQuery objects for all form fields in the control
     *
     * @return  void
     */
	init: function(){
		var self =  this;

		self.distinct = true;
		self.element = $("<div id='border-controls' class='card-control'><label for='slider'>Border: </label> <input id='picker' /> <input id='border' /> <input id='style' /></div>");
		self.fields = {			
			borderColor: self.element.find("#picker"),
			border: self.element.find("#border"),
			borderStyle: self.element.find("#style")
		};
		
		self.fields.borderColor.kendoColorPicker({
            value: "#ffffff",
            buttons: false,
            select: $.proxy(self.borderColorChange, this)
        });

        self.fields.border.kendoNumericTextBox({
		     value: 0,
		     min: 0,
		     max: 100,
		     step: 1,
		     format: "n",
		     decimals: 0,		    	     
		     spin: $.proxy(self.borderChange, this),
		     change: $.proxy(self.borderChange, this)
		 });

		// create DropDownList from input HTML element
		var styledata = [
						{text: 'Solid', value: 'solid'},
						{text: 'Dotted', value: 'dotted'},
						{text: 'Dashed', value: 'dashed'},						
						{text: 'None', value: 'none'}
						];
        self.fields.borderStyle.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: styledata,
            index: 0,
            change: $.proxy(self.borderStyleChange, this)
        });
		self.kendoFields = {			
			borderColor: self.fields.borderColor.data('kendoColorPicker'),
			border: self.fields.border.data('kendoNumericTextBox'),
			borderStyle: self.fields.borderStyle.data('kendoDropDownList')
		};		
		self.kendoFields.border.wrapper.addClass('border');
		self.kendoFields.borderStyle.wrapper.addClass('border-style');
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var borderColor = ChapyCard.Util.getJSONData('borderColor', 'borderColor'),
			borderWidth = ChapyCard.Util.getJSONData('borderWidth', 'borderWidth'),
			borderStyle = ChapyCard.Util.getJSONData('borderStyle', 'borderStyle');
		
		if(borderColor){
			self.kendoFields.borderColor.value(borderColor);
			self.borderColorChange();
		}
		if(borderWidth){
			self.kendoFields.border.value(borderWidth);
			self.borderChange();
			var frontside = ChapyCard.Util.getJSONData("borderWidth", "frontside"),
				backside = ChapyCard.Util.getJSONData("borderWidth", "backside");
			if(frontside){
				self.borderChangeWithValue(frontside['borderWidth'], "frontside");
			}
			if(backside){
				self.borderChangeWithValue(backside['borderWidth'], "backside")
			}
		}
		if(borderStyle){
			self.kendoFields.borderStyle.value(borderStyle);
			self.borderChange();
			var frontside = ChapyCard.Util.getJSONData("borderStyle", "frontside"),
				backside = ChapyCard.Util.getJSONData("borderStyle", "backside");
			if(frontside){
				self.borderStyleChangeWithValue(frontside['borderStyle'], "frontside");
			}
			if(backside){
				self.borderStyleChangeWithValue(backside['borderStyle'], "backside")
			}
		}
			
	},
	
	/**
	* event triggered when changing border color value
	*
	* return void
	**/
	borderColorChange: function(event){		
		this.updateCss("border-color", this.fields.borderColor.val());
	},
	/**
	* event triggered when changing border value
	*
	* @return void
	**/
	borderChange: function(event){
		this.updateCss("border-width",this.fields.border.val() + "px");
		
	},
	/**
	* event trigger when changing border value
	* @param: value of changing
	* @return void
	**/
	borderChangeWithValue: function(value, knownSelector){
		this.updateCss("border-width",value + "px", knownSelector);		
	},
	/**
	* event triggered when changing border style
	*
	* @return void
	**/
	borderStyleChange: function(event){		
		this.updateCss("border-style", this.fields.borderStyle.val());
	},
	/**
	* event triggered when changing border style
	* @param: value of changing
	* @return void
	**/
	borderStyleChangeWithValue: function(value, knownSelector){
		this.updateCss("border-style",value, knownSelector);		
	}
});
ChapyCard.Controls.add("corner", {
    /**
     * Initializes the control by adding the following instance variables:
     *
     * this.element // jQuery object for the entire control
     * this.fields   // hash of jQuery objects for all form fields in the control
     *
     * @return  void
     */
	init: function(){
		var self =  this;
		
		self.element = $("<div id='corner-controls' class='card-control'><label for='slider'>Corner: </label> <input id='slider' /></div>");
		self.fields = {
			corner: self.element.find("#slider")
		};
		self.fields.corner.kendoNumericTextBox({
		     value: 0,
		     min: 0,
		     max: 100,
		     step: 1,
		     format: "n",
		     decimals: 0,
		     spin: $.proxy(self.cornerChange, this),
		     change: $.proxy(self.cornerChange, this)
		 });
		
		
		self.kendoFields = {
			corner: self.fields.corner.data('kendoNumericTextBox')			
		};
		
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var corner = ChapyCard.Util.getJSONData("corner", "corner");
			
		if(corner){
			self.kendoFields.corner.value(corner);
			self.cornerChange();
		}		
			
	},
	/**
	* event triggered when changing corner value
	*
	* @return void
	**/
	cornerChange: function(event){
		this.updateCss("border-radius",this.fields.corner.val() + "px");
	}
	
});
ChapyCard.Controls.add("height", {
    /**
     * Initializes the control by adding the following instance variables:
     *
     * this.element // jQuery object for the entire control
     * this.fields   // hash of jQuery objects for all form fields in the control
     *
     * @return  void
     */
	init: function(){
		var self =  this;

		self.element = $("<div id='height' class='card-control'><label for='slider'>Height: </label> <input id='slider' /></div>");
		self.fields = {
			height: self.element.find("#slider")
		};
		self.fields.height.kendoNumericTextBox({
		     value: 216,
		     min: 100,
		     max: 700,
		     step: 1,
		     format: "n",
		     decimals: 0,
		     spin: $.proxy(self.changeSize, this),
		     change: $.proxy(self.changeSize, this)
		 });

		self.kendoFields = {
			height: self.fields.height.data('kendoNumericTextBox')
		};
		
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var height = ChapyCard.Util.getJSONData("height", "height");
		if(height){
			self.kendoFields.height.value(height);
			self.changeSize();
		}
			
	},

	changeSize: function(event){
		this.updateCss("height",this.fields.height.val() + "px");
	}
});
ChapyCard.Controls.add("width", {
    /**
     * Initializes the control by adding the following instance variables:
     *
     * this.element // jQuery object for the entire control
     * this.fields   // hash of jQuery objects for all form fields in the control
     *
     * @return  void
     */
	init: function(){
		var self =  this;

		//self.distinct = true;
		self.element = $("<div id='width' class='card-control'><label for='slider'>Width: </label> <input id='slider' /></div>");
		self.fields = {
			width: self.element.find("#slider")
		};
		self.fields.width.kendoNumericTextBox({
		     value: 333,
		     min: 100,
		     max: 700,
		     step: 1,
		     format: "n",
		     decimals: 0,
		     spin: $.proxy(self.changeSize, this),
		     change: $.proxy(self.changeSize, this)
		 });

		self.kendoFields = {
			width: self.fields.width.data('kendoNumericTextBox')
		};
		
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var width = ChapyCard.Util.getJSONData("width", "width");
		if(width){
			self.kendoFields.width.value(width);
			self.changeSize();
		}
			
	},

	changeSize: function(){
		this.updateCss("width",this.fields.width.val() + "px");
	}
});
})(jQuery, window.ChapyCard = window.ChapyCard || {});
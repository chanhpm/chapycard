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
		self.element = $("<div id='border-controls' class='card-control'><label for='slider'>Border: </label> <input id='picker' /> <input id='border' /></div>");
		self.fields = {
			
			borderColor: self.element.find("#picker"),
			border: self.element.find("#border")
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
		
		self.kendoFields = {			
			borderColor: self.fields.borderColor.data('kendoColorPicker'),
			border: self.fields.border.data('kendoNumericTextBox')
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
		var borderColor = ChapyCard.Util.getJSONData('borderColor', 'borderColor'),
			borderWidth = ChapyCard.Util.getJSONData('borderWidth', 'borderWidth');
		
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
		this.updateCss("border-style", "solid");
	},
	/**
	* event trigger when changing border value
	* @param: value of changing
	* @return void
	**/
	borderChangeWithValue: function(value, knownSelector){
		this.updateCss("border-width",value + "px", knownSelector);
		this.updateCss("border-style", "solid", knownSelector);
	}
});
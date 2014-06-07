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
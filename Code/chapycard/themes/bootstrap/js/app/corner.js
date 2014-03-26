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

		//self.distinct = true;
		self.element = $("<div id='border-controls' class='card-control'><label for='slider'>Corner: </label> <input id='slider' /><input id='picker' /> <input id='border' /></div>");
		self.fields = {
			corner: self.element.find("#slider"),
			borderColor: self.element.find("#picker"),
			border: self.element.find("#border")
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
			corner: self.fields.corner.data('kendoNumericTextBox'),
			borderColor: self.fields.borderColor.data('kendoColorPicker'),
			border: self.fields.border.data('kendoNumericTextBox')
		};
		self.kendoFields.border.wrapper.addClass('border');
		self.refresh();
	},
	/**
	* refresh control by default/saved setting
	*
	* @return void
	**/
	refresh: function(){
		var self = this;
		var corner = ChapyCard.Util.getJSONData("corner", "corner"),
			borderColor = ChapyCard.Util.getJSONData('borderColor', 'borderColor'),
			borderWidth = ChapyCard.Util.getJSONData('borderWidth', 'borderWidth');
		if(corner){
			self.kendoFields.corner.value(corner);
			self.cornerChange();
		}
		if(borderColor){
			self.kendoFields.borderColor.value(borderColor);
			self.borderColorChange();
		}
		if(borderWidth){
			self.kendoFields.border.value(borderWidth);
			self.borderChange();
		}
			
	},
	/**
	* event triggered when changing corner value
	*
	* @return void
	**/
	cornerChange: function(event){
		this.updateCss("border-radius",this.fields.corner.val() + "px");
	},

	/**
	* event triggered when changing border color value
	*
	* return void
	**/
	borderColorChange: function(event){
		alert(this.fields.borderColor.val());
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
	}
});
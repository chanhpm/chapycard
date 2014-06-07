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
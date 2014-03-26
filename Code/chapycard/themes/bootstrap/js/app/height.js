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
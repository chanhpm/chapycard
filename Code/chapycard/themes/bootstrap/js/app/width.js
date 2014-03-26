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
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
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
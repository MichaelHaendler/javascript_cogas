
//after you make this you're going to need to make at least 1 other item in 
// order to properly test this. will need said second item for rule 2 also. also,
// we're going to need to make the menu associated with a person. 
function Ground_Item_Displayer(){

	this.item_array = [];
};

Ground_Item_Displayer.prototype.add_item = function(item){

	//needs to be at end, and displayed ontop of any items that it is being place
	//down upon
	//console.log("adding a whole bunch of times?");
	this.item_array.push(item);
};

Ground_Item_Displayer.prototype.draw_ssi = function(){

	//pw.print("this.item_array.length is: " + this.item_array.length);
	for(var i = 0; i < this.item_array.length; i++){
		var tmp_item = this.item_array[i];
		tmp_item.draw_ssi();
	}

};


Ground_Item_Displayer.prototype.select_item = function(mx,my){

	for(var i = 0; i < this.item_array.length; i++){

		var tmp_item = this.item_array[i];

		if(tmp_item.conditions_were_met_to_start_dragging(mx,my)){

			//if there is already an object in it 
			if(gen_obj != null){

				//put the item into the general background object array 
				this.item_array.push(gen_obj);

				//set gen_obj as the currently selected object
				gen_obj = tmp_item;
				
			}
			else{
				//if there was not an object in there, do this.
				gen_obj = tmp_item;
			}

			//then, do these next steps regardless.

			gen_obj.make_movement_changes(mx,my);
			
			this.item_array.splice(i,1);
			
			break;
			
		}

	}

};

//user has dropped the item. thus it is to be removed from gen_obj, and
//added to the array. 

//not doing this will probably cause me to lose items (that is to be said,
//if an item isnt being dragged around, but is just left in the gen_obj variable,
// and then another object is selected, and is put into the gen_obj variable, the )
// Ground_Item_Displayer.prototype.join_background = function(){


// };



/*
//BACKUP (IT WORKS!)
Ground_Item_Displayer.prototype.select_item = function(mx,my){

	//console.log("getting in here");

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_item = this.item_array[i];

		// pw.print("tmp_item name is: " + tmp_item.name);
		// pw.print("tmp_item.x is: " + tmp_item.x);
		// pw.print("tmp_item.y is: " + tmp_item.y);
		
		//if in the proper conditions to start dragging 
		//ie: (hovering over it, and proper initial click)
		if(tmp_item.conditions_were_met_to_start_dragging(mx,my)){

			//if there is already an object in it 
			if(gen_obj != null){

				//put the item into the general background object array 
				this.item_array.push(gen_obj);

				//set gen_obj as the currently selected object
				gen_obj = tmp_item;

				//and move said object accordingly.
				gen_obj.make_movement_changes(mx,my);

				this.item_array.splice(i,1);

				break;
			}
			else{
				gen_obj = tmp_item;
				this.item_array.splice(i,1);
			}
			
			//this.item_array[i] = null;
		}

	}


}*/


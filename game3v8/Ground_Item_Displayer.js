
//after you make this you're going to need to make at least 1 other item in 
// order to properly test this. will need said second item for rule 2 also. also,
// we're going to need to make the menu associated with a person. 
function Ground_Item_Displayer(){

	this.item_array = [];
};

Ground_Item_Displayer.prototype.add_item = function(item){

	//needs to be at end, and displayed ontop of any items that it is being place
	//down upon
	this.item_array.push(item);
};

Ground_Item_Displayer.prototype.draw_ssi = function(){


	for(var i = 0; i < this.item_array.length; i++){
		var tmp_item = this.item_array[i];
		tmp_item.draw_ssi();
	}

};

Ground_Item_Displayer.prototype.select_item = function(mx,my){

	//console.log("getting in here");

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_item = this.item_array[i];
		
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

				break;
			}
			else{
				gen_obj = tmp_item;
			}
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






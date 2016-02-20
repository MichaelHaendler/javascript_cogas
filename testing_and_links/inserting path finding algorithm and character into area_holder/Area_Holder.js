/*
idea:

get person's 3d tb's set up 

then get that general square working

then get the yellow 3x3 square working for the character

then get the yellow square to turn red when its over an area
that cant be walked 

then get the drawing stuff in proper order going

then get a rudamentary walking algorithm going. 

then take the actual shortest path code, and incorporate the 

*/

function Area_Holder(terrain_blocks_across,terrain_blocks_down){

	//note: both tbw and tbh are just for initialization of terrain layers. 

	//terrain blocks wide: number of terrain blocks across x axis. 
	this.tbw = terrain_blocks_across;

	//terrain blocks high. number of terrain blocks down y axis. 
	this.tbl = terrain_blocks_down;


	//z (aka up and down, otherwise known as height) dimension. Is for
	//holding all of the terrain layers
	this.z = [];

	this.ascii_z = [];

};

Area_Holder.prototype.add_square = function(x,y,w,l,h,
											which_sprite_array,
											name_of_sprite_sheet,
											ba,
											which_layer){

	//debugger;

	//if that terrain layer doesn't exist, create it. 
	if(this.z[which_layer] == null){
		//console.log("got into here? once?");
		this.z[which_layer] = new Terrain_Layer(which_layer,this.tbw,this.tbl);
	}

	//get that layer
	var terr_layer = this.z[which_layer];

	//create the terrain square...inserting it into the terrain layer as well as getting a copy of it. 
 

	//(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba,which_layer)

	// console.log(0);
	//console.log(ba);

	// console.log("name_of_sprite_sheet is: " + name_of_sprite_sheet);
	// console.log("which_layer is: " + which_layer);


	//note: I know this is very very weird code...but I am doing it this way in order to keep
	//where the definitions are for the various types of squares (0,1, etc) centalized.
	var tmp_ts = terr_layer.new_Terrain_Square(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba,which_layer);

	//set ascii_z to hold the updated ascii map
	this.ascii_z[which_layer]= terr_layer.get_ascii_map();

	if(this.z.length < tmp_ts.get_layer_count()){

		var new_height = tmp_ts.get_layer_count();

		// console.log("tmp_ts.get_layer_count() is: " + tmp_ts.get_layer_count());
		// console.log("tmp_ts.ss_name is: " + tmp_ts.ss_name);

		for(var i = this.z.length; i < new_height; i++){

			//create the new terrain layer
			var tmp_tl = new Terrain_Layer(which_layer,this.tbw,this.tbl);

			//set the new layer's acsii tss to the proper values. 
			tmp_tl.add_to_ascii_tss(tmp_ts);

			//then finally add the new layer to z.  
			this.z[i] = tmp_tl;

			this.ascii_z[i]= tmp_tl.get_ascii_map();

		}

	}


	//finally (could have done this right before the if statement, but thought
	//that that would mess with the general flow) 
	
};

//note to self...if a rock gets blown up and destroyed, that rock needs to be removed, and then
//the entire area needs to be remade. Or at least that little area does. 

//inserts layers that weren't (or couldn't be) properly filled in. 
// Area_Holder.prototype.fill_in_layers = function(){

// };

Area_Holder.prototype.draw_ssi = function(){

	for(var i = 0; i < this.z.length; i++){

		//console.log("layer " + i);

		var terr_layer = this.z[i];

		//terr_layer.contains_mouse(mx,my);
		terr_layer.draw_ssi();

	}

};

//get_ascii_map

// Area_Holder.prototype.get_ascii_map = function(num){

// 	if(num == null){
// 		//console.log("here1");
// 		return this.z.shift().get_ascii_map();
// 	}
// 	else{
// 		//console.log("here2");
// 		return this.z[num].get_ascii_map();
// 	}

// };



Area_Holder.prototype.get_3d_ascii_map = function(){

	return this.ascii_z;
}



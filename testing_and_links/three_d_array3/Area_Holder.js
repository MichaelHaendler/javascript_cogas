/*
weird idea: 

implement area holder. 

once you start to get it working...given that the second layer (aka z[1]) will only
have one or two things on it...test then to see if terrain layer is working correctly. 

what you want to test: 

asides from being able to put a rock anywhere (thats a part of area holder not terr layer)

you want to test to see if you strech something (like the rock) if it will then show up properly
in the ascii_tss array. 
*/

function Area_Holder(terrain_blocks_across,terrain_blocks_down){

	//note: both tbw and tbh are just for initialization of terrain layers. 

	//terrain blocks wide: number of terrain blocks across x axis. 
	this.tbw = terrain_blocks_across;

	//terrain blocks high. number of terrain blocks down y axis. 
	this.tbh = terrain_blocks_down;


	//z (aka up and down) dimension. for holding all of the
	//terrain layers
	this.z = [];

};

Area_Holder.prototype.modify_square_on_layer = function(which_layer,
														x,y,w,l,h,
														which_sprite_array,
														name_of_sprite_sheet,
														ba){{

	if(this.z[which_layer] == null){
		this.z[which_layer] = new Terrain_Layer(this.tbw,this.tbh);
	}

	var terr_layer = this.z[which_layer];

	terr_layer.add_square_w_boundaries(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba);

};

//inserts layers that weren't (or couldn't be) properly filled in. 
Area_Holder.prototype.fill_in_layers = function(){


};

Area_Holder.prototype.draw_ssi = function(){

	for(var i = 0; i < z.length; i++){

		var terr_layer = z[i];

		terr_layer.contains_mouse(mx,my);
		terr_layer.draw_ssi();

	}


};

/*
idea: 

first, get the two layers working (the grass and the one rock)

get it so that a person could walk behind, in front of, and to the sides
of the rock, but not through the rock. 

actually test this with a person character. 

after that, work on only the layer that the character is on being shown. 
*/

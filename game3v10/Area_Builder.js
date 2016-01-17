

// idea: 

// draw square around persons feet. 

// this square will show up when character is clicked on. 

function fill_with_grass_and_rocks(){

	//width of square
	var wos = 30;

	//height of square
	var hos = 30;
	
	// //width of square
	// var wos = 32;

	// //height of square
	// var hos = 32;

	//number of squares wide
	var c_w = 15;

	//height/length number of squares
	var c_h = 6;
	

	//biggest size of c_w and c_h (map array needs to be the same width as it is length)
	var bsize = -1;

	var bsize = (c_w >= c_h) ? c_w : c_h;

	var tmp_th = new Terrain_Holder(wos,hos,bsize);


	var name_of_sprite_sheet = "grass_and_rocks_canvas";

	//note: will be using something like this in the final code. 
	//that is, using code to manually assemble the area. am doing this
	//until I have a gui for building an area. 
	//var which_sprite_array = [0,0,16,16]; //aka the first sprite.
	//var which_sprite_array = [0,0,32,32];

	var grass_sprite = [0,0,32,32];
	var rock_sprite = [32,0,32,32];
	var type0 = 0;
	var type1 = 1;

	for(var x = 0; x < c_w; x++){

		for(var y = 0; y < c_h; y++){
			// console.log("x is: " + x);
			// console.log("y is: " + y);

			//console.log("3which_sprite_array is: " + which_sprite_array);

			tmp_th.add_square(x,y,type0,grass_sprite,name_of_sprite_sheet);

			//(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet)
		}
	}

		//add rocks

	var rocks_x_start = 7;

	for(var i = 1; i < 5; i++){
		tmp_th.add_square(rocks_x_start,i,type1,rock_sprite,name_of_sprite_sheet);
	}

	return tmp_th;

};


th = fill_with_grass_and_rocks();
//th.print_2d_array();
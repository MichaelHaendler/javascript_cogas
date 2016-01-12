
var th = fill_with_grass_and_rocks();
//th.print_2d_array();

function fill_with_grass_and_rocks(){

	//width of square
	var wos = 32;

	//height of square
	var hos = 32;

	//number of squares (same in both directions)
	//var nos = 15;

	var c_w = 15;
	var c_h = 6;

	//biggest size
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

function fill_with_grass(){

	//width of square
	var wos = 32;

	//height of square
	var hos = 32;

	//number of squares (same in both directions)
	//var nos = 15;

	var c_w = 15;
	var c_h = 5;

	//biggest size
	var bsize = -1;

	var bsize = (c_w >= c_h) ? c_w : c_h;

	var tmp_th = new Terrain_Holder(wos,hos,bsize);


	var name_of_sprite_sheet = "grass_and_rocks_canvas";

	//note: will be using something like this in the final code. 
	//that is, using code to manually assemble the area. am doing this
	//until I have a gui for building an area. 
	//var which_sprite_array = [0,0,16,16]; //aka the first sprite.
	var which_sprite_array = [0,0,32,32];
	var type = 0;

	for(var x = 0; x < c_w; x++){

		for(var y = 0; y < c_h; y++){
			// console.log("x is: " + x);
			// console.log("y is: " + y);

			//console.log("3which_sprite_array is: " + which_sprite_array);

			tmp_th.add_square(x,y,type,which_sprite_array,name_of_sprite_sheet);

			//(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet)
		}
	}

	return tmp_th;

};

// var th = fill_with_grass();

// th.print_2d_array();

var ts = null;


function make_terrain_square(){

	var x = 0;
	var y = 0;
	var w = 20;
	var h = 20;
	var type = 0; //walkable
	var which_sprite_array = [0,0,16,16]; //aka the first sprite.
	var name_of_sprite_sheet = "grass_and_rocks_canvas";

	ts = new Terrain_Square(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet);

};

//make_terrain_square();
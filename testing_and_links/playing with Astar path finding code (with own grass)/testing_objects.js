
//width of square
wos = 20;

//height of square
hos = 20;

//number of squares (same in both directions)
nos = 20;

var th = new Terrain_Holder(wos,hos,nos);

function fill_with_grass(){

	var name_of_sprite_sheet = "grass_and_rocks_canvas";

	//note: will be using something like this in the final code. 
	//that is, using code to manually assemble the area. am doing this
	//until I have a gui for building an area. 
	var which_sprite_array = [0,0,16,16]; //aka the first sprite.
	var type = 0;//walked on.
	//var type1 = 0;//not walked on

	for(var x = 0; x < nos; x++){

		for(var y = 0; y < nos; y++){
			// console.log("x is: " + x);
			// console.log("y is: " + y);

			//console.log("3which_sprite_array is: " + which_sprite_array);

			th.add_square(x,y,type,which_sprite_array,name_of_sprite_sheet);

			//(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet)
		}
	}

};

//fill_with_grass();

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
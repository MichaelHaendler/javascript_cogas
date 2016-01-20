

// idea: 

// draw square around persons feet. 

// this square will show up when character is clicked on. 

//	TO DO!!!! round the location of the things that you are
//placing on the field. done. because it's all based on 
//squares, and those are all even. 
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
	//c_w == canvas width
	var c_w = 15;

	//height/length number of squares
	//c_h == canvas_height
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

	// for(var i = 1; i < 5; i++){
	// 	tmp_th.add_square(rocks_x_start,i,type1,rock_sprite,name_of_sprite_sheet);
	// }

	console.log("WOWZA@@@@@@@@@@@@@@@@@@@@@@@");

	for(var i = 1; i < 2; i++){
		var ba = [[0,0],[1,1]];
		tmp_th.add_square_w_boundaries(rocks_x_start,i,type1,rock_sprite,name_of_sprite_sheet,ba);
	}

	return tmp_th;

};


//th = fill_with_grass_and_rocks();
//th.print_2d_array();


// function build_testing_area(){

// 	//width of square
// 	var wos = 30;

// 	//height of square
// 	var hos = 30;

// 	//number of squares wide
// 	//c_w == canvas width
// 	var c_w = 5;

// 	//height/length number of squares
// 	//c_h == canvas_height
// 	var c_h = 5;
	
// 	/*
// 	num of squares across (nosw) 2
// 	num of squares down (nosh) is 2
// 	each square is 3 terrain blocks wide (s_tb_w)
// 	each square is 3 terrain blocks high (s_sb_h)
// 	array_w = nosw * s_tb_w (6)
// 	array_h = nosh * s_tb_h (6)

// 	6 * 6 is 36 

// 	array should have 36 numbers in it. 
// 	*/

// 	//biggest size of c_w and c_h (map array needs to be the same width as it is length)
// 	var bsize = -1;

// 	var bsize = (c_w >= c_h) ? c_w : c_h;

// 	var tmp_th = new Terrain_Holder(wos,hos,bsize);


// 	var name_of_sprite_sheet = "grass_and_rocks_canvas";

// 	var grass_sprite = [0,0,32,32];
// 	var rock_sprite = [32,0,32,32];

// 	// for(var x = 0; x < c_w; x++){

// 	// 	for(var y = 0; y < c_h; y++){
// 	// 		// console.log("x is: " + x);
// 	// 		// console.log("y is: " + y);

// 	// 		//console.log("3which_sprite_array is: " + which_sprite_array);

// 	// 		tmp_th.add_square(x,y,type0,grass_sprite,name_of_sprite_sheet);

// 	// 		//(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet)
// 	// 	}
// 	// }

// 	//(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet)



// 	//add rocks
// 	// var rocks_x_start = 7;
// 	// for(var i = 1; i < 2; i++){
// 	// 	var ba = [[0,0],[1,1]];
// 	// 	tmp_th.add_square_w_boundaries(rocks_x_start,i,type1,rock_sprite,name_of_sprite_sheet,ba);
// 	// }

// 	//tmp_th.print_2d_array();

// 	//////////////////////////////////////////////////

// 	/*
// 	tmp_th.add_square(0,0,wos,hos,type0,grass_sprite,name_of_sprite_sheet);
// 	tmp_th.add_square(0,1,wos,hos,type0,grass_sprite,name_of_sprite_sheet);
// 	tmp_th.add_square(1,0,wos,hos,type0,grass_sprite,name_of_sprite_sheet);

// 	var ba = [[0,0],[1,1]];
// 	tmp_th.add_square_w_boundaries(1,1,wos,hos,type1,rock_sprite,name_of_sprite_sheet,ba);
// 	*/

	

// 	// var ba = [[0,2],[1,2],[2,2]];
// 	// tmp_th.add_square_w_boundaries(0,0,wos,hos,rock_sprite,name_of_sprite_sheet,ba);

// 	//because I dont want the squares to necessarily be the same size, but I need some
// 	//standard unit for all of these squares to line up, the units will by terrain blocks
// 	//rather than by terrain squares (which, again, can vary to a degree in size)
// 	//tmp_th.add_square(3,0,wos,hos,grass_sprite,name_of_sprite_sheet);

// 	tmp_th.add_square(3,0,wos,hos,grass_sprite,name_of_sprite_sheet);

// 	var ba = [[0,2],[1,2],[2,2]];
// 	tmp_th.add_square_w_boundaries(3,3,wos,hos,rock_sprite,name_of_sprite_sheet,ba);

// 	return tmp_th;


// };

// th = build_testing_area();



// function build_testing_area2(){

// 	//width of square
// 	var wos = 30;

// 	//height of square
// 	var hos = 30;

// 	//width and height here are both in terms of terrain blocks. 
// 	var game_area_width = 15;
// 	var game_area_height = 15;

// 	var tmp_th = new Terrain_Holder(game_area_width,game_area_height);


// 	var name_of_sprite_sheet = "grass_and_rocks_canvas";

// 	var grass_sprite = [0,0,32,32];
// 	var rock_sprite = [32,0,32,32];


// 	tmp_th.add_square(4,0,wos,hos,grass_sprite,name_of_sprite_sheet);

// 	var ba = [[0,2],[1,2],[2,2]];
// 	//var ba = [[0,0]];
// 	tmp_th.add_square_w_boundaries(0,3,wos,hos,rock_sprite,name_of_sprite_sheet,ba);

// 	return tmp_th;


// };

// th = build_testing_area2();


function build_testing_area3(){

	//NOTE: width and height here are both in terms of terrain blocks, and are used
	//and are used to define how big the game canvas itself will be. 

	//terrain blocks across (x axis)
	//var tba = 15;
	var tba = 35;


	//terrain blocks down (y axis)
	var tbd = 15;

	var tmp_th = new Terrain_Holder(tba,tbd);

	//grass square terrain block width: number of terrain blocks
	//wide a grass square is. 
	var gs_tbw = 3;

	//same as above, but for height. 
	var gs_tbh = 3;

	var name_of_sprite_sheet = "grass_and_rocks_canvas";

	var grass_sprite = [0,0,32,32];
	var rock_sprite = [32,0,32,32];

	//width of square.
	//use accurate values rather than rounded. with the current setup, the code
	//will auto round it anyways. 
	var wos = 30;

	//height of square
	var hos = 30;


	//add grass
	for(var x = 0; x < tba; x += gs_tbw){

		for(var y = 0; y < tba; y += gs_tbh){

			tmp_th.add_square(x,y,wos,hos,grass_sprite,name_of_sprite_sheet);

		}

	}

	//add rocks
	var ba = [[0,2],[1,2],[2,2]];
	//var ba = [[0,0]];
	tmp_th.add_square_w_boundaries(12,12,wos,hos,rock_sprite,name_of_sprite_sheet,ba);
	tmp_th.add_square_w_boundaries(12,14,wos,hos,rock_sprite,name_of_sprite_sheet,ba);
	tmp_th.add_square_w_boundaries(12,18,wos,hos,rock_sprite,name_of_sprite_sheet,ba);
	tmp_th.add_square_w_boundaries(12,21,wos,hos,rock_sprite,name_of_sprite_sheet,ba);


	return tmp_th;



};

th = build_testing_area3();

/*
idea: 

going to make 3d array so that I can have grass and rocks

need to: 

change the code so that it doesn't over-write 1s (areas that cannot
be walked on)

change it so that it is a 3d array, so that I can put down grass, and then
put rocks ontop of grass. 

means I need to make a new print_2d_array

call it...

print_3d_array_in_2d

actually no I won't! 

I'll just need to update ascii_tss correctly! 

n can be turned to a 0 or a 1 

a 0 can be turned into a 1 

but a 1 cannot be turned into a zero 

the array needs to be made 3d. and we need to iteratr through it in order to 

print both grass and the rock thats ontop of it. 

what about when a character is standing between 2 rocks? 

graphic will probably show it as the person standing ontop of the rock 

meaning we need to put the character into the 2d (3d?) array as well so that
everything is drawn properly. 

lol

rename terrain_holder something like "Area_Holder" 

this class will hold EVERYTHING. stuff on the ground., everything

how do I decide when the character is to be drawn in front of stuff, behind stuff, etc? 

go by the x,y coords. (at least the y coord)

if the character is above it (y coord), then draw the character first, then the object

the y coord can be used to determine order in the array. 


*/
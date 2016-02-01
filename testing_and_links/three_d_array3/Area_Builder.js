

// function build_testing_area(){

// 	//NOTE: width and height here are both in terms of terrain blocks, and are used
// 	//and are used to define how big the game canvas itself will be. 

// 	//terrain blocks across (x axis)
// 	//var tba = 15;
// 	var tba = 35;


// 	//terrain blocks down (y axis)
// 	var tbd = 15;

// 	var tmp_th = new Terrain_Layer(tba,tbd);

// 	//grass square terrain block width: number of terrain blocks
// 	//wide a grass square is. 
// 	var gs_tbw = 3;

// 	//same as above, but for height. 
// 	var gs_tbh = 3;

// 	var name_of_sprite_sheet1 = "rock1";

// 	var name_of_sprite_sheet2 = "grass_and_rocks_canvas";

// 	var grass_sprite = [0,0,32,32];
// 	var rock_sprite = [32,0,32,32];

// 	//width of square.
// 	//use accurate values rather than rounded. with the current setup, the code
// 	//will auto round it anyways. 
// 	var wos = 30;

// 	//length of square
// 	var los = 30;

// 	//height of square
// 	var hos = 30;

// 	//add grass
// 	for(var x = 0; x < tba; x += gs_tbw){

// 		for(var y = 0; y < tba; y += gs_tbh){

// 			tmp_th.add_square(x,y,wos,los,hos,grass_sprite,name_of_sprite_sheet2);

// 		}

// 	}

// 	//add rocks
// 	var ba = [[0,2],[1,2],[2,2]];
// 	//var ba = [[0,0]];
// 	tmp_th.add_square_w_boundaries(12,12,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(12,15,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(12,18,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(00,01,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);


// 	return tmp_th;

// };

// th = build_testing_area();
// print_2d_array(th.get_ascii_map());

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

issue for today: fixing grass so that I can put the elements anywhere that I want. 
I will put the same element in multiple squares. thats what I will do. 

calculate where, and put them there. 

*/


function build_testing_area_for_ah(){

	//NOTE: width and height here are both in terms of terrain blocks, and are used
	//and are used to define how big the game canvas itself will be. 

	//terrain blocks across (x axis)
	//var tba = 15;
	var tba = 35;


	//terrain blocks down (y axis)
	var tbd = 15;

	//var tmp_th = new Terrain_Layer(tba,tbd);
	var tmp_ah = new Area_Holder(tba,tbd);

	//grass square terrain block width: number of terrain blocks
	//wide a grass square is. 
	var gs_tbw = 3;

	//same as above, but for height. 
	var gs_tbh = 3;

	var name_of_sprite_sheet1 = "rock1";

	var name_of_sprite_sheet2 = "grass_and_rocks_canvas";

	var grass_sprite = [0,0,32,32];
	var rock_sprite = [32,0,32,32];

	//width of square.
	//use accurate values rather than rounded. with the current setup, the code
	//will auto round it anyways. 
	var wos = 30;

	//length of square
	var los = 30;

	//height of square
	var hos = 30;

	var layer_0 = 0;

	var layer_1 = 1;

	//note: no boundaries for grass. 
	//var boundaries = [];

	//add grass
	for(var x = 0; x < tba; x += gs_tbw){

		for(var y = 0; y < tba; y += gs_tbh){

			//tmp_ah.add_square(layer_0,x,y,wos,los,hos,grass_sprite,name_of_sprite_sheet2,boundaries);
			tmp_ah.add_square(layer_0,x,y,wos,los,hos,grass_sprite,name_of_sprite_sheet2);

		}

	}

	//add rocks
	//var ba = [[0,2],[1,2],[2,2]];
	// tmp_ah.add_square(layer_1,12,12,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
	// tmp_ah.add_square(layer_1,12,15,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
	// tmp_ah.add_square(layer_1,12,18,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
	//tmp_ah.add_square(layer_1,00,01,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);


	return tmp_ah;

};

ah = build_testing_area_for_ah();
//print_2d_array(ah.get_ascii_map());
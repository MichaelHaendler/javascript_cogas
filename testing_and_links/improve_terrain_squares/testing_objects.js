

//test terrain square
var test_ts = null;

var x = 0;
var y = 0;
var wos = 30;
//var wos = 45;
var los = 30;
//var type0 = 0;

var grass_sprite = [0,0,32,32];
var grass_sprite_sheet = "grass_and_rocks_canvas";

//I guess grass has a height of 1. 
var grass_ba = [
		{layer: 0, 
		start_loc: [0,0], 
		ts_layer: [
				   [0,0,0],
				   [0,0,0],
				   [0,0,0]
				  ], 
		d_array: true}
		];

// var grass_ba = [
// 		{layer: 0, 
// 		start_loc: [0,0], 
// 		ts_layer: [
// 				   [0,1,2],
// 				   [3,4,5],
// 				   [6,7,8]
// 				  ], 
// 		d_array: true}
// 		];

//note: start_loc might not be bad to keep around for when you want to change
//a specific tb, or a set of specific tb's...but I think it's otherwise pretty useless. 


// var rock_ba = [
// 		{layer: 0, start_loc: [0,0], ts_layer: [1,2,3], d_array: false},
// 		{layer: 1, start_loc: [0,0], ts_layer: [4,5,6], d_array: false},
// 		{layer: 2, start_loc: [0,0], ts_layer: [7,8,9], d_array: false}
// 		];

//(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba){

//grass test
var grass_hos = 0; 
var grass_wos = 30;
var grass_los = 30;

//test_ts = new Terrain_Square(x,y,grass_wos,grass_los,grass_hos,grass_sprite,grass_sprite_sheet,grass_ba);

/*
--------------------------------------------------------------
*/

//rock test
var x = 0;
var y = 0;
var rock_wos = 30;
var rock_los = 10;
var rock_hos = 30; 
var rock_sprite = [32,0,32,32];
var rock_sprite_sheet = "rock1";
var rock_ba = [
		{layer: 0, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 1, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 2, start_loc: [0,2], ts_layer: [1,1,1], d_array: false}
		];

// var rock_ba = [
// 		{layer: 0, start_loc: [2,0], ts_layer: [1,1,1], d_array: false},
// 		{layer: 1, start_loc: [2,0], ts_layer: [1,1,1], d_array: false},
// 		{layer: 2, start_loc: [2,0], ts_layer: [1,1,1], d_array: false}
// 		];
//test_ts = new Terrain_Square(x,y,rock_wos,rock_los,rock_hos,rock_sprite,rock_sprite_sheet,rock_ba);


/*
grass seems like it's working. 

now move onto rock. 
*/


//keep the height or no? 
//kinda dont need it due to ba. 
//but could also be kinda good to 
//have in general. Like...you have all 3 values, and you
//could use that to initilize the size of it's person 3d array...no? 
//but those areas already exist in the array...
//wanka wanka. 
//hahah probably delete wos, los, and hos from terrain square since 
//the ba (which is actually pretty critial) can be used to define all 3. 

//sooo....

//get rock working correctly (with the red and blue, also displaying correctly
//and having the appropriate layers)

//then get w, h, and l sorted out. 

//then delete the w,l, and h from constructor...using ba to deine that stuff
//instead


/*
look into getting the red squares working correctly (at an angle for some reason)

once you do that...I think move onto terrain holder

make a thing of grass. 

put a rock on it. 

there should be a single ascii tba for the rocks and grass (I guess already is)

so the base of the rock should show up as a single row of three ones. and the 
rest of it should be zeros. 

*/


function build_testing_area1_2(){

	//NOTE: width and height here are both in terms of terrain blocks, and are used
	//and are used to define how big the game canvas itself will be. 

	//terrain blocks across (x axis)
	//var tba = 15;
	var tba = 35;


	//terrain blocks down (y axis)
	var tbd = 15;

	var tmp_th = new Terrain_Layer(tba,tbd);

	var r_x = 0;
	var r_y = 0;
	var rock_wos = 30;
	var rock_los = 10;
	var rock_hos = 30; 
	var rock_sprite = [32,0,32,32];
	var rock_sprite_sheet = "rock1";
	var rock_ba = [
		{layer: 0, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 1, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 2, start_loc: [0,2], ts_layer: [1,1,1], d_array: false}
		];


	tmp_th.add_square_w_boundaries(r_x,r_y,rock_wos,rock_los,rock_hos,rock_sprite,rock_sprite_sheet,rock_ba);

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

// new Terrain_Square(x,y,rock_wos,rock_los,rock_hos,rock_sprite,rock_sprite_sheet,rock_ba);

// 		}

// 	}

// 	//add rocks
// 	var ba = [[0,2],[1,2],[2,2]];
// 	tmp_th.add_square_w_boundaries(12,12,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(12,15,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(12,18,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);
// 	tmp_th.add_square_w_boundaries(00,01,wos,los,hos,rock_sprite,name_of_sprite_sheet1,ba);


	return tmp_th;

};

th = build_testing_area1_2();
//print_2d_array_v9(th.get_ascii_map());
// print_2d_array_v2(th.get_ascii_map());
print_2d_array_v10(th.get_ascii_map());
//print_2d_array_v11(th.get_ascii_map());




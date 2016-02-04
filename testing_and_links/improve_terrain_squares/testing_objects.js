

//test terrain square
var test_ts = null;

var x = 1;
var y = 1;
var wos = 30;
//var wos = 45;
var los = 30;
//var type0 = 0;

var grass_sprite = [0,0,32,32];
var grass_sprite_sheet = "grass_and_rocks_canvas";

//I guess grass has a height of 1. 
// var grass_ba = [
// 		{layer: 0, 
// 		start_loc: [0,2], 
// 		row_vals: [
// 				   [0,0,0],
// 				   [0,0,0],
// 				   [0,0,0]
// 				  ], 
// 		d_array: true}
// 		];

var grass_ba = [
		{layer: 0, 
		start_loc: [0,0], 
		ts_layer: [
				   [0,1,2],
				   [3,4,5],
				   [6,7,8]
				  ], 
		d_array: true}
		];


var rock_sprite = [32,0,32,32];
var rock_sprite_sheet = "rock1";
var rock_ba = [
		{layer: 0, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 1, start_loc: [0,2], ts_layer: [1,1,1], d_array: false},
		{layer: 2, start_loc: [0,2], ts_layer: [1,1,1], d_array: false}
		];

//(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba){

//grass test

var grass_hos = 0; 

test_ts = new Terrain_Square(x,y,wos,los,grass_hos,grass_sprite,grass_sprite_sheet,grass_ba);

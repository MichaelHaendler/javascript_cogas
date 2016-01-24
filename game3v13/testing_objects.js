

// var init_loc_on_screen = [488,54];
var init_loc_on_screen = [270,30];
var image_name = "health_icon_1";
var image_dimensions = [10,11,110,109];
// gen_obj = new Gen_Obj(init_loc_on_screen,
// 						  image_name,
// 						  image_dimensions);



//gen_obj.name = "blah1";

var init_loc_on_screen1 = [270,90];
var obj1 = new Gen_Obj(init_loc_on_screen1,
						  image_name,
						  image_dimensions);
obj1.name = "mark";

var init_loc_on_screen2 = [270,150];
var obj2 = new Gen_Obj(init_loc_on_screen2,
						  image_name,
						  image_dimensions);

obj2.name = "john";



//var mike = new Gen_Character();

var mike = new Person();


var GID = new Ground_Item_Displayer();


//console.log("adding items a lot??");
GID.add_item(obj1);
GID.add_item(obj2);


//test terrain square
var test_ts = null;

var x = 1;
var y = 0;
var wos = 30;
var hos = 30;
var type0 = 0;
var rock_sprite = [32,0,32,32];
// var name_of_sprite_sheet = "grass_and_rocks_canvas";
var name_of_sprite_sheet = "rock1";
// var ba = [[0,0],[1,1]];
//var ba = [[0,0]];
var ba = [[0,2],[1,2],[2,2]];

test_ts = new Terrain_Square(x,y,wos,hos,type0,rock_sprite,name_of_sprite_sheet);

test_ts.add_boundaries(ba);

//terrain square acsii array
var tsaa = test_ts.get_ascii_terrain_blocks();

//console.log(tsaa);

// console.log("tsaa.length is: " + tsaa.length);

// console.log("tsaa[0].length is: " + tsaa[0].length);

// [
// [0,0,0],
// [0,0,0],
// [1,1,1]
// ];

//print_2d_array(test_ts.get_ascii_terrain_blocks());

print_2d_array_v2(test_ts.get_ascii_terrain_blocks());

// a = [1,2,3];

// for(var num in a){
// 	console.log(num);
// }

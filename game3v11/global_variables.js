//this exist because things like canvas will often have to be called by the various classes. 

//...also, the current state of the canvas will have to be shared at times. 

//I feel that by making at least the canvas global, that it'll simplify both the sharing AND the
//modifying of the current canvas easier. 

//ctx == context (aka the current version of the canvas...I think)kk
var c = document.getElementById("myCanvas"); // c == canvas
var ctx = c.getContext("2d");//ctx == context (aka the current version of the canvas...I think)kk

//mouse x and mouse y
var mx = -10;
var my = -10;

var old_mx = -10;
var old_my = -10;

//mouse right click and mouse left click
var mrc = false;
var mlc = false;

//mouse scroll (not sure about this one)
var ms = -1;

var g_key = -1; //key that was last hit. 

var g_direction = 0;//go up, down, left, right. 

var g_moved = false;//whether or not you moved. 

//a temporary measure used to say whether or not the user has immediate
//access to the item in question
var global_item = null; 

var gen_obj = null;

// var init_loc_on_screen = [100,50];
// var width_and_height_of_image_on_screen = [40,40];
// var image_name = "health_icon_1";
// var image_dimensions = [10,11,110,109];


// var gen_obj = new Gen_Obj(init_loc_on_screen,
// 						  width_and_height_of_image_on_screen,
// 						  image_name,
// 						  image_dimensions);


var th = null;


function print_2d_array(array){

	var tmp_string = '\n' + "[" + '\n';

	for(var x = 0; x < array.length; x++){

		tmp_string += "[";

		for(var y = 0; y < array[x].length; y++){

			//check 1
			var c1 = (y == array[x].length -1) ? "" : ",";

			var symbol = (array[y][x] == null) ? 'n' : array[y][x];

			//tmp_string += world[y][x] + c1;

			tmp_string += symbol + c1;

		}

		//check 2
		var c2 = (x == array.length -1) ? "]" : "],";

		tmp_string += c2 + '\n';
		
	}

	tmp_string += "];";

	console.log(tmp_string);

};
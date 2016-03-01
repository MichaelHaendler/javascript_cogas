

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
// var msx = -1;
// var msy = -1;

var ms = 0;

var g_key = -1; //key that was last hit. 

var g_direction = 0;//go up, down, left, right. 

var g_moved = false;//whether or not you moved. 

//a temporary measure used to say whether or not the user has immediate
//access to the item in question
var global_item = null; 

var gen_obj = null;

//terrain holder
var th = null;

//area holder
var ah = null;

var tcb = null;

//control base controller (for testing only, not actual part of game)
var cbc = null;


function print_2d_array(a){

	//console.log(a);

	//debugger;

	// console.log("(how many columns does this one 2d layer have?) a.length is: " + a.length);

	// console.log("(how many 'things' are in that one column?) a[0].length is: " + a[0].length);

	//console.log("a[0][0] is: " + a[0][0][2]);

	//console.log("getting in here?");

	var s = "[\n";

	//character array 
	var ca = [];

	//tracker x and tracker y

	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){


			if(ca[y] == null){
				ca[y] = [];
			}

			var tmp_sym = (a[x][y] == null) ? 'n' : a[x][y];

			ca[y][x] = (x == 0) ? ("[" + tmp_sym) : ("," + tmp_sym);

			if(x == a.length - 1){
				ca[y][x] = ("," + tmp_sym + "],\n");
			}

		}

	}

	for(var x = 0; x < ca.length; x++){

		for(var y = 0; y < ca[x].length; y++){
			s += ca[x][y];
		}
	}

	s = s.substring(0, s.length -2);

	s += "\n];";

	console.log(s);


};

function print_3d_array(three_d_array){

	//console.log("(how many layers) three_d_array.length is: " + three_d_array.length);

	console.log("printing 3d layers.");

	for(var two_d_plane in three_d_array){

		console.log("layer: " + two_d_plane);

		print_2d_array(three_d_array[two_d_plane]);

		console.log("-------------");

		//console.log('\n');



	}

	console.log("finished printing all layers");


};

// var a3 = [
// [1,2,3],
// [4,5,6],
// [7,8,9]

// ];

//1 4 7
//2 5 8
//3 6 9

//print_2d_array_v12(a3);







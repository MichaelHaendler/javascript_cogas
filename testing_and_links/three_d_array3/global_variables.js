

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

//terrain holder
var th = null;

//area holder
var ah = null;

function print_2d_array(array){

	array = remove_blank_spots(array);

	var tmp_string = '\n' + "[" + '\n';

	for(var x = 0; x < array.length; x++){

		tmp_string += "[";

		// console.log("array[" + x + "] is: ");
		// console.log(array[x]);

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

//returns a 2d array where, instead of either the rows or the columns starting at something
//like [4,0] or whatever, they automatically start at [0,0]
function remove_blank_spots(a){

	var new_array = [];

	for(x in a){

		var col = a[x];

		var new_col = [];

		for(y in col){
			new_col.push(col[y]);
		}

		new_array.push(new_col);

	}

	return new_array;

}

//not currently in use and has not been entirely debugged. 
function print_2d_array_v2(a){

	var s = "[\n";

	for(var num in a){

		//replace all the nulls with n.
		a[num] = a[num].map(function(val) {
    		return val == null ? 'n' : val;
		});

		//if this is the last row, just add a result closing bracket and a newline. 
		//otherwise, add a closing bracket, a command, and a newline. 
		s += "[" +  (a.indexOf(a[num]) == a.length - 1) ? (a[num] + "]\n") : (a[num] + "],\n");

	}

	s += "];";

	console.log(s);


};



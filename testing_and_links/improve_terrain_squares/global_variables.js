

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

function print_2d_array_old(array){

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
function print_2d_array(a){

	var s = "[\n";

	for(var num in a){

		//replace all the nulls with n.
		a[num] = a[num].map(function(val) {
    		return val == null ? 'n' : val;
		});

		//if this is the last row, just add a result closing bracket and a newline. 
		//otherwise, add a closing bracket, a command, and a newline. 
		//s += '[' +  ((a.indexOf(a[num]) == a.length - 1) ? (a[num] + "]\n") : (a[num] + "],\n")).substr(1);
		s += '[' +  ((a.indexOf(a[num]) == a.length - 1) ? (a[num] + "]\n") : (a[num] + "],\n"));

	}

	s += "];";

	console.log(s);


};


function print_3d_array(three_d_array){

	console.log("printing 3d layers.");

	for(var two_d_plane in three_d_array){

		console.log("layer: " + two_d_plane);

		print_2d_array_v2(three_d_array[two_d_plane]);

		console.log("-------------");

		//console.log('\n');



	}

	console.log("finished printing all layers");


};


function print_2d_array_v2(a){

	var s = "[\n";

	// for(var x in a){
	for(var x = 0; x < a.length; x++){

		s += "[";

		// for(var y in a[x]){
		for(var y = 0; y < a[x].length; y++){


			//replace any nulls with n.
			if(a[x][y] == null){
				a[x][y] = 'n';
			}

			s += a[x][y];
		
			//s += '[' +  ((y == a[x].length - 1) ? (a[num] + "]\n") : (a[num] + "],\n"));


		}

		s += "],\n";

	}

	s += "];";

	console.log(s);

	console.log("a[0][0] is: ")


};

// var l1 =[2,3,4];
// var l2 =[5,6,7];
// var l3 =[1,1,1];
// var l4 =[undefined,undefined,undefined];

// var x_a = [l1,l2,l3,l4];

// var z_a = [x_a];

// //select

// console.log("(z layer) z_a[0] is: " + z_a[0]);
// console.log("(x layer) z_a[0][0] is: " + z_a[0][0]);
// console.log("(x y selection) z_a[0][0][2] is: " + z_a[0][0][2]);

// print_3d_array(z_a);

//debugger 

/*
input should be: 

a = [
[1,2,3],
[4,5,6],
[7,8,9]
]

output should be: 

1 4 7
2 5 8
3 5 9

*/
function print_2d_array_v3(a){

	var s = "[\n";

	var y = 0;
	var x = 0;

	var testcount_max = 9;
	var curr_test_count = 0;

	while(x < a.length){

		// console.log("x is: " + x);
		// console.log("y is: " + y);
		// console.log("a[x].length is: " + a[x].length);
		// console.log("-------------");

		//s += "[";


		//replace any nulls with n.
		if(a[x][y] == null){
			a[x][y] = 'n';
		}

		//s += a[x][y];
	
		//s += '[' +  ((y == a[x].length - 1) ? (a[num] + "]\n") : (a[num] + "],\n")) 

		//s += "]\n";

		if(y == 0){
			s += "[" + a[y][x];
		}
		else{
			s += "," + a[y][x];
		}

		if(y < a[x].length){
			y++;
		}

		//else{
		if(y == a[x].length){

			s += "]\n";
			//else y == a[x].length - 1
			y = 0;
			x++; //the loop will stop when x == a.length
		}

		// if(curr_test_count == testcount_max){
		// 	console.log("bad results: ");
		// 	console.log(s);
		// 	break;
		// }

		curr_test_count++;	

	}//end of while loop 

	s += "];";

	console.log(s);

	//console.log("a[0][0] is: ")

};

function print_2d_array_v4(a){

	var s = "[\n";

	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			if(y == 0){
				s += "[" + a[y][x];
			}
			else{
				console.log("y is: " + y);
				console.log("x is: " + x);
				console.log("a["+y+"]["+x+"] is: " + a[y][x]);

				s += "," + a[y][x];
			}

			if(y == a[x].length - 1){
				s += "]\n";
			}

		} 

	}

	s += "];";

	console.log(s);

};




//"123"
//b = b.slice(0,1) + "w" + b.slice(2,3);

function print_2d_array_v5(a){

	//var s = "[\n"; //+ generate_size(a); 
	var s = "";

	var x_width = a.length;
	var y_width = a[0].length;
	//console.log("y_width is: " + y_width);

	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			if(a[x] != null){

				var loc = (y * y_width) + x;

				var symbol = (a[x][y] == null) ? 'n' : a[x][y];

				symbol = (y == 0) ? ('N' + symbol) : symbol;

				// console.log("symbol is: " + symbol);
				// console.log("loc is: " + loc);

				s = append_at_loc(s,loc,symbol);

			}

			//console.log("y is: " + y);
		}

		// console.log("x is: " + x);
		// console.log("===");
	}

	//s += "\n]";

	console.log("final results are: ");
	console.log(s);
	// console.log("s.length is: " + s.length);

};




function append_at_loc(s,loc,sym){

	//console.log("s is: \n" + s);

	if(loc > s.length){

		//find difference
		var diff = loc - s.length;

		//append additional space (last space will be the sym itself)
		for(var num = 0; num < diff; num++){
			s += "-";
		}
	}

	var start1 = 0;
	var start2 = loc - 1;
	var end1 = loc;
	var end2 = s.length;

	//console.log("before: \n" + s);

	// console.log("start1 is: " + start1);
	// console.log("start2 is: " + start2);
	// console.log("end1 is: " + end1);
	// console.log("end2 is: " + end2);

	s = s.slice(start1,start2) + sym + s.slice(end1,end2);

	console.log("loc is: " + loc);
	console.log("sym is: '" + sym + "'");
	console.log("after: \n" + s);

	// console.log("-----");
	

	return s;

}

function generate_size(a){

	var s = "";

	var x_size = a.length;

	var y_size = a[0].length;

	var size = x_size * y_size;

	for(var n = 0; n < size; n++){
		s += " ";
	}

	console.log("s.length is: " + s.length);

	return s;
}


// var a = [
// [1,2],
// [4,5],
// [7,8]
// ];

var a = [
[1,2,3],
[4,5,6],
[7,8,9]
];

// var a = [
// [1,2,3],
// [4,5,6]
// ];

//print_2d_array_v5(a);


// var s = "12345";

// s = s.slice(0,2) + "w" + s.slice(3,s.length);


function blah(){

var a = [
[1,2,3],
[4,5,6]
];

// [
// [1,4]
// [2,5]
// [3,6]
// ]

var y = 0;//stay in same row
var x = 1;//walk over 1
var y_width = 3;

var val1 = (y * y_width);

var val2 = val1 + x;

var s = "123456";


}
//blah();

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


//tda == two d array
function print_2d_array_v6(tda){

	var array = [];

	var s = "[\n";

	var tmp_s = "";

	//then add the elements to their proper place
	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			if(array[y] == null){
				array[y] = [];
			}

			if(tda[x] != null && tda[x][y] != null){
				array[y][x] = tda[x][y];
				//console.log("array["+y+"] is: " + array[y]);
			}

		}
	}	

	//then combine all the strings together 
	for(var x = 0; x < a.length; x++){

		tmp_s = "";

		for(var y = 0; y < a[x].length; y++){

			if(array[x] != null && array[x][y] != null){

				tmp_s += (y == a[x].length - 1) ? array[x][y] : (array[x][y] + ",");
			}

		}

		if(tmp_s.length > 0){

			s += ("[" + tmp_s + "],\n");
		}
	}

	//remove the last comma
	s = s.substring(0, s.length - 2);

	//add back in the newline character, and add the final closing bracket. 
	s += "\n];";

	console.log(s);

}


// var a2 = [
// [1,2,3],
// [4,5,6],
// [7,8,9]
// ]

// var a2 = [
// [1,2,3],
// [4,5,6],
// [7,8,9]
// ]

var a2 = [
[1,2,3],
[4,5,6]
]

// var a2 = [
// [1,2],
// [4,5],
// [7,8]
// ]

//THE WORKING VERSION!!
//print_2d_array_v6(a2);



function print_2d_array_v7(tda){

	var s = "";

	var w = a[0].length;

	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			var loc = (y * w) + x;
			//var loc = (x * w) + y;

			var char = tda[x][y];

			s = add_char_to_string(loc,char,s);

		}

	}

	// console.log(s);
	// console.log("s.length is: " + s.length);
};

//use array instead of string. might go easier (even though you will need a loop afterwards)

function add_char_to_string(loc,char,s){

	// console.log("loc is: " + loc);
	// console.log("char is: '" + char + "'");
	// console.log("----");

	if(char == 3 || char == 5){
		console.log("before: ");
		console.log(s);
	}

	s = s.substr(0, loc) + char + s.substr(loc);

	if(char == 3 || char == 5){
		console.log("after: ");
		console.log(s);
	}

	return s;
}

//1 0
//2 

//right
//147
//258
//369

//wrong (but close)
// 147
// 238
// 569

//1: 0
//2: 3
//3: 6 ---
//4: 1
//5: 4 ---
//6: 7
//7: 2
//8: 5
//9: 8

//w == 3

//1: (0 * 3) + 0 == 0 
//2: (0 * 3) + 1 == 1
//3: (0 * 3) + 2 == 2
//4: (1 * 3) + 0 == 3
//

// var a2 = [
// [1,2,3],
// [4,5,6],
// [7,8,9]
// ]

// print_2d_array_v7(a2);

function r_char_at(s,char,loc){

	return s.slice(0,loc) + char + s.slice(loc + 1);
};

function insert_char_into_string(s,char,loc){

	if(loc > s.length){

		var diff = loc - s.length;

		for(var num = 0; num <= diff; num++){
			s += "-";
		}
	}

	return r_char_at(s,char,loc);

};


function print_2d_array_v8(a){

	var s = "";

	var w = a[0].length


	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			var char = a[x][y];

			var loc = (y * w) + x;

			s = insert_char_into_string(s,char,loc);

		}
		

	}

	console.log(s);
};


// var a = [
// [1,2,3],
// [4,5,6],
// [7,8,9]
// ];

// print_2d_array_v8(a);



function print_2d_array_v9(tda){

	var array = [];

	var s = "[\n";

	var tmp_s = "";

	//add the elements to their proper place
	for(var x = 0; x < a.length; x++){

		for(var y = 0; y < a[x].length; y++){

			if(array[y] == null){
				array[y] = "";
			}

			// if(tda[x] != null && tda[x][y] != null){
			// 	//append a comma to the front if it's not the first element. 
			// 	array[y] += (x == 0) ? tda[x][y] : ("," + tda[x][y]);
			// }


			if(tda[x] != null){


				if(tda[x][y] == null){
					tda[x][y] = 'n';
				}

				//append a comma to the front if it's not the first element. 
				array[y] += (x == 0) ? tda[x][y] : ("," + tda[x][y]);

			}

		}
	}	

	for(var i in array){

		//end addition. thing to be appended at the end.
		var end_add = (i == array.length - 1) ? "]\n" : "],\n";

		s += "[" + array[i] + end_add;
	}

	s += "]";

	console.log(s);

}

// var a = [
// [1,2,3],
// [4,5,6],
// [7,8,9]
// ];

// var a = [
// [1,2,3],
// [4,5,6],
// ];

// var a = [
// [1,2],
// [4,5],
// [7,8]
// ];

// var a = [
// [1],
// [4],
// [7]
// ];

// print_2d_array_v9(a);


function print_2d_array_v10(a){

	//debugger;

	console.log("a[0][0] is: " + (typeof a[0][0] === 'object'));

	var s = "[\n";

	for(var x = 0; x < a.length; x++){

		s += "[";

		for(var y = 0; y < a[x].length; y++){

			var val = a[x][y];

			val = (val == null) ? 'n' : val;

			val = (y == 0) ? val : ("," + val);
			
			s +=  val;

		}

		s +=  (x == a.length - 1) ? "]\n" : "],\n";

	}

	s += "];";

	console.log(s);


};


function print_2d_array_v11(a){

	var s = "";

	//string array 
	var sa = [];
	
	//first overall opening bracket 
	//sa.append("[\n");

	for(var x = 0; x < a.length; x++){

		//opening bracket for the row 
		//sa.append("[");

		for(var y = 0; y < a[x].length; y++){

			var val = a[x][y];

			val = (val == null) ? 'n' : val;

			val = (x == 0) ? val : ("," + val);

			if(sa[y] == null){
				sa[y] = "[";
			}

			//inadventent humor. 
			sa[y] += val;

			if(y == a.length - 1){

				if(x == a.length - 1){
					sa[y] += "]\n"
				}
				else{
					sa[y] += "],\n"
				}	

			}

		}

	}

	//s += "];";
	//sa.append("]");

	for(var i in sa){
		s += sa[i];
	}

	s = "[\n" + s + "]";

	console.log(s);


};


function print_2d_array_v12(a){

	console.log("a[0][0] is: " + a[0][0][2]);

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

var a3 = [
[1,2,3],
[4,5,6],
[7,8,9]

];

//1 4 7
//2 5 8
//3 6 9

//print_2d_array_v12(a3);









function print_2d_array(array){

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

////////////////////////////////////////////////////////


/*
function mini_print_2d_array(input_array){

	var array = move_elements_up(input_array);

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


function move_2d_array_elements_up(array){

	//move x up. 
	array = move_x_up(array);

	array = move_y_up(array);

	return array;

}

function move_x_up(array){

	var tmp_array = [];

	var count = 0;

	for(var el in array){

	}


}

function blah(array){

	var tmp_array_x = [];

	//x is a row, y is a column. 
	//take a column. 
	for(var column in array){

		 var tmp_array_y = [];

		 //then take each element from the column, and push it to the front
		 //of the array. 
		for(var el in column){
			tmp_array_y.push(el);
		}

		tmp_array_x


	}
}
*/
function mini_print_2d_array(array){

	var tmp_string = '\n' + "[" + '\n';

	for(var col in array){

		tmp_string += "[";

		// console.log("array[" + x + "] is: ");
		// console.log(array[x]);

			for(var el in col){

				//check 1
				var c1 = (col.indexOf(el) == col.length -1) ? "" : ",";

				var symbol = (el == null) ? 'n' : el;

				//tmp_string += world[y][x] + c1;

				tmp_string += symbol + c1;

			}

			//check 2
			var c2 = (array.indexOf(col) == array.length -1) ? "]" : "],";

			tmp_string += c2 + '\n';
	}

	tmp_string += "];";

	console.log(tmp_string);

};


function print_2d_array_v2(array){

	var tmp_string = '\n' + "[" + '\n';

	console.log("array[1][0] is: " + array[1][0]);
	console.log("array[1][1] is: " + array[1][1]);
	console.log("array[1][2] is: " + array[1][2]);

	
	for(var x in array){

		tmp_string += "[";


		console.log("x is: " + x);

		for(var y in array[x]){

			// console.log("y is: " + y);
			// console.log("array["+x+"] is: " + array[x]);

			//check 1
			var c1 = (y == array[x].length -1) ? "" : ",";

			//var symbol = (array[y][x] == null) ? 'n' : array[y][x];
			var symbol = (array[x][y] == null) ? 'n' : array[x][y];

			console.log("array["+x+"]["+y+"] is: " + array[x][y]);

			//tmp_string += world[y][x] + c1;

			tmp_string += symbol + c1;

		}

		break;

		//check 2
		var c2 = (x == array.length -1) ? "]" : "],";

		tmp_string += c2 + '\n';

		
		
	}
	

	tmp_string += "];";

	//console.log(tmp_string);

};

function convert_to_normal_array(array){

	var tmp_array = [];

	var other_x = 0;
	
	//x is a row, y is a column. 
	//take a column. 
	for(var x in array){

		tmp_array[other_x] = [];

		var other_y = 0;

		 //then take each element from the column, and push it to the front
		 //of the array. 
		for(var y in array[x]){
			tmp_array[other_x][other_y]] = array[x][y];

			other_y++;
		}
		
		other_x++;
	}

	console.log(tmp_array);

	return tmp_array;
}

function print_mini_2d_array(array){

	var normalized_array = convert_to_normal_array(array);

	print_2d_array_v2(normalized_array);

};

//get length of x

//have a while 

function blah(){

	var a = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
	];

	print_2d_array_v3(a);

	function print_2d_array_v3(array){

		// console.log("array was:");
		// console.log(array);

		//get its length
		var x_length = array.length;

		//get its length
		var y_length = get_column_length(array);

		// console.log("array now is:");
		// console.log(array);

		var loc_x = 0;

		var loc_y = 0;

		var string = "[\n";

		while(array.length != 0){

			//get first row
			var column = array.shift();

			//if the column length is greater than 0, do all the normal stuff, including
			//putting the column back onto the array. otherwise, just go to the next column
			//in the array (forgoing pushing the empty column back onto the array)
			if(loc_x < x_length){

				//get current element for that row
				var row_el = column[loc_y];

				console.log("row_el is: " + row_el);
				console.log("loc_x is: " + loc_x);
				console.log("loc_y is: " + loc_y);
				console.log("--");

				//if first element include front bracket. otherwise, nothing. 
				var symbol1 = (loc_y == 0 ) ? "[" : "";

				//if last element, include closing braket. otherwise, just a comman
				var symbol2 = (loc_y == y_length -1 ) ? "]\n" : ",";

				//add to string
				string += symbol1 + row_el + symbol2;

				array.push(column);


				loc_x++;
				
				// //if you've now gotten through the entire array
				// if(loc_x == x_length -1){
				// 	//go up one position 
					
				// 	//and set this back so that we're now going through the whole thing again.
				// 	loc_x = 0;
				// }else{
				// 	loc_x++;
				// }

			}
			else{
				loc_x = 0;
				loc_y++;
			}

		}

		string += "\n];";

		console.log(string);


	};


function get_column_length(a){

	if(a.length != 0){

		// column = a.shift();

		// console.log("a is: ");
		// console.log(a);

		// return column.length;

		for(var num in a){
			return a[num].length;
		}

	}
	else{
		return -1;
	}

}

};

blah();

//THE NEW GOOD ONE
function zoom(a){

	var s = "[\n";

	for(var num in a){

		// console.log("before a[num] was: ");
		// console.log(a[num]);

		//a[num] = a[num].map(function(val, i) {
		a[num] = a[num].map(function(val) {
    		return val == null ? 'n' : val;
		});

		// console.log("AFTERWARDS a[num] was: ");
		// console.log(a[num]);

		var closing_bracket = (a.indexOf(a[num]) == a.length - 1) ? "]\n" : "],\n";

		s += "[" + a[num] + closing_bracket;

	}

	s += "];";

	console.log(s);


};



function test(){

	console.log("equal x and y");
	var a1 = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
	];

	zoom(a1);

	console.log("more x than y");
	var a2 = [
	[1,2,3],
	[4,5,6],
	];

	zoom(a2);

	console.log("more y than x");
	var a3 = [
	[1,2],
	[4,5],
	[7,8]
	];

	zoom(a3);

	//////

	console.log("NULL equal x and y");
	var a1 = [
	[1,2,3],
	[4,null,6],
	[7,8,9]
	];

	zoom(a1);

	console.log("NULL more x than y");
	var a2 = [
	[null,2,3],
	[4,5,null],
	];

	zoom(a2);

	console.log("NULL more y than x");
	var a3 = [
	[1,2],
	[4,5],
	[null,null]
	];

	zoom(a3);

	console.log("ALL NULL");
	var a3 = [
	[null,null],
	[null,null],
	[null,null]
	];

	zoom(a3);

}

test();




//var a = ["up/down","left/right","diagonally"];

//var a = ["up/down","left/right"];

//char_b_w is the width of the base of the character 
//important: assuming that this is just a regular width (likew is 35 or something).
function Char_Base_Controller(char_w,char_l,directions){

	//number of terrain blocks wide (x axis)
	var tmp_w = Math.round(char_w / Terrain_Block.w);

	//number of terrain blocks long (y axis)
	var tmp_l = Math.round(char_l / Terrain_Block.l);

	//making sure that it is at least 1. 
	tmp_l = (tmp_l <= 0) ? 1 : tmp_l;

	//char base length, aka number of angles. 
	this.cbl = Char_Base.num_of_angles;

	//char base array 
	this.cba = [];

	// console.log("tmp_w is: " + tmp_w);

	// console.log("tmp_l is: " + tmp_l);

	this.build_char_base_array(tmp_w,tmp_l,directions);

	//arbitrary initial values that simply aren't on the canvas
	this.mlc_x = -20;
	this.mlc_x = -20;

	this.color = "black";

};


//var a = ["up/down","left/right","diagonally"];

// Char_Base_Controller.prototype.remove_unneeded_directions = function(directions){

// 	var tmp_cba = [] 

// 	for(var string of directions){

// 		if(string == "up/down"){
// 			tmp_cba
// 		}

// 	}

// 	this.cba = tmp_cba;

// };


//var a = ["up/down","left/right","diagonally"];
Char_Base_Controller.prototype.build_char_base_array = function(tmp_w,tmp_l,directions){

	for(var element of directions){

		if( element == Char_Base.h ||
			element == "horizontal" ||
			element == "up/down" || 
			element == Char_Base.horizontal){

			//console.log("horizontal");

			var num = Char_Base.horizontal;

			
			// console.log("tmp_w is: " + tmp_w);
			// console.log("tmp_l is: " + tmp_l);
			// console.log("num is: " + num);

			this.cba[num] = new Char_Base(tmp_w,tmp_l,num);

			//this.cba[num].test();
		}
		else if(element == Char_Base.v ||
				element == "vertical" || 
				element == "left/right" || 
				element == Char_Base.vertical){

			//console.log("vertical");

			var num = Char_Base.vertical;

			this.cba[num] = new Char_Base(tmp_w,tmp_l,num);
		}
		else if(element == Char_Base.d ||
				element == "diag" ||
				element == "diagonally" || 
				element == Char_Base.diag1 || 
				element == Char_Base.diag2){

			//console.log("getting into here??");

			var num1 = Char_Base.diag1;
			this.cba[num1] = new Char_Base(tmp_w,tmp_l,num1);

			var num2 = Char_Base.diag2;
			this.cba[num2] = new Char_Base(tmp_w,tmp_l,num2);
		}


	}


	// for(var x = 0; x < this.cbl; x++){
	// 		//each char base needs to be a different angle
	// 		this.cba[x] = new Char_Base(tmp_w,tmp_l,x);
	// }

};

// Char_Base_Controller.prototype.build_char_base_array = function(tmp_w,tmp_l,directions){


// 	for(var x = 0; x < this.cbl; x++){
// 			//each char base needs to be a different angle
// 			this.cba[x] = new Char_Base(tmp_w,tmp_l,x);
// 	}

// };

Char_Base_Controller.prototype.draw_ssi_w_ascii_map = function(three_d_ascii_map){

	//if a click, update all of the locations. 
	if(mlc){

		//con of this is that any time there is a click every single angle
		//gets updated (not entirely necessary)
		//pro: once updated, no updates are done so long as no more clicks happen
		//(though they obviously and thankfully will)
		//console.log("this.cba.length is: " + this.cba.length);
		//debugger;

		// for(var num = 0; num < this.cba.length; num++){
		// 	this.cba[num].set_orientation_and_position(mx,my);
		// }

		for(var cbo of this.cba){
			//if(cbo != null){
			cbo.set_orientation_and_position(mx,my);
			//}
		}

		//console.log("------");
	}

	//regardless, get the location in the cba (array) of which angle to display. 
	var print_num = this.calc_loc();

	pw.print("print_num is: " + print_num);

	//char base object
	var cbo = this.cba[print_num];

	if(three_d_ascii_map != null){
		this.acceptable_spot(cbo,three_d_ascii_map);
	}

	//and display it. 
	//cbo.draw_ssi();
	cbo.draw_ssi_with_given_color(this.color);


};

//uses the current value of the scroller to say which graphic in the char_base_controller
//array to access (and display)
Char_Base_Controller.prototype.calc_loc = function(){

	//var length = this.cbl;

	var length = this.cba.length;

	//var actual_val = null; 

	if(ms < 0){

		//turns a negative number positive
		var tmp_pos_num = ms * -1;

		var mod = tmp_pos_num % length;

		//the "-1" is because otherwise it will go outside the bounds
		//at times (as well as never get to the zero spot in the array)
		var array_loc = length - mod - 1;

		//actual_val = this.confirm_location(array_loc);
		return array_loc;
	}
	else{

		//var calculation = (ms % length);

		//actual_val = this.confirm_location(calculation);

		return ms % length;
	}


	//return actual_val;

};

Char_Base_Controller.prototype.check_spot = function(cbo,ascii_map){

	//get location of currently selected one
	//var print_num = this.calc_loc();

	//get selected one. 
	//var cbo = this.cba[print_num];

	//print_2d_array(ascii_map);

	//console.log("cbo.tba.length is: " + cbo.tba.length);

	//iterate through the tb's associated with that particular char_base instance
	// for(var tb of cbo.tba){

	// 	console.log(tb);

	// 	//get said tb's x and y values
	// 	var tmp_x = tb.x;
	// 	var tmp_y = tb.y;
	// 	// console.log(tb);
	// 	console.log("tmp_x is: " + tmp_x);
	// 	console.log("tmp_y is: " + tmp_y);

	// 	//get the tb from the ascii map that the tb that we're looking at at the
	// 	//moment is directly ontop of 
	// 	tmp_tb = ascii_map[tmp_x][tmp_y];

	// 	//if it is a type that cannot be walked on, return false (bad spot)
	// 	if(tmp_tb.type == Terrain_Block.cannot_walk){
	// 		return false;
	// 	}
	// }

	//for(var tb of cbo.tba){
	for(var x = 0; x < cbo.tba.length; x++){

		var tmp_tba = cbo.tba[x];

		for(var y = 0; y < tmp_tba.length; y++){

			var tmp_tb = tmp_tba[y];

			// console.log("tmp_tb is: ");
			// console.log(tmp_tb);

			//get said tb's x and y values
			var tmp_x = tmp_tb.tb_count_across_x_axis();
			var tmp_y = tmp_tb.tb_count_down_y_axis();
			// console.log(tb);
			//console.log("tmp_x is: " + tmp_x);
			// console.log("tmp_y is: " + tmp_y);

			//get the tb from the ascii map that the tb that we're looking at at the
			//moment is directly ontop of 

			//if it is null (meaning a none walkable area...any potentially walkable
			//area needs to be of type terrain_block)

			if(ascii_map[tmp_x] == null || ascii_map[tmp_x][tmp_y] == null){

				//return false;
				return true;
			}
			else{

				var tb_type = ascii_map[tmp_x][tmp_y];

				// if(tb_type == 1){
				// 	console.log("see a 1");
				// }

				// pw.print("tmp_x is: " + tmp_x);
				// pw.print("tmp_y is: " + tmp_y);

				// pw.print("ascii_map[5][7] is: " + ascii_map[5][7]);
				// debugger;

				if(tb_type == Terrain_Block.cannot_walk){
					return false;
				}
				// else{
				// 	return true;
				// }

			}

		}

	}

	//console.log("--------");

	//otherwise, return true (good spot!)
	return true;

}

Char_Base_Controller.prototype.acceptable_spot = function(cbo,ascii_map){

	//print_2d_array(ascii_map);

	var okay_spot = this.check_spot(cbo,ascii_map);

	pw.print("okay spot is: " + okay_spot);

	if(okay_spot){
		//this.color = "green";
		this.color = "black";
	}
	else{
		this.color = "red";
	}

};

//need to change this so that it simply goes to the next viable one. 
Char_Base_Controller.prototype.confirm_location = function(array_loc){

	if(this.cba[array_loc] != null){
		return array_loc;
	}
	//DOES equal to null 
	else{

		var left_val = null;
		var right_val = null; 

		//get left val
		for(var left_loc = array_loc; left_loc >= 0; left_loc--){

			if(this.cba[left_loc] != null){
				left_val = left_loc;
				break;
			}
		}

		//get right val
		for(var right_loc = array_loc; right_loc < this.cba.length; right_loc++){

			if(this.cba[right_loc] != null){
				right_val = right_loc;
				break;
			}
		}

		//calc which is closer 

		if(make_positive(array_loc - left_val) <= make_positive(array_loc -right_val)){

		}

		//use that one. 

	}

};


// function make_positive(num){
// 	return (num < 0) ? (num * -1) : num;
// };



// Char_Base_Controller.prototype.calc_loc = function(){

// 	var length = 4;

// 	if(ms < 0){
// 		var tmp_pos_num = ms * -1;

// 		var mod = tmp_pos_num % length;

// 		//the "-1" is because otherwise it will go outside the bounds
// 		//at times (as well as never get to the zero spot in the array)
// 		var array_loc = length - mod - 1;

// 		return array_loc;

// 	}
// 	else{

// 		return ms % length;
// 	}

// };

/*
so...I have this basically implementated. 


*/




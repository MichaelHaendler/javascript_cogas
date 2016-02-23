

//char_b_w is the width of the base of the character 
//important: assuming that this is just a regular width (likew is 35 or something).
function Char_Base_Controller(char_w,char_l){

	//these are variables because I dont think that I need to save them. 
	var tmp_w = Math.round(char_w / Terrain_Block.w);

	var tmp_l = Math.round(char_l / Terrain_Block.l);

	//making sure that it is at least 1. 
	tmp_l = (tmp_l <= 0) ? 1 : tmp_l;

	//char base length, aka number of angles. 
	this.cbl = Char_Base.num_of_angles;

	//char base array 
	this.cba = [];

	this.build_char_base_array(tmp_w,tmp_l);

	//arbitrary initial values that simply aren't on the canvas
	this.mlc_x = -20;
	this.mlc_x = -20;

};

Char_Base_Controller.prototype.build_char_base_array = function(tmp_w,tmp_l){


	for(var x = 0; x < this.cbl; x++){
			//each char base needs to be a different angle
			this.cba[x] = new Char_Base(tmp_w,tmp_l,x);
	}

};

Char_Base_Controller.prototype.draw_ssi = function(){

	//which angle to display. 
	var print_num = this.calc_loc();

	if(mlc){
		this.mlc_x = mx;
		this.mlc_y = my;
	}

	//get char_base obj
	var cbo = this.cba[print_num];

	//draw it with new x and y vals
	cbo.set_orientation_and_position(this.mlc_x,this.mlc_y);

	cbo.draw_ssi();

	//display that angle. 
	//this.cba[print_num].draw_ssi();
};


Char_Base_Controller.prototype.calc_loc = function(){

	var length = this.cbl;

	if(ms < 0){
		var tmp_pos_num = ms * -1;

		var mod = tmp_pos_num % length;

		//the "-1" is because otherwise it will go outside the bounds
		//at times (as well as never get to the zero spot in the array)
		var array_loc = length - mod - 1;

		return array_loc;

	}
	else{

		return ms % length;
	}

};


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






//tb_c_w == terr block count width, aka how many terrain blocks wide (x axis)
//is this character at his/her base. 

//tb_c_l == terr block count length, aka how many terrain blocks length wise (y axis)
//is this character at his/her base. 


//static because I dont need unique instances of them. no other reason though. wont
//be used any other place. 
Char_Base.cannot_walk = "red";

Char_Base.can_walk = "green"

Char_Base.holding_down_left_click = "blue";

function Char_Base(x,y,z,tb_c_w,tb_c_l,){

	//will always be 1 (or at least I think so)
	this.block_type = 1;

	this.x = x;

	this.y = y;

	this.z = z;

	this.w = tb_c_w;

	//should be at least 1. 
	this.l = (tb_c_l <= 0) ? 1 : tb_c_l; 

	//terrain block array
	this.tba = [];

	for(var numx = 0; numx < this.w; numx++){

		this.tba[numx] = [];

		for(var numy = 0; numy < this.l; numy++){

			//Terrain_Block(z,x,y,block_type){
			this.tba[numx][numy] = new Terrain_Block(this.z,0,0,this.block_type);
		}
	}

	//if w was 7 then ml would be 3. 0,1,2 to the left. 4,5,6 to the right. 

	//if w was 6, then ml would (also) be 3. however you would have 0,1,2 to the
	//left and 4,5 to the right. 

	//if w was 2, then ml would be 1. 0 to the left, and nothing to the right. 

	//if w was 1, then the results would be 0 (due to newly incorproated if statement)

	//center_array == the part of the array that we are calling the middle of the array. 
	//when the mouse moves, that selected spot is the middle. 

	//center_amount == is just the actual amount (num of pixels) from the start location
	//in the array to what we are calling the center/middle of the array. 

	this.center_array = 0;

	if(this.w == 1){
		this.center_array = 0;
	}
	else{
		this.center_array = Math.round(this.w / 2);	
	}


	//this.center_amount = this.center_array * Terrain_Block.w;

	//horizontal or not. if false then it's veritcle.  
	this.adj_horizontally = true;

	//default value that should never actually happen. 
	this.color = "black";
	

};


//instead of drawing a square, we will draw the bare minimal one, with the arrows. 
//will use the scroller on the mouse to shift it. 

Char_Base.prototype.get_tba = function(){

	return this.tba;
};

//ah_ascii_tba stands for area holder ascii terr block array. 
Char_Base.prototype.can_stand_there = function(ah_ascii_tba){

	var tf = null;

	if(this.horizontal){(
		this.adj_horizontally();
	}
	//vertically 
	else{
		this.adj_vert();
	}

	//now check to see if any of the tb's are ontop of a 1. 
	//if yes, turn red (cant stand there). if no, turn 
	//yellow (character CAN stand there). :-) 
	if(this.tb_in_tba_ontop_of_a_one(ah_ascii_tba)){
		//this.change_tb_color(Char_Base.cannot_walk);
		this.color = Char_Base.cannot_walk;
		return false;
	}
	else{
		//this.change_tb_color(Char_Base.can_walk));
		this.color = Char_Base.can_walk;
		return true;
	}

};


Char_Base.prototype.tb_in_tba_ontop_of_a_one = function(ah_ascii_tba){ 

	//check the 3 (or whatever it is) different locations that represent
	//the characters potential base (potential since we're checking potential
	//locations for where the character might be standing next). 
	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			var tmp_x = this.tba[numx][numy].x;
			var tmp_y = this.tba[numx][numy].y;

			if(ah_ascii_tba[tmp_x] != null && 
				ah_ascii_tba[tmp_x][tmp_y] != null &&
				ah_ascii_tba[tmp_x][tmp_y] == Terrain_Block.cannot_walk){
				return true;
			}

		}

	}


	return false;
};


//change the color of ALL of the tb's. 
// Char_Base.prototype.change_tb_color = function(color){

// 	for(var numx = 0; numx < this.tba.length; numx++){

// 		for(var numy = 0; numy < this.tba[numx].length; numy++){

// 			this.tba[numx][numy].color = color;

// 		}

// 	}

// };


Char_Base.prototype.adj_horizontally = function(){

	//center_amount == is just the actual amount (num of pixels) from the start location
	//in the array to what we are calling the center/middle of the array. (is calcualted
	//in the method rather than the constructor so that I can use Terrain_Block.h when doing
	//the verticle calculation).

	var center_amount = this.center_array * Terrain_Block.w;

	//this gets us which tb we're currently hovering over. 
	var curr_tb_x = Math.round(mx/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(my/Terrain_Block.l) * Terrain_Block.l;

	//take the current x location (aka curr_tb_x) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	var curr_tb_x_adj = curr_tb_x - center_amount;

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			this.tba[numx][numy].y = curr_tb_y;

			var x_incr = i * Terrain_Block.w;

			this.tba[numx][numy].x = curr_tb_x_adj + x_incr;


		}
	}
};


Char_Base.prototype.adj_vert = function(){

	//center_amount == is just the actual amount (num of pixels) from the start location
	//in the array to what we are calling the center/middle of the array. (is calcualted
	//in the method rather than the constructor so that I can use Terrain_Block.h when doing
	//the verticle calculation).

	//with this...lets say center_array was 3. and length is 10. so the center of the
	//array is 30 pixels in. 
	var center_amount = this.center_array * Terrain_Block.l;

	//this gets us which tb we're currently hovering over. 
	var curr_tb_x = Math.round(mx/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(my/Terrain_Block.l) * Terrain_Block.l;

	//take the current x location (aka curr_tb_x) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	var curr_tb_y_adj = curr_tb_y - center_amount;

	//set their x and y values so that the boxes be displayed ontop of
	//each other (aka vertically)
	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			this.tba[numx][numy].x = curr_tb_x;

			var y_incr = i * Terrain_Block.l;

			this.tba[numx][numy].y = curr_tb_y_adj + y_incr;


		}
	}
};


//the reason that I made the draw_tb_with_provided_color() method 
//is because I dont want to have to be constantly re-setting the colors
//for tb's associated with a char_base instance. 
Char_Base.prototype.draw_ssi = function(){

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			var tmp_tb = this.tba[numx][numy];

			tmp_tb.draw_tb_with_provided_color(this.color);

		}

	}

	ctx.strokeStyle = prev_color;


};

//var center_amount = this.center_array * Terrain_Block.h;

//  _
// |_| 
// |_|	(right)
// |_| ------>


// 		   _
// (left) |_|
// <----- |_|
// 	      |_|


//    ^ 
//    | (up)
//  _ _ _
// |_|_|_|


//  _ _ _
// |_|_|_|
//
//    | (down)
//    v

function calc_loc(len){

	//the "* -1" part is to turn the results positive if they're negative
	return (0 > ms) ? ((ms % len) * -1) : (ms % len);

};






//tb_c_w == terr block count width, aka how many terrain blocks wide (x axis)
//is this character at his/her base. 

//tb_c_l == terr block count length, aka how many terrain blocks length wise (y axis)
//is this character at his/her base. 


//static because I dont need unique instances of them. no other reason though. wont
//be used any other place. 
Char_Base.cannot_walk = "red";

Char_Base.can_walk = "green"

Char_Base.holding_down_left_click = "blue";

//have these to help with consistency when referring
//to the values in the switch statement values (0,1,2,3) while
//in Char_Base_Controller. 
Char_Base.horizontal = 0;
Char_Base.diag1 = 1;
Char_Base.vertical = 2;
Char_Base.diag2 = 3;


Char_Base.h = "h";
Char_Base.d = "d";
Char_Base.v = "v";

//horizontal
//verticle
//diagonal going from upper right to lower left
//diagonal going from upper left to lower right
Char_Base.num_of_angles = 4;

//tb_c_w == terr block count wide. 
//function Char_Base(z,x,y,tb_c_w,tb_c_l){
function Char_Base(tb_c_w,tb_c_l,which_a){

	//will be used to determine whether to use horizontal, verticle,
	//or which diagonal. 
	this.which_angle = which_a;

	//will always be 1 (how can you walk through a persons feet? Or
	//the base of a car?)
	this.block_type = 1;

	// this.x = x;

	// this.y = y;

	// this.z = z;

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

			// console.log("2 this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// console.log("2 this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);
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
		this.center_array = Math.floor(this.w / 2);	
	}

	this.center_amount_h = this.center_array * Terrain_Block.w;

	this.center_amount_l = this.center_array * Terrain_Block.l;


	//this.center_amount = this.center_array * Terrain_Block.w;

	//horizontal or not. if false then it's veritcle.  
	this.horizontal = true;

	//default value that should never actually happen. 
	this.color = "black";
	//this.color = "yellow";
	
	this.length = this.tba.length;

	//for testing only
	//this.set_horizontally();

	//this.set_vertically();

	//this.set_diagonally_ll_and_ur();

	//this.set_diagonally_ul_and_lr();

	//arbitrary initial values that simply aren't on the canvas
	// this.mlc_x = -20;
	// this.mlc_y = -20;

	this.old_mlc_x = -20;
	this.old_mlc_y = -20;

};


//instead of drawing a square, we will draw the bare minimal one, with the arrows. 
//will use the scroller on the mouse to shift it. 

Char_Base.prototype.get_tba = function(){

	return this.tba;
};

//ah_ascii_tba stands for area holder ascii terr block array. 

//simply checks if the current location/position of the char_base
//falls on an area that cannot be otherwise walked on. 
Char_Base.prototype.can_stand_there = function(ah_ascii_tba){

	// var tf = null;

	// if(this.horizontal){
	// 	this.adj_horizontally();
	// }
	// //vertically 
	// else{
	// 	this.adj_vert();
	// }

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


Char_Base.prototype.set_horizontally = function(mlc_x,mlc_y){

	//console.log("(set_horizontally)");

	//console.log("zoomy");

	//center_amount == is just the actual amount (num of pixels) from the start location
	//in the array to what we are calling the center/middle of the array. (is calcualted
	//in the method rather than the constructor so that I can use Terrain_Block.h when doing
	//the verticle calculation).

	// var tmp_mx_loc = (mx < 0) ? 0 : mx;

	// var tmp_my_loc = (my < 0) ? 0 : my;

	// console.log("this.tba.length is: " + this.tba.length);

	// console.log("this.center_array is: " + this.center_array);

	

	//this gets us which tb we're currently hovering over. 
	// var curr_tb_x = Math.round(tmp_mx_loc/Terrain_Block.w) * Terrain_Block.w;
	// var curr_tb_y = Math.round(tmp_my_loc/Terrain_Block.l) * Terrain_Block.l;

	// mx = 54;
	// my = 54;

	//pw.print()

	var tmp_x = mlc_x - (Terrain_Block.w/2);
	var tmp_y = mlc_y - (Terrain_Block.l/2);

	// var tmp_x = mx;
	// var tmp_y = my;

	var curr_tb_x = Math.round(tmp_x/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(tmp_y/Terrain_Block.l) * Terrain_Block.l

	// //pw.print("tmp_x is: " + tmp_x);
	// //pw.print("curr_tb_x is: " + curr_tb_x);
	// //pw.print("curr_tb_y is: " + curr_tb_y);

	//take the current x location (aka curr_tb_x) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	var curr_tb_x_adj = curr_tb_x - this.center_amount_h;

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			this.tba[numx][numy].y = curr_tb_y;

			var x_incr = numx * Terrain_Block.w;

			this.tba[numx][numy].x = curr_tb_x_adj + x_incr;

			// console.log("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// console.log("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);


		}
	}

	//console.log("==========");
};


Char_Base.prototype.set_vertically = function(mlc_x,mlc_y){

	//console.log("(set_vertically)");

	//center_amount == is just the actual amount (num of pixels) from the start location
	//in the array to what we are calling the center/middle of the array. (is calcualted
	//in the method rather than the constructor so that I can use Terrain_Block.h when doing
	//the verticle calculation).

	//with this...lets say center_array was 3 (meaning an array of length 7). And length is 
	//10. so the center of the array is 30 pixels in. 
	//var center_amount = this.center_array * Terrain_Block.l;

	// console.log("this.center_array is: " + this.center_array);
	// console.log("Terrain_Block.l is: " + Terrain_Block.l);
	// console.log("center_amount is: " + center_amount);

	// mx = 54;
	// my = 54;

	var tmp_x = mlc_x - (Terrain_Block.w/2);
	var tmp_y = mlc_y - (Terrain_Block.l/2);

	//this gets us which tb on the general playing grid we're currently hovering over. 
	var curr_tb_x = Math.round(tmp_x/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(tmp_y/Terrain_Block.l) * Terrain_Block.l;

	// console.log("curr_tb_x is: " + curr_tb_x);
	// console.log("curr_tb_y is: " + curr_tb_y);



	//take the current x location (aka curr_tb_y) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	//-10
	var curr_tb_y_adj = curr_tb_y - this.center_amount_l;

	// console.log("curr_tb_y_adj is: " + curr_tb_y_adj);

	// console.log("Terrain_Block.l is: " + Terrain_Block.l);

	//set their x and y values so that the boxes be displayed ontop of
	//each other (aka vertically)
	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			this.tba[numx][numy].x = curr_tb_x;

			//the array is 3 across the x axis, and has only a length of one on the
			//y axis.
			//This might be a bit dirty, but I think it should consistently work. 
			var fake_y = numx;

			var y_incr = fake_y * Terrain_Block.l;

			this.tba[numx][numy].y = curr_tb_y_adj + y_incr;

			// console.log("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// console.log("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);


		}
	}

	//console.log("==========");
};
// 1 (0,-10)
// 2 (0,0)
// 3 (0,10)

//upper left corner and lower right corner 
//working as ul and lr
Char_Base.prototype.set_diagonally_ul_and_lr = function(mlc_x,mlc_y){
// Char_Base.prototype.set_diagonally_ll_and_ur = function(mlc_x,mlc_y){

	//with this...lets say center_array was 3 (meaning an array of length 7). And length is 
	//10. so the center of the array is 30 pixels in. 
	//var center_amount = this.center_array * Terrain_Block.l;

	// var tmp_x = mlc_x - (Terrain_Block.w/2);
	// var tmp_y = mlc_y - (Terrain_Block.l/2);

	// var tmp_x = mlc_x + (Terrain_Block.w);
	// var tmp_y = mlc_y + (Terrain_Block.l * 2);


	// var tmp_x = mlc_x;
	// var tmp_y = mlc_y - Terrain_Block.l;

	//var tmp_x = mlc_x - Terrain_Block.w;
	var tmp_x = mlc_x - Terrain_Block.w;
	var tmp_y = mlc_y;


	//this gets us which tb on the general playing grid we're currently hovering over. 
	var curr_tb_x = Math.round(tmp_x/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(tmp_y/Terrain_Block.l) * Terrain_Block.l;

	//take the current x location (aka curr_tb_y) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	//-10
	var curr_tb_y_adj = curr_tb_y - this.center_amount_l;

	var curr_tb_x_adj = curr_tb_x - this.center_amount_h;

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			var x_incr = numx * Terrain_Block.w;

			this.tba[numx][numy].x = curr_tb_x_adj + x_incr;

			//the array is 3 across the x axis, and has only a length of one on the
			//y axis.
			//This might be a bit dirty, but I think it should consistently work. 
			var fake_y = numx;

			var y_incr = fake_y * Terrain_Block.l;

			this.tba[numx][numy].y = curr_tb_y_adj + y_incr;

			// console.log("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// console.log("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);

		}
	}

	//console.log("==========");
};


//upper left and lower right corners 
//working as ll and ur
Char_Base.prototype.set_diagonally_ll_and_ur = function(mlc_x,mlc_y){
// Char_Base.prototype.set_diagonally_ul_and_lr = function(mlc_x,mlc_y){

	// var tmp_x = mlc_x + (Terrain_Block.w * 1.5);
	// var tmp_y = mlc_y - Terrain_Block.l;


	// var tmp_x = mlc_x + (Terrain_Block.w * 3);
	// var tmp_y = mlc_y - (Terrain_Block.l * 2);

	//var tmp_x = mlc_x + (Terrain_Block.w * 2);
	var tmp_x = mlc_x + Terrain_Block.w;
	var tmp_y = mlc_y;

	// var tmp_x = mlc_x + (Terrain_Block.w);
	// var tmp_y = mlc_y - Terrain_Block.l;

	//this gets us which tb on the general playing grid we're currently hovering over. 
	var curr_tb_x = Math.round(tmp_x/Terrain_Block.w) * Terrain_Block.w;
	var curr_tb_y = Math.round(tmp_y/Terrain_Block.l) * Terrain_Block.l;

	//take the current x location (aka curr_tb_y) and then subtract "center amount"
	//from it...making it so that our mouse should be drawn in the middle (or what
	//will at times be close enough to the middle) of the drawn array of yellow tbs. 
	//-10
	var curr_tb_y_adj = curr_tb_y - this.center_amount_l;

	var curr_tb_x_adj = curr_tb_x - this.center_amount_h;

	// console.log("curr_tb_y_adj is: " + curr_tb_y_adj);

	// console.log("curr_tb_x_adj is: " + curr_tb_x_adj);

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			//the "-1" part is to deal with the offset. ex: this.tba[numx].length is 3. 
			//means the elements go from 0 to 2 though. the minus 1 helps put things into 
			//that 0 to 2 range. 
			var x_incr = (this.tba[numx].length - numx - 1) * Terrain_Block.w;

			//console.log("x_incr is: " + x_incr);

			this.tba[numx][numy].x = curr_tb_x_adj + x_incr;

			//the array is 3 across the x axis, and has only a length of one on the
			//y axis.
			//This might be a bit dirty, but I think it should consistently work. 
			var fake_y = numx;

			var y_incr = fake_y * Terrain_Block.l;

			//console.log("y_incr is: " + y_incr);

			this.tba[numx][numy].y = curr_tb_y_adj + y_incr;

			// console.log("curr_tb_y_adj is: " + curr_tb_y_adj);

			// console.log("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// console.log("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);
		}

	}
	//console.log("==========");

};

//the reason that I made the draw_tb_with_provided_color() method 
//is because I dont want to have to be constantly re-setting the colors
//for tb's associated with a char_base instance. 
Char_Base.prototype.draw_ssi = function(){

	//this.click();

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			// //pw.print("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			// //pw.print("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);

			 ////pw.print("this.tba["+numx+"]["+numy+"] is: " + this.tba[numx][numy]);

			this.tba[numx][numy].draw_tb_with_provided_color(this.color);

		}

	};

};

//not in use
// Char_Base.prototype.click = function(){

// 	//console.log("(click)");

// 	// if(mlc){

// 	// 	if(this.horizontal){
// 	// 		this.set_horizontally();
// 	// 	}
// 	// 	else{
// 	// 		this.set_vertically();
// 	// 	}
// 	// }

// 	//just for testing, is not actual code. 
// 	// if(mlc){
// 	// 	//this.set_diagonally_ul_and_lr();
// 	// 	this.set_diagonally_ll_and_ur();
// 	// }


// 	// if(mlc){

// 	// 	switch(this.which_angle) {
// 	// 	    case 0:
// 	// 	        this.set_horizontally();
// 	// 	        break;
// 	// 	    case 1:
// 	// 	        this.set_vertically();
// 	// 	        break;
// 	// 	    case 2:
// 	// 	        this.set_diagonally_ul_and_lr();
// 	// 	        break;
// 	// 	    case 3:
// 	// 	        this.set_diagonally_ll_and_ur();
// 	// 	        break;
// 	// 	    default:
// 	// 	        default this.set_horizontally();
// 	// 	}
// 	// }



// 	////pw.print("this.which_angle is: " + this.which_angle);



// 	// if(mlc){
// 	// 	this.mlc_x = mx;
// 	// 	this.mlc_y = my;
// 	// }

// 	// console.log("this.which_angle is: " + this.which_angle);

// 	switch(this.which_angle){
// 		case 0:
// 			this.set_horizontally();
// 			break;
// 		case 1:
// 			this.set_diagonally_ul_and_lr();
// 			break;
// 		case 2:
// 			this.set_vertically();
// 			break;
// 		case 3:
// 			this.set_diagonally_ll_and_ur();
// 			break;
// 		default:
// 			this.set_horizontally();
// 	}
	


// };

// Char_Base.horizontal = 0;
// Char_Base.diag1 = 1;
// Char_Base.verticle = 2;
// Char_Base.diag2 = 3;


Char_Base.prototype.set_orientation_and_position = function(new_x,new_y){

	//console.log("(set_orientation_and_position0");

	// pw.print("new_x is: " + new_x);
	// pw.print("new_y is: " + new_y);
	// //pw.print("this.color is: " + this.color);

	//only run this code if we're 
	//if(this.old_mlc_x != new_x || this.old_mlc_y != new_y){

	//console.log("this.which_angle is: " + this.which_angle);

	// switch(this.which_angle){
	// 	case Char_Base.horizontal:
	// 		console.log("horizontal");
	// 		this.set_horizontally(new_x,new_y);//up/down
	// 		break;
	// 	case Char_Base.diag1:
	// 		console.log("ul and lr");
	// 		this.set_diagonally_ul_and_lr(new_x,new_y);//diagonal 1
	// 		break;
	// 	case Char_Base.vertical:
			// console.log("vertical");
			// this.set_vertically(new_x,new_y);//left/right
	// 		break;
	// 	case Char_Base.diag2:
			// console.log("")
			// this.set_diagonally_ll_and_ur(new_x,new_y);//diagonal 2
	// 		break;
	// 	default:
	// 		this.set_horizontally(new_x,new_y);
	// }

	if(this.which_angle == Char_Base.horizontal){
			//console.log("horizontal");
			this.set_horizontally(new_x,new_y);//up/down
	}
	else if(this.which_angle == Char_Base.diag1){
			//console.log("")
			this.set_diagonally_ll_and_ur(new_x,new_y);//diagonal 1 (was 2)
	}
	else if(this.which_angle == Char_Base.vertical){
			//console.log("vertical");
			this.set_vertically(new_x,new_y);//left/right
	}
	else if(this.which_angle == Char_Base.diag2){
			//console.log("ul and lr");
			this.set_diagonally_ul_and_lr(new_x,new_y);//diagonal 2 (was 1)
	}
	else{
			//console.log("horizontal");
			this.set_horizontally(new_x,new_y);//up/down		
	}

	// 	this.old_mlc_x = new_x;
	// 	this.old_mlc_y = new_y;

	// }

	//this.draw_ssi();

};



Char_Base.prototype.draw_ssi_with_given_color = function(color){


	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			this.tba[numx][numy].draw_tb_with_provided_color(color);

		}

	};



};

Char_Base.prototype.test = function(){

	for(var numx = 0; numx < this.tba.length; numx++){

		for(var numy = 0; numy < this.tba[numx].length; numy++){

			console.log("this.tba["+numx+"]["+numy+"].x is: " + this.tba[numx][numy].x);

			console.log("this.tba["+numx+"]["+numy+"].y is: " + this.tba[numx][numy].y);

		}

	};


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

//[1,2,3]

//6  : loc 0
//3  : loc 0
//-1 : loc 2 
//-2 : loc 1

//-3 : loc 0 (3%3 is 0)
//-4 : loc 2 (4%3 is 1)
//-5 : loc 1 (5%3 is 2)

//-6 : loc 0 (6%3 is 0)
//-7 : loc 2 (7%3 is 1)
//-8 : loc 2 (8%3 is 2)

//-------------------




/*
length 4 (0 to 3)

-1 : loc 3
1 % 4 is 1
4 - 1 is 3 (right!)

-2 : loc 2
2 % 4 is 2
4 - 2 is 2 (right!)




5 : loc 1 (aka 2nd spot)
5 % 4 is 1


[1,2,3,4]


*/

/*
get this working

then put it into person. 

then fix the pseudo 3d code so that it includes the person correctly. 

*/



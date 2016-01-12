

function Person(){


	//so that the image is only gotten once. 
	this.img=document.getElementById("person_set_1");

	//all of the squares used to get the proper images
	


	this.which_still = 0;

	this.canvas_loc_x = 0;

	this.canvas_loc_y = 0;

	this.num_of_stills_in_row = 3;

	// this.temp_default_ssi = temp_multi_ssi.get_default();

	//this.multi_ssi = new Multi_SSI(0,3);

	this.num_of_columns = 3;

	this.num_of_rows = 4;

	this.double_array = this.build_image_array();


}

Person.prototype.placeAt = function(x,y){

	this.canvas_loc_x = 0;

	this.canvas_loc_y = 0;

}


Person.prototype.build_image_array = function(){

	console.log("GETTING INTO BUILD-IMAGE-ARRAY");

	//note: haven't had luck declaring double arrays in javascript. Not sure if you even can. 
	var temp_double_array = [];

	console.log("this.num_of_rows is: " + this.num_of_rows);

	for(var row = 0; row < this.num_of_rows; row++){

		console.log("!!!!!!!!!!ROW: " + row);

		var tmp_mult_ssi = new Multi_SSI(row,this.num_of_columns);

		temp_double_array.push(tmp_mult_ssi);
		console.log("00000000000000000000");

	}

	//once all of the arrays are built, return the fully build double array. 
	return temp_double_array; 

};

//needs to keep track of current movement. if the left key was hit, need to set character
//to left facing graphic. if movement happened, need to procede to the next movement graphic. 
Person.prototype.getSSI = function(direction,moved){

	//forward 0
	//left 1
	//right 2
	//back 3

	//of the three movements, which one?

	if(this.which_still >= 4){
		this.which_still = 0;
	}
	

	//direction is based on keyboard. if the person hit the "A" key, then
	//the person is facing left. "D" key, right, etc etc. facing_direction
	//holds an array which has a set of coordinates for a set of graphics
	//for walking in that particular direction. 
	var facing_direction = this.double_array[direction];

	//get the proper still (doing this because we still need to increment the graphic)
	var proper_still = facing_direction[this.which_still];

	//if the person moved (moved will be true or false) then increment to the next graphic. 
	if(moved){
		this.which_still += 1;
	}
	

	return proper_still;

};


// Person.prototype.run = function(direction,moved){

// 	ctx.drawImage(this.img,
// 		this.start_of_ssi_x,
// 		this.start_of_ssi_y,
// 		this.s_width,
// 		this.s_height,
// 		this.destination_x,
// 		this.destination_y,
// 		this.destination_width,
// 		this.destination_height
// 		);


// }


// Person.prototype.run2 = function(direction,moved){

Person.prototype.testing_site = function(){

	pw.AddToList("within testing_site");

	// this.draw_ssi(this.multi_ssi.multi_ssi_array[2]);

	var first_set = this.double_array[0];

	this.draw_ssi(first_set.multi_ssi_array[2]);


	//testng that g_direction and moved works. (done)

	// pw.AddToList("(PERP) g_direction is: " + g_direction);//working

	// pw.AddToList("(PERP) g_moved is: " + g_moved);//working

	//testing to see if we're rotating properly through the images (we are)

	//pw.AddToList("this.multi_ssi.get_curr_image() is: " + this.multi_ssi.get_curr_image());

	//testing to see if we're building and inserting the boxes correctly
	//note: this is done in the create_multi_ssi_array method in MultiSSI. 

	//testing to see if we're getting the right box for the right section. 
	// var ssi = this.multi_ssi.getSSI(0,3);
	// pw.AddToList("ssi.start_of_ssi_x: " + ssi.start_of_ssi_x);
	// pw.AddToList("ssi.start_of_ssi_y: " + ssi.start_of_ssi_y);

	

	//-want to see that the values for which image to use change. 

	//-want to make sure that we are going to the right still (via 'this.curr_image' from multi_ssi)
	//whe we move the character. 
	
	//--after that we go onto actual graphics and refine the numbers however need be. 



};


Person.prototype.run = function(direction,moved){

	//if we did move
	if(moved){//g_moved/moved works. 

		//use the direction number to select which set of graphics to use (left, right, up, down) 
		var temp_multi_ssi = this.double_array[direction];//need to check that it is filled correctly.

		//then, get the proper graphic (ie the first, second, or third graphic...depending on how
		//long the user has been holding down the arrow)
		var temp_ssi = temp_multi_ssi.get_next_SSI();

		//save the standing perfectly still (but still facing that same direction) graphic for when
		//the arrow is no longer being hit. 
		this.temp_default_ssi = temp_multi_ssi.get_default();

		this.draw_ssi(temp_ssi);

	}
	else{


		//if temp_default_ssi was already set, then just use it. 
		if(this.temp_default_ssi != null){

			this.draw_ssi(this.temp_default_ssi);

		}
		else{

			//If however it was not initially set, then set it and use it. 

			this.temp_default_ssi = temp_multi_ssi.get_default();

			this.draw_ssi(this.temp_default_ssi);
		}



	}


};

Person.prototype.draw_ssi = function(curr_ssi){

			console.log("curr_ssi.start_of_ssi_x is: " + curr_ssi.start_of_ssi_x);


			ctx.drawImage(this.img,
				curr_ssi.start_of_ssi_x,
				curr_ssi.start_of_ssi_y,
				curr_ssi.s_width,
				curr_ssi.s_height,
				this.canvas_loc_x, 
				this.canvas_loc_y,
				curr_ssi.destination_width,
				curr_ssi.destination_height
			);
}




/*
note: I dont like the huge if statement above with "this.temp_default_ssi". I need to take 
some time and think about it...but I'm wondering if I could just initially set it when I create
the person. As soon as the person moves, this.temp_default_ssi should get set to that default
initial standing still value...and should, no matter what it does, be consistently set to the proper
value. However...initially it is nothing when it starts out at the very beginning. So do I use
Mult_SSI...or something else? 

it's also extreme in it's own right...but I might just set up a separate class just for this...something
that will set this.temp_default_ssi to the SSI in the upper most left hand corner for whatever section
of the sheet that that person is assigned to. 
*/

//-------------------------------------------------------------------------------------

	// //upper left corner.
	// this.start_of_ssi_x = 0;  
	// this.start_of_ssi_y = 2;

	// //section of image from image that it orginates from. 
	// this.s_width = 32;
	// this.s_height = 48;

	// //where to put image on the final canvas
	// this.destination_x = 10;
	// this.destination_y = 20;

	// //how wide and tall to make the image on the final canvas (keeping it the original width and height).
	// this.destination_width = this.s_width;
	// this.destination_height = this.s_height;
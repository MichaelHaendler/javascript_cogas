

//function Gen_Character(){
function Person(){


	//so that the image is only gotten once. 
	this.img=document.getElementById("person_set_1");

	//loc on the canvase
	this.canvas_loc_x = 0;
	this.canvas_loc_y = 0;

	//number of columns and rows 
	this.num_of_columns = 3;
	this.num_of_rows = 4;

	//squares that will be used to select the proper image from the sheet for display. 
	this.double_array = this.build_image_array();

};


//note: put the rest of build_image_array into Multi_SSI
Person.prototype.build_image_array = function(){

	//console.log("GETTING INTO BUILD-IMAGE-ARRAY");

	//note: haven't had luck declaring double arrays in javascript. Not sure if you even can. 
	var temp_double_array = [];

	//console.log("this.num_of_rows is: " + this.num_of_rows);

	for(var row = 0; row < this.num_of_rows; row++){

		//console.log("!!!!!!!!!!ROW: " + row);

		var tmp_mult_ssi = new Multi_SSI(row,this.num_of_columns);

		temp_double_array.push(tmp_mult_ssi);
		//console.log("00000000000000000000");

	}

	//once all of the arrays are built, return the fully build double array. 
	return temp_double_array; 

}; 

Person.prototype.draw_ssi = function(curr_ssi){

			//console.log("curr_ssi.start_of_ssi_x is: " + curr_ssi.start_of_ssi_x);


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
};


Person.prototype.run = function(direction,moved){

	// pw.AddToList("direction is: " + direction);
	// pw.AddToList("moved is: " + moved);


	//if we did move
	if(moved){

		pw.AddToList("moved");

		this.move_perp(direction);

		//use the direction number to select which set of graphics to use (left, right, up, down) 
		var temp_multi_ssi = this.double_array[direction];//need to check that it is filled correctly.

		//then, get the proper graphic (ie the first, second, or third graphic...depending on how
		//long the user has been holding down the arrow)
		var temp_ssi = temp_multi_ssi.get_next_SSI();

		//save the standing perfectly still (but still facing that same direction) graphic for when
		//the arrow is no longer being hit. 
		this.temp_default_ssi = temp_multi_ssi.get_default();

		//debugger;

		pw.AddToList("1temp_ssi.start_of_ssi_x is: " + temp_ssi.start_of_ssi_x);

		this.draw_ssi(temp_ssi);

	}
	 else{

		pw.AddToList("didn't move.");


		//if temp_default_ssi was already set, then just use it. 
		if(this.temp_default_ssi != null){

			pw.AddToList("this.temp_default_ssi not null");



			this.draw_ssi(this.temp_default_ssi);

		}
		else{

			//If however it was not initially set, then set it and use it. 

			//double_array is made up up multi_SSIs...which is a type of object that holds arrays. 
			//you are getting a multi_ssi from here. 
			var temp_multi_ssi = this.double_array[direction];

			//from multi_ssi you are calling get_default, which should get you 
			this.temp_default_ssi = temp_multi_ssi.get_default();

			this.draw_ssi(this.temp_default_ssi);
		}

	}




};


	// this.canvas_loc_x = 0;
	// this.canvas_loc_y = 0;
Person.prototype.move_perp = function(direction){

	var amount = 5;

	var up = 3;
	var down = 0
	var left = 1;
	var right = 2;
	;

	if(direction == up){
		this.canvas_loc_y -= amount;
	}
	else if(direction == down){
		this.canvas_loc_y += amount;
	}
	else if(direction == left){
		this.canvas_loc_x -= amount;
	}
	else if(direction == right){
		this.canvas_loc_x += amount;
	}

};







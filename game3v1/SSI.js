

function SSI(){


	//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

	//upper left corner.
	this.start_of_ssi_x = 0; //1
	this.start_of_ssi_y = 0;//2

	//section of image from image that it orginates from. 
	this.s_width = 32;
	this.s_height = 50;

	// // //where to put image on the final canvas
	// //note: doing it this way so that all of these variables are in 1 place (instead of 2)
	// this.destination_x = perp_variables.canvas_loc_x;
	// this.destination_y = perp_variables.canvas_loc_y;

	//how wide and tall to make the image on the final canvas (keeping it the original width and height).
	this.destination_width = this.s_width;
	this.destination_height = this.s_height;

}


SSI.prototype.setValues = function(row,column){

	//console.log("--this.s_width is: " + this.s_width);
	//console.log("column is: " + column);
	this.start_of_ssi_x = (this.s_width * column);
	//console.log("this.start_of_ssi_x is: " + this.start_of_ssi_x);


	// console.log("this.s_height is: " + this.s_height);
	// console.log("row is: " + row);
	this.start_of_ssi_y = (this.s_height * row);
	//console.log("--this.start_of_ssi_y is: " + this.start_of_ssi_y);
};

//for debugging purposes only 
SSI.prototype.console_print_all_values = function(){

	//upper left corner.
	console.log("this.start_of_ssi_x is: " + this.start_of_ssi_x);
	console.log("this.start_of_ssi_y is: " + this.start_of_ssi_y);

	//section of image from image that it orginates from. 
	console.log("this.s_width is: " + this.s_width);
	console.log("this.s_height is: " + this.s_height);

	console.log("this.destination_width is: " + this.destination_width);
	console.log("this.destination_height is: " + this.destination_height);


};

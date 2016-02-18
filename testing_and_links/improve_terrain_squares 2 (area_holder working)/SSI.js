

function SSI(){


	//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

	//upper left corner.
	this.start_of_ssi_x = 0; //1
	this.start_of_ssi_y = 0;//2

	//section of image from image that it orginates from. 
	this.s_width = 32;
	this.s_height = 48;

	// // //where to put image on the final canvas
	// //note: doing it this way so that all of these variables are in 1 place (instead of 2)
	// this.destination_x = perp_variables.canvas_loc_x;
	// this.destination_y = perp_variables.canvas_loc_y;

	//how wide and tall to make the image on the final canvas (keeping it the original width and height).
	// this.destination_width = this.s_width;
	// this.destination_height = this.s_height;
	this.destination_width = 30;
	this.destination_height = 50;

}

SSI.prototype.set_x_y_w_and_h = function(x,y,w,h){
	this.start_of_ssi_x = x;
	this.start_of_ssi_y = y;
	this.s_width = w;
	this.s_height = h;
	this.destination_width = -1;
	this.destination_height = -1;
};



SSI.prototype.set_x_y_w_h_dw_and_dh = function(x,y,w,h,dw,dh){
	this.start_of_ssi_x = x;
	this.start_of_ssi_y = y;
	this.s_width = w;
	this.s_height = h;
	this.destination_width = dw;
	this.destination_height = dh;
};


SSI.prototype.get_x = function(){
	return this.start_of_ssi_x;
};

SSI.prototype.get_y = function(){
	return this.start_of_ssi_y;
};

SSI.prototype.set_x = function(x){
	this.start_of_ssi_x = x;
};

SSI.prototype.set_y = function(y){
	this.start_of_ssi_y = y;
};


SSI.prototype.get_width = function(){
	return this.start_of_ssi_x;
};

SSI.prototype.get_height = function(){
	return this.start_of_ssi_y;
};

SSI.prototype.set_width = function(x){
	this.start_of_ssi_x = x;
};

SSI.prototype.set_heigh = function(y){
	this.start_of_ssi_y = y;
};


//for multiple image stills (such as with a person)
SSI.prototype.next_x_and_y_location = function(row,column){

	this.start_of_ssi_x = (this.s_width * column);

	this.start_of_ssi_y = (this.s_height * row);

};

SSI.prototype.set_width_and_height = function(width,height){

	this.s_width = width;
	this.s_height = height;
};

SSI.prototype.set_x_y_w_and_h = function(dimensions_array){

	this.start_of_ssi_x = dimensions_array[0];
	this.start_of_ssi_y = dimensions_array[1];
	this.s_width = dimensions_array[2];
	this.s_height = dimensions_array[3];
};



//for debugging purposes only 
SSI.prototype.console_print_all_values = function(){

	console.log("---------------");

	//upper left corner.
	console.log("this.start_of_ssi_x is: " + this.start_of_ssi_x);
	console.log("this.start_of_ssi_y is: " + this.start_of_ssi_y);

	//section of image from image that it orginates from. 
	console.log("this.s_width is: " + this.s_width);
	console.log("this.s_height is: " + this.s_height);

	console.log("this.destination_width is: " + this.destination_width);
	console.log("this.destination_height is: " + this.destination_height);


};

SSI.prototype.type = function(){

	return "SSI object instance";
};

// SSI.prototype.setValues = function(row,column){

// 	//console.log("--this.s_width is: " + this.s_width);
// 	//console.log("column is: " + column);
// 	this.start_of_ssi_x = (this.s_width * column);
// 	//console.log("this.start_of_ssi_x is: " + this.start_of_ssi_x);


// 	// console.log("this.s_height is: " + this.s_height);
// 	// console.log("row is: " + row);
// 	this.start_of_ssi_y = (this.s_height * row);
// 	//console.log("--this.start_of_ssi_y is: " + this.start_of_ssi_y);
// };




// give it the (start) x, the (start) y, and the width and height, 
// so that it can take the sheet and properly take the image from
// it. 
SSI.prototype.set_values = function(x,y,width,height){

	this.start_of_ssi_x = x;
	this.start_of_ssi_y = y;

	this.s_width = width;
	this.s_height = height;

	this.destination_width = this.s_width;
	this.destination_height = this.s_height;

};
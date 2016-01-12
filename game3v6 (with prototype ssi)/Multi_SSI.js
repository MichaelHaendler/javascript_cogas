

//will be used to take out the inner for loop used to build the arrays, and
//will say which of the 3 images to use. That's all though. 

//note: was going to update each and every ssi on the loc on the screen...but that would mean every
//time my character moved that those values would get updated. I think I'll just bite the bullet and
//just keep that stuff in Person for speed's sake.   
function Multi_SSI(which_row,num_of_stills_in_column,w,h,img_src){

	//console.log("getting into Multi_SSI constructor???");

	//console.log("which_row is: " + which_row);

	//console.log("(Multi_SSI) num_of_stills_in_column is: " + num_of_stills_in_column);

		this.multi_ssi_array = this.create_multi_ssi_array(which_row,num_of_stills_in_column,w,h,img_src);

		this.curr_image = 0;

		//the number of single still images in a row. 
		this.ssi_count = num_of_stills_in_column;

};

Multi_SSI.prototype.get_curr_image = function(){
	return this.curr_image;
}

//w == width
//h == height 
//when iterating through the canvas, you need to know how much to increment by. 
//by having wa and ha as part of the input, it will make the code easier to use with canvases
//holding other sets (with different widths and heights) of images 
Multi_SSI.prototype.create_multi_ssi_array = function(which_row,num_of_stills_in_column,w,h,img_src){

		//console.log("getting into create_multi_ssi_array?");

		//console.log("num_of_stills_in_column is: " + num_of_stills_in_column);

		var temp_multi_ssi_array = [];

		for(var column = 0; column < num_of_stills_in_column; column++){

			//make an SSI 
			var temp_ssi = new SSI(
								img_src = img_src,
								x_loc_from_image_canvas = column * w,
								y_loc_from_image_canvas = which_row * h,
								width = w,
								height = h);

			temp_multi_ssi_array.push(temp_ssi);

		}

	return temp_multi_ssi_array;

};


Multi_SSI.prototype.get_next_SSI = function(){

	//console.log("this.curr_image  is: " + this.curr_image);

	if(this.curr_image >= this.ssi_count){
		//console.log("mutli_ssi/getSSI getting in here??");
		this.curr_image = 0;
	}

	//console.log("this.curr_image is: " + this.curr_image);

	var chosen_ssi = this.multi_ssi_array[this.curr_image];
	//var chosen_ssi = this.multi_ssi_array[0];

	this.curr_image +=1;

	return chosen_ssi;


};

Multi_SSI.prototype.get_default = function(){

	return this.multi_ssi_array[1];
};

Multi_SSI.prototype.type = function(){

	return "Multi_SSI object instance";
};




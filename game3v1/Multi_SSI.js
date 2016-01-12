

//will be used to take out the inner for loop used to build the arrays, and
//will say which of the 3 images to use. That's all though. 

//note: was going to update each and every ssi on the loc on the screen...but that would mean every
//time my character moved that those values would get updated. I think I'll just bite the bullet and
//just keep that stuff in Person for speed's sake.   
function Multi_SSI(which_row,num_of_stills_in_column){

	//console.log("getting into Multi_SSI constructor???");

	//console.log("which_row is: " + which_row);

	//console.log("(Multi_SSI) num_of_stills_in_column is: " + num_of_stills_in_column);

		this.multi_ssi_array = this.create_multi_ssi_array(which_row,num_of_stills_in_column);

		this.curr_image = -1;

		//the number of single still images in a row. 
		this.ssi_count = num_of_stills_in_column;

};

Multi_SSI.prototype.get_curr_image = function(){
	return this.curr_image;
}

Multi_SSI.prototype.create_multi_ssi_array = function(which_row,num_of_stills_in_column){

		//console.log("getting into create_multi_ssi_array?");

		//console.log("num_of_stills_in_column is: " + num_of_stills_in_column);

		var temp_multi_ssi_array = [];

		for(var column = 0; column < num_of_stills_in_column; column++){

			console.log("COLUMN: " + column);

			//make an SSI 

			var temp_ssi = new SSI();

			//set its values
			temp_ssi.setValues(which_row,column);

			//console.log("this.curr_image is: " + this.curr_image);

			temp_ssi.console_print_all_values();
			console.log("-----------------");			

			//put it into the array
			temp_multi_ssi_array.push(temp_ssi);

		}

	return temp_multi_ssi_array;

};

// Multi_SSI.prototype.getSSI = function(){

// 	//console.log("this.curr_image  is: " + this.curr_image);

// 	if(this.curr_image >= this.ssi_count){
// 		//console.log("mutli_ssi/getSSI getting in here??");
// 		this.curr_image = 0;
// 	}

// 	// var chosen_ssi = this.multi_ssi_array[this.curr_image];
// 	var chosen_ssi = this.multi_ssi_array[0];

// 	this.curr_image +=1;

// 	//console.log("how about here?");

// 	// console.log("this.curr_image is: " +  this.curr_image);

// 	// if(this.curr_image == 3){
// 	// 	debugger;
// 	// }

// 	return chosen_ssi;


// };

Multi_SSI.prototype.getSSI = function(){

	//console.log("this.curr_image  is: " + this.curr_image);

	if(this.curr_image >= this.ssi_count){
		//console.log("mutli_ssi/getSSI getting in here??");
		this.curr_image = 0;
	}

	// var chosen_ssi = this.multi_ssi_array[this.curr_image];
	var chosen_ssi = this.multi_ssi_array[0];

	this.curr_image +=1;

	//console.log("how about here?");

	// console.log("this.curr_image is: " +  this.curr_image);

	// if(this.curr_image == 3){
	// 	debugger;
	// }

	return chosen_ssi;


};




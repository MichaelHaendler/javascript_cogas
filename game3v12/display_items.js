
//start with just items, but then move up to the characters 
//themselves (and eventually everything else)

function Display_Array(){

	this.array = [];

};


Display_Array.prototype.add = function(thing){
	this.array.push(thing);
};

Display_Array.prototype.display_all = function(ctx){

	var canvas = $('#myCanvas').get(0);

	// console.log("canvas.height is: " + canvas.height);
	// console.log("canvas.width is: " + canvas.width);

	for(var i = 0; i < this.array.length; i++){

		var thing = this.array[i];

		var image = thing[0];
		var image_x_loc = thing[1];
		var image_y_loc = thing[2];


		ctx.drawImage(image,
			image_x_loc, 
			image_y_loc,
			canvas.width,
			canvas.height);

	}


};

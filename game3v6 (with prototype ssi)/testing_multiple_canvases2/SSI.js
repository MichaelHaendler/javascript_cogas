

//"http://i.imgur.com/RMkU0tL.png"

function SSI(img_src,x_loc_from_image_canvas,y_loc_from_image_canvas,w,h){

	//will hold final image
	this.img = document.createElement('canvas');

	//dimensions of final image
	// this.img.width = w;
	// this.img.height = h;
	this.img.width = 200;
	this.img.height = 200;

	//holds not just image we are looking for, but many 
	//others that at this specific time we are not. 
	this.canvas_image = document.createElement('img');

	//"http://i.imgur.com/RMkU0tL.png"//note: remove the "this" part. 
	//am definately getting image
	// this.canvas_image.src = img_src;
	this.canvas_image.src = "http://i.imgur.com/RMkU0tL.png";

	this.img_context = this.img.getContext('2d');

		//for the basic queen.jpg iterate x by -31, and y by -48 
	// var x_loc_from_image_canvas = x;
	// var y_loc_from_image_canvas = y;

	//values seem proper. 
	console.log("this.img.width is: " + this.img.width);
	console.log("this.img.height is: " + this.img.height);
	console.log("x_loc_from_image_canvas is: " + x_loc_from_image_canvas);
	console.log("y_loc_from_image_canvas is: " + y_loc_from_image_canvas);

	this.img_context.drawImage(this.canvas_image,
	x_loc_from_image_canvas, 
	y_loc_from_image_canvas);

};

SSI.prototype.testing = function(){
	// return this.canvas_image;//works!

	//return this.img_context;
	return this.img;

};

SSI.prototype.get_image = function(){
	return this.img;
};

SSI.prototype.get_width = function(){
	return this.img.width;
};

SSI.prototype.get_height = function(){
	return this.img.height;
};



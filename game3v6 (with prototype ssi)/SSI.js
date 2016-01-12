

//"http://i.imgur.com/RMkU0tL.png"

function SSI(img_src,x_loc_from_image_canvas,y_loc_from_image_canvas,w,h){

	//will hold final image
	this.img = document.createElement('canvas');

	//dimensions of final image
	this.img.width = w;
	this.img.height = h;

	//holds not just image we are looking for, but many 
	//others that at this specific time we are not. 
	var canvas_image = document.createElement('img');

	//"http://i.imgur.com/RMkU0tL.png"
	canvas_image.src = img_src;

	var this_img_context = this.img.getContext('2d');

		//for the basic queen.jpg iterate x by -31, and y by -48 
	// var x_loc_from_image_canvas = x;
	// var y_loc_from_image_canvas = y;

	this_img_context.drawImage(canvas_image,
	x_loc_from_image_canvas, 
	y_loc_from_image_canvas);

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



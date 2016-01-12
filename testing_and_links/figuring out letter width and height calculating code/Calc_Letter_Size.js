
//get pixel info 
//http://stackoverflow.com/questions/667045/getpixel-from-html-canvas
//http://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover

//extra data on getting pixel info (about the getImageData method)
//http://www.w3schools.com/tags/canvas_getimagedata.asp

//convert int to char
//http://stackoverflow.com/questions/3145030/convert-integer-into-its-character-equivalent-in-javascript

//convert char to int
//http://www.hacksparrow.com/get-ascii-value-of-character-convert-ascii-to-character-in-javascript.html

//good site on pixels in general. 
//http://beej.us/blog/data/html5s-canvas-2-pixel/


//colors
//blue
//0, 0, 255
//black
//0,0,0
//white
//255,255,255
//yellow
//255, 255, 0

//alpha for all: 255


function Calc_Letter_Size(){

	//this.string = "helo. this is a test";
	this.string = "B";
	this.font_size = 25;
	this.font_type = "Ariel";

	//make the canvas. 
	this.c = document.createElement('canvas');

	//arbitrary multiplication to ensure that the letter (height wise) fit. 
	this.c.width = this.font_size * 3;
	
	//arbitrary multiplication to ensure that the letter (height wise) fit. 
	this.c.height = this.font_size * 3;

	var tmp_ctx = this.c.getContext('2d');

	//fill it in by...

	//referring to its entire self as a square
	tmp_ctx.rect(0,0, this.c.width, this.c.height);

	////set its fill color to some color
	//note: if you dont set the canvas to some color...then the square comes out
	//black (at least it did when I did it)
	tmp_ctx.fillStyle="blue";

	//and then fill it in. 
	tmp_ctx.fill();

	tmp_ctx.font = this.font_size + "px " + this.font_type;

	tmp_ctx.fillStyle = "black";

	var locX = this.font_size;
	var locY = this.font_size;

	tmp_ctx.fillText(this.string,locX,locY);


};

Calc_Letter_Size.prototype.draw_ssi = function(){

	ctx.drawImage(this.c,5,5);


};

function Calc(){

	var array = [];

	//this.string = "helo. this is a test";
	//var string = "B";
	var font_size = 25;
	var font_type = "Ariel";

	//make the canvas. 
	var c = document.createElement('canvas');

	//arbitrary multiplication to ensure that the letter (height wise) fit. 
	c.width = font_size * 3;
	
	//arbitrary multiplication to ensure that the letter (height wise) fit. 
	c.height = font_size * 3;

	var tmp_ctx = c.getContext('2d');

	//fill it in by...

	//referring to its entire self as a square
	tmp_ctx.rect(0,0, c.width, c.height);

	////set its fill color to some color
	//note: if you dont set the canvas to some color...then the square comes out
	//black (at least it did when I did it)
	tmp_ctx.fillStyle="blue";

	//and then fill it in. 
	tmp_ctx.fill();

	tmp_ctx.font = font_size + "px " + font_type;

	tmp_ctx.fillStyle = "black";

	var locX = this.font_size;
	var locY = this.font_size;

	//tmp_ctx.fillText(this.string,locX,locY);

	//where the visible stuff starts on the ascii table (note: will need a special
	//case for the space character)
	var start_of_visible_chars = 33;
	var end_of_visible_chars = 126;

	//iterating through all of the acceptable characters
	for(var i = start_of_visible_chars; i <= end_of_visible_chars; i++){

		//get character
		var tmp_string = String.fromCharCode(i);

		//draw it onto the canvas
		tmp_ctx.fillText(this.string,locX,locY);

		//get width (in pixels)
		var tmpW = calc_w(c);
		//get height
		var tmpH = calc_w(c);

		//put into array
		array[i] = [tmpW,tmpH];

		//clear square by setting color back to blue, and filling it in.
		tmp_ctx.fillStyle = "blue";
		tmp_ctx.fill();

		// and then set the color back to black for the writing. 
		tmp_ctx.fillStyle = "black";

	}

	return array;

};

function calc_w(c){

	var w = c.width;

	var h = c.height;

	var front = null;

	var back = null;

	var tmp_ctx = c.getContext('2d');

	//whole tmp canvas
	// var imgd = tmp_ctx.getImageData(0, 0, w, h);

	// var pix = imgd.data;


	for(var column = 0; column < w; column++){

		for(var row = 0; row < h; row++){

			var imgd_front = tmp_ctx.getImageData(column, row, 1, 1);
			var pix_front = imgd.data;	

			//get earliest instance of black for front
			if(front == null && pix_front == [255,255,255]){
				front = column; //aka 'x1' (we're just trying to get width here, not height)
			}

			//width minus column...meaning that we're starting from the back and working
			//our way towards the front. 
			var imgd_back = tmp_ctx.getImageData(w - column, row, 1, 1);
			var pix_back = imgd.data;	

			if(back == null && pix_back == [255,255,255]){
				back = column; //aka 'x1' (we're just trying to get width here, not height)
			}

			if(back != null && front != null){
				break;
			}


		}
	}

	return back - front;

};


// function get_array_of_acceptable_chars(){

// 	var start_of_visible_chars = 33;
// 	var end_of_visible_chars = 126;
// 	var array = [];

// 	for(var i = start_of_visible_chars; i <= end_of_visible_chars; i++){



// 	}

// 	return array;
// };

// x	The x coordinate (in pixels) of the upper-left corner to start copy from
// y	The y coordinate (in pixels) of the upper-left corner to start copy from
// width	The width of the rectangular area you will copy
// height	The height of the rectangular area you will copy
//get an ARRAY of pixels. say, x and y are both 0, 0.
// var imgd = context.getImageData(x, y, width, height);
// var pix = imgd.data;

//x and y are loc. width and height are 1. I'm sure you could do this better...
//but theres no need. 


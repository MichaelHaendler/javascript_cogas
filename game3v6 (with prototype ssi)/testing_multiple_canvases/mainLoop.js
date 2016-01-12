
/*
make a small canvas.
have the picture 
post the picture onto the small canvas. 

paint the canvas onto the larger/general canvas. 

*/

var img = document.getElementById("person_set_1");

var start_of_ssi_x = 0;
var start_of_ssi_y = 0;
var s_width = 50;
var s_height = 50;
var canvas_loc_x = 10;
var canvas_loc_y = 20;
var d_width = s_width;
var d_height = s_height;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function mainLoop1(){

console.log("hi");

	ctx.drawImage(img,
		start_of_ssi_x,
		start_of_ssi_y,
		s_width,
		s_height,
		canvas_loc_x, 
		canvas_loc_y,
		d_width,
		d_height);

};

//get small canvas
var c2 = document.getElementById("test_canvas");

//make it possible to draw on it
var ctx2 = c2.getContext("2d");

//then draw on it 
ctx2.drawImage(img,
0, 
0,
280,
280);


function mainLoop2(){

	//then draw on general canvas
	ctx.drawImage(c2,
		0, 
		0,
		50,
		50);


};

//3) make a new canvas instead of calling one that already exists (needs to be done with dom)

//stack overflow page that really helped. 
//http://stackoverflow.com/questions/6608996/is-it-possible-to-create-an-html-canvas-without-a-dom-element

//make a canvas
 var c3 = document.createElement('canvas');
 c3.width = 70;
 c3.height = 70;

 //apparently I dont even need to appen it to anything!!

//make it so that you can draw on it 
var ctx3 = c3.getContext('2d');

//draw on it 
ctx3.drawImage(img,
0, 
0,
850,
540);


function mainLoop3(){

	//draw it on the regular general canvas 
	ctx.drawImage(c3,
		0, 
		0,
		50,
		50);


};

//4) #3, but with you making your own instance of image as well 

//make the image 

var img2 = document.createElement('img');
img2.src = "http://i.imgur.com/RMkU0tL.png"

//make a canvas
 var c3 = document.createElement('canvas');

 //got dimensions from image itself
 c3.width = 384;
 c3.height = 384;

 //apparently I dont even need to appen it to anything!!

//make it so that you can draw on it 
var ctx3 = c3.getContext('2d');

//draw on it 
var x_loc_from_image_canvas = 180;
var y_loc_from_image_canvas = 60;
var image_width =  2500;
var image_height = 2500;

ctx3.drawImage(img2,
x_loc_from_image_canvas, 
y_loc_from_image_canvas,
image_width,
image_height);

var x_loc_on_gen_canvas = 30;
var y_loc_on_gen_canvas = 30;
var width_on_gen_canvas = 60;
var height_on_gen_canvas = 60;


function mainLoop4(){

	//draw it on the regular general canvas 
	ctx.drawImage(c3,
		x_loc_on_gen_canvas, 
		y_loc_on_gen_canvas,
		width_on_gen_canvas,
		height_on_gen_canvas);


};


/////////////////////////////////////////////////////////////////////////

var img2 = document.createElement('img');
img2.src = "http://i.imgur.com/RMkU0tL.png"

//make a canvas
 var c3 = document.createElement('canvas');

 //dimensions of the canvas that the image will be painted on 
 c3.width = 30;
 c3.height = 55;

//make it so that you can draw on it 
var ctx3 = c3.getContext('2d');

//start location from the image 
//(need to go negative in order to go to next image, no idea why yet)
var x_loc_from_image_canvas = 0;
var y_loc_from_image_canvas = 0;

//seem to zoom in on the initial coords above
var image_width =  350;
var image_height = 420;

ctx3.drawImage(img2,
x_loc_from_image_canvas, 
y_loc_from_image_canvas,
image_width,
image_height);

//loc on gen canas. 
var x_loc_on_gen_canvas = 0;
var y_loc_on_gen_canvas = 0;
var width_on_gen_canvas = 50;
var height_on_gen_canvas = 50;


function mainLoop6(){

	//draw it on the regular general canvas 
	// ctx.drawImage(c3,
	// 	x_loc_on_gen_canvas, 
	// 	y_loc_on_gen_canvas,
	// 	width_on_gen_canvas,
	// 	height_on_gen_canvas);
	ctx.drawImage(c3,
		x_loc_on_gen_canvas, 
		y_loc_on_gen_canvas);



};

/////////////////////////////////////////////////////////////////////////

var img2 = document.createElement('img');
img2.src = "http://i.imgur.com/RMkU0tL.png"

//make a canvas
 var c3 = document.createElement('canvas');

 //dimensions of the canvas that the image will be painted on 
 //aka width and height of image
 c3.width = 33;
 c3.height = 49;

//start location from the image 
//(need to go negative in order to go to next image, no idea why yet)
//move by units of -31 left
//move by units of -48 down
var x_loc_from_image_canvas = -31;
var y_loc_from_image_canvas = -48;

//make it so that you can draw on it 
var ctx3 = c3.getContext('2d');

//taking the whole image, and then taking the image by it's 0,0 coord, and moving
//it around relative to the c3 canvas that we're painting it onto (usually we're positioning
//the image way to the left of the c3 canvas, and way north/up of the c3 canvas, off of the c3
//canvas, so that we can get the part of the image that we want on the c3 canvas positioned perfectly
//over the c3 canvas, so that it can be painted ONTO the c3 canvas. (ex: x is - 31 and y is -48 will
//get you one image down, and one image to the right aka the middle image of the king running to the
//left)
ctx3.drawImage(img2,
x_loc_from_image_canvas, 
y_loc_from_image_canvas);

//loc on gen canas. 
var x_loc_on_gen_canvas = 0;
var y_loc_on_gen_canvas = 0;

function mainLoop7(){

	ctx.drawImage(c3,
		x_loc_on_gen_canvas, 
		y_loc_on_gen_canvas);


};


//////////////////////////////

//version without notes


var c8 = document.createElement('canvas');

 c8.width = 33;
 c8.height = 49;

var img8 = document.createElement('img');

img8.src = "http://i.imgur.com/RMkU0tL.png"

var ctx3 = c8.getContext('2d');

var x_loc_from_image_canvas = -31;
var y_loc_from_image_canvas = -48;

ctx3.drawImage(img8,
x_loc_from_image_canvas, 
y_loc_from_image_canvas);
 
var x_loc_on_gen_canvas = 0;
var y_loc_on_gen_canvas = 0;

function mainLoop8(){

	ctx.drawImage(c8,
		x_loc_on_gen_canvas, 
		y_loc_on_gen_canvas);


};

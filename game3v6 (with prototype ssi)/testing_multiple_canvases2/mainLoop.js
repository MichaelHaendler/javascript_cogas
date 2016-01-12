
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

/////////////////////////

var img2 = document.createElement('img');
img2.src = "http://i.imgur.com/RMkU0tL.png"

//make a canvas
 var c3 = document.createElement('canvas');

 //dimensions of the canvas that the image will be painted on 
 //aka width and height of image
 // c3.width = 33;
 // c3.height = 49;
 c3.width = 50;
 c3.height = 50;

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
// ctx3.drawImage(img2,
// x_loc_from_image_canvas, 
// y_loc_from_image_canvas);

//loc on gen canas. 
var x_loc_on_gen_canvas = 0;
var y_loc_on_gen_canvas = 0;



function mainLoop7(){

	ctx3.fillStyle="pink";
	ctx3.fillRect(0,0,50,50);

	console.log("mainLoop71");

	ctx.drawImage(c3,20, 20);

	//ctx.drawImage(img2,x_loc_on_gen_canvas, y_loc_on_gen_canvas);


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


/////////////////////////////////////////


/*
var img_src = "http://i.imgur.com/RMkU0tL.png";
var x_loc_from_image_canvas = -31;
var y_loc_from_image_canvas = -48;
var w = 33;
var h = 49;

var ssi_test_obj = new SSI(img_src,x_loc_from_image_canvas,y_loc_from_image_canvas,w,h);

function mainLoop9(){

	ctx.drawImage(ssi_test_obj.get_image(),50,50);

};
*/
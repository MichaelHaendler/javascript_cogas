
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
 c3.width = 70;
 c3.height = 70;

 //apparently I dont even need to appen it to anything!!

//make it so that you can draw on it 
var ctx3 = c3.getContext('2d');

//draw on it 
ctx3.drawImage(img2,
0, 
0,
850,
540);


function mainLoop4(){

	//draw it on the regular general canvas 
	ctx.drawImage(c3,
		0, 
		0,
		50,
		50);


};


//5) #4, but in jquery

//make the image 

//var img2 = $('<img src="http://i.imgur.com/RMkU0tL.png">');

// var img3 = $('<img />',
//              { id: 'Myid',
//                src: "http://i.imgur.com/RMkU0tL.png", 
//                width: 500,
//                height: 500
//              });

/*

var str = '<canvas id="jq_canvas" width="50" height="50"></canvas>';

var c5 =  $(str).appendTo('#top');

var str = '<img id="jq_image" src="http://i.imgur.com/RMkU0tL.png"/>';

var img5 = $(str).appendTo('#jq_canvas');

var ctx5 = $("#jq_canvas").get(0).getContext('2d');
$("#jq_canvas").print();

console.log("img5.get(0) is: " + img5.get(0).id);

ctx5.drawImage(img5.get(0),
0, 
0,
850,
540);


function mainLoop5(){

	//draw it on the regular general canvas 
	ctx.drawImage(c5.get(0),
		0, 
		0,
		50,
		50);
};

*/

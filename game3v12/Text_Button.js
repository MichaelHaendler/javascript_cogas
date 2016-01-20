
// Text_Button(
// 			phrase_or_word = "hello there!", 
// 			x = 10, 
// 			y = 10,
// 			width = 50,
// 			height = 50,
// 			centered = true
// 			);

// function Text_Button(draw_at_x,draw_at_y){
function Text_Button(string,draw_at_x,draw_at_y,w,h){

	//relative to general canvas
	this.x = 0;
	this.y = 0;

	this.w = w;
	this.h = h;

	//relative to canvas that it is being drawn on. 
	this.draw_at_x = draw_at_x;
	this.draw_at_y = draw_at_y;

	//26 letters in the alphabet
	// this.string = "abcdefghijklmnopqrstuvwxyz";
	this.string = string;

	this.cap_letter = 17.5;
	//this.lower_case_letter = 13.4;
	this.lower_case_letter = 12.23;
	//make a canvas
	 this.c3 = document.createElement('canvas');
	 //this.c3.width = 67;
	 this.c3.width = this.string.length * this.lower_case_letter;
	 //this.c3.width = 318;
	 this.c3.height = 70;

	 this.cap_letter = 17.5;
	 this.lower_case_letter = 13.4;

	//make it so that you can draw on it 
	var ctx3 = this.c3.getContext('2d');

	//fill it in by...

	//referring to its entire self as a square
	ctx3.rect(0,0, this.c3.width, this.c3.height);

	////set its fill color to some color
	ctx3.fillStyle="red";

	//and then fill it in. 
	ctx3.fill();

	ctx3.fillStyle = "black";

	ctx3.font = "25px Arial";

	// this.string = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
	// this.string = "abcdefghijklmnopqrstuvwxyz";



	ctx3.fillText(this.string,0,19);

};

//http://www.w3schools.com/tags/canvas_fill.asp
Text_Button.prototype.draw_ssi = function(){

	//and paint it onto the general canvas. 
	ctx.drawImage(this.c3,this.draw_at_x,this.draw_at_y);
};

function Text_Button1(){

	return new Text_Button(
							phrase_or_word = "hello there!", 
							x = 10, 
							y = 10,
							width = 50,
							height = 50
							);
};



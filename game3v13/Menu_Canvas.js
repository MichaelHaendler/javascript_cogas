
/*
//http://www.w3schools.com/tags/ref_colorpicker.asp

//note: did it with 2 canvases so that I wouldn't have to re-color the canvas
//each and every time it was either selected or not selected. 
function Menu_Canvas(x,y,w,h){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.menu_canvas_selected = document.createElement('canvas');

	this.menu_canvas_selected.width = this.w;

	this.menu_canvas_selected.height = this.h;

	this.menu_canvas_selected.class = "menu_canvas_for_person_selected";

	var tmp_ctx = this.menu_canvas_selected.getContext("2d");

	this.selected_color = "#ac7339";

	tmp_ctx.fillStyle= this.selected_color;

	tmp_ctx.fillRect(0,0,this.w,this.h);

	//-------------------


	this.menu_canvas_not_selected = document.createElement('canvas');

	this.menu_canvas_not_selected.width = this.w;

	this.menu_canvas_not_selected.height = this.h;

	this.menu_canvas_not_selected.class = "menu_canvas_for_person_not_selected";

	var tmp_ctx = this.menu_canvas_not_selected.getContext("2d");

	this.not_selected_color = "#996633";

	tmp_ctx.fillStyle = this.not_selected_color;

	tmp_ctx.fillRect(0,0,this.w,this.h);

	this.not_selected_color = "#996633";

	tmp_ctx.fillStyle= this.not_selected_color;

	tmp_ctx.fillRect(0,0,this.w,this.h);

	this.has_been_selected = true;

};


Menu_Canvas.prototype.selected = function(selected){

	this.has_been_selected = selected;

};

Menu_Canvas.prototype.draw_ssi = function(){

	if(this.has_been_selected){
		ctx.drawImage(this.menu_canvas_selected,
		this.x, 
		this.y,
		this.w,
		this.h);
	}
	else{
		ctx.drawImage(this.menu_canvas_not_selected,
		this.x, 
		this.y,
		this.w,
		this.h);
	}

};

Menu_Canvas.prototype.contains_mouse = function(mx,my){

	var x_test = mx >= this.x && mx <= this.x + this.w;
	var y_test = my >= this.y && mx <= this.y + this.h;

	return (x_test && y_test);
}


// var c = document.getElementById("myCanvas"); // c == canvas
// var ctx = c.getContext("2d");

Menu_Canvas.prototype.get_ctx = function(){

	if(this.has_been_selected){

	}
	else{

	}


};
*/

function Menu_Canvas(x,y,w,h){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.menu_canvas = document.createElement('canvas');

	this.menu_canvas.width = this.w;

	this.menu_canvas.height = this.h;

	this.menu_canvas.class = "menu_canvas";

	var tmp_ctx = this.menu_canvas.getContext("2d");

	this.selected_color = "#ac7339";

	this.not_selected_color = "#996633";

	tmp_ctx.fillStyle= this.selected_color;

	tmp_ctx.fillRect(0,0,this.w,this.h);

	this.has_been_selected = false;

};



Menu_Canvas.prototype.set_offset = function(array_of_x_and_y){

	this.x += array_of_x_and_y[0];
	this.y += array_of_x_and_y[1];

};

Menu_Canvas.prototype.selected = function(selected){

	//so that you dont have to always be doing these over again
	if(this.has_been_selected != selected){ 

		var tmp_ctx = this.menu_canvas.getContext("2d");

		if(selected){
			tmp_ctx.fillStyle= this.selected_color;
			tmp_ctx.fillRect(0,0,this.w,this.h);
		}
		else{
			tmp_ctx.fillStyle= this.not_selected_color;
			tmp_ctx.fillRect(0,0,this.w,this.h);
		}

		this.has_been_selected = selected;
	}	



};

Menu_Canvas.prototype.draw_ssi = function(){

	ctx.drawImage(this.menu_canvas,
	this.x, 
	this.y,
	this.w,
	this.h);

};

Menu_Canvas.prototype.contains_mouse = function(mx,my){

	var x_test = mx >= this.x && mx <= this.x + this.w;
	var y_test = my >= this.y && mx <= this.y + this.h;

	return (x_test && y_test);
}


// var c = document.getElementById("myCanvas"); // c == canvas
// var ctx = c.getContext("2d");

// Menu_Canvas.prototype.get_ctx = function(){
// 	return this.menu_canvas.getContext("2d");
// };

// Menu_Canvas.prototype.set_ctx = function(new_ctx){
// 	var tmp_ctx = this.menu_canvas.getContext("2d");
// 	tmp_ctx = new_ctx;
// };

Menu_Canvas.prototype.get_canvas = function(){
	return this.menu_canvas;

	ctx.drawImage(this.menu_canvas,
	this.x, 
	this.y,
	this.w,
	this.h);
};



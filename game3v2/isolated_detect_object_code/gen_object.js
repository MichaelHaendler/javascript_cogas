
//it has a picture, and is draggable. gun and health pack, etc etc, all those unique props can be done
//in their own classes. 

//once I have this working...I will 
function Gen_Obj(picture_name,x,y,width,height){


	//so that the image is only gotten once. NOTE!: 
	this.img=document.getElementById(picture_name);
	

	//loc on the canvase
	this.canvas_loc_x = 0;
	this.canvas_loc_y = 0;

	this.ssi = new SSI();
	this.ssi.set_width_and_height(width,height);
	this.ssi.set_x(x);
	this.ssi.set_y(y);

	this.start_x = x;
	this.start_y = x;
	this.end_x = x + width;
	this.end_y = y + height;

};

//for click AND hover
Gen_Obj.prototype.contains = function(mouse_x,mouse_y){

	var start_x = this.canvas_loc_x;
	var end_x = this.canvas_loc_x + this.ssi.destination_width;
	var start_y = this.canvas_loc_y;
	var end_y = this.canvas_loc_y + this.ssi.destination_height;

	pw.AddToList("start_x:  " + start_x);
	pw.AddToList("end_x:  " + end_x);
	pw.AddToList("start_y:  " + start_y);
	pw.AddToList("end_y:  " + end_y);

	if(mouse_x >= start_x && mouse_x <=  end_x && 
	   mouse_y >= start_y && mouse_y <= end_y){
		return true;
	}
	else{
		return false;
	}

};


Gen_Obj.prototype.set_x = function(new_x){
	this.ssi.set_x(new_x);
};

Gen_Obj.prototype.set_y = function(new_y){
	this.ssi.set_y(new_y);
};


Gen_Obj.prototype.set_display_size = function(x,y){

	this.ssi.destination_width = x;
	this.ssi.destination_height = y;

};


Gen_Obj.prototype.draw_ssi = function(){

	// this.img.style.width = "50px";
	// this.img.style.height = "50px";

		//this.ssi.console_print_all_values();

			ctx.drawImage(this.img,
				this.ssi.start_of_ssi_x,
				this.ssi.start_of_ssi_y,
				this.ssi.s_width,
				this.ssi.s_height,
				this.canvas_loc_x, 
				this.canvas_loc_y,
				this.ssi.destination_width,
				this.ssi.destination_height
			);
};

Gen_Obj.prototype.set_loc = function(x,y){

	this.canvas_loc_x = x;
	this.canvas_loc_y = y;

}

// give it the (start) x, the (start) y, and the width and height, 
// so that it can take the sheet and properly take the image from
// it. 
Gen_Obj.prototype.set_image = function(x,y,width,height){
				this.ssi.set_values(x,y,width,height)
};

Gen_Obj.prototype.testing = function(mouse_x,mouse_y){

	//var results = this.contains(mouse_x,mouse_y);

	//pw.AddToList("see the mouse? " + results);

	pw.AddToList("-----------------------");

	// pw.AddToList("(expect 10) this.ssi.start_of_ssi_x is: " + this.ssi.start_of_ssi_x);
	// pw.AddToList("(expect 11) this.ssi.start_of_ssi_y is: " + this.ssi.start_of_ssi_y);
	// pw.AddToList("(expect 110) this.ssi.s_width is: " + this.ssi.s_width);
	// pw.AddToList("(expect 109) this.ssi.s_height is: " + this.ssi.s_height);
	// pw.AddToList("(expect 100) this.canvas_loc_x is: " + this.canvas_loc_x);
	// pw.AddToList("(expect 50) this.canvas_loc_y is: " + this.canvas_loc_y);
	// pw.AddToList("(expect 51) this.destination_width is: " + this.ssi.destination_width);
	// pw.AddToList("(expect 52) this.destination_height is: " + this.ssi.destination_height);
	
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("this.ssi.destination_width is: " + this.ssi.destination_width);
	pw.AddToList("this.ssi.destination_height is: " + this.ssi.destination_height);

	pw.AddToList("start num x is: " + this.canvas_loc_x);

	var end_num_x = this.canvas_loc_x + this.ssi.destination_width;
	pw.AddToList("end_num_x is: " + end_num_x);

	pw.AddToList("start num y is: " + this.canvas_loc_y);

	var end_num_y = this.canvas_loc_y + this.ssi.destination_height;
	pw.AddToList("end_num_y is: " + end_num_y);

	var within_x = (mx >= this.canvas_loc_x && mx <= end_num_x);
	var within_y = (my >= this.canvas_loc_y && mx <= end_num_y);

	pw.AddToList("within_x is: " + within_x);
	pw.AddToList("within_y is: " + within_y);

	var within_square = within_x && within_y;
	pw.AddToList("within_square is: " + within_square);

	this.draw_ssi();

};




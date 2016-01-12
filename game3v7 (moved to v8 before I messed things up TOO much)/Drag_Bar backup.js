

function Drag_Bar(x,y,w,h) {

	//console.log("zonkers");

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.offset_x = 0;
    this.offset_y = 0;


    //this is used to say we have passed over the object but not actually
    //clicked on it (this is important )
    this.hover_but_no_click_before = false;
	this.first_click_x =  null;
	this.first_click_y =  null;

	//this is a possibly dirty hack used to allow the user to continue dragging the object
	//despite having accidentally left the inner area of the object with the mouse as a result
	//of moving the mouse too quickly.  
	//the code itself might not be too great...but this addition adds virtually no overhead to 
	//the running of the code (doesnt slow it down at all)
	this.proper_click = false;

	this.bar_canvas = document.createElement('canvas');

	this.bar_canvas.width = this.w;

	this.bar_canvas.height = this.h;

	this.bar_canvas.class = "bar_canvas";

	var tmp_ctx = this.bar_canvas.getContext("2d");

	// this.selected_color = "#ff0000";//light red

	// this.not_selected_color = "#e60000";//darker red"


	this.selected_color = "#0000cc";//blue

	this.not_selected_color = "#00ff00";//green

	tmp_ctx.fillStyle= this.selected_color;

	tmp_ctx.fillRect(0,0,this.w,this.h);

	this.has_been_selected = false;

};

Drag_Bar.prototype.mouse_intersects = function(mouse_x,mouse_y) {

	//console.log('here');

	//if the upper left hand x coord is beyond the end of
	//the big square (x being it's starting place, w taking us to the end)
	//then there is no way we are inside 
    if (mouse_x > this.x + this.w) {

    	//console.log("returning false on: (mouse_x > this.x + this.w) ");
        return false;
    }

    //if the upper left hand y coord is lower then the bottom of the big square 
    //(aka the y plus the h, taking us to the bottom) then there is no way that 
    //it is within the square
    if (mouse_y > this.y + this.h) {
    	//console.log("returning false on: (mouse_y > this.y + this.h ");
        return false;
    }

    //if the end of our square (aka our x plus our w) is less than the starter X
    //for the big square, then there is no way we are inside. 
    if (mouse_x < this.x) {
    	//console.log("returning false on: (mouse_x < other.x)");
        return false;
    }

    //if out bottom (aka our y plus h) is less than the upper left hand corner
    //y of the big square, then there is no way that it is inside.  
    if (mouse_y < this.y) {
    	//console.log("returning false on: (mouse_y < other.y) ");
        return false;
    }

    //console.log("returning true!!");
    return true;
};

Drag_Bar.prototype.draw_ssi_on_given_canvas = function(canvas_context){

	canvas_context.drawImage(this.bar_canvas,
	this.x, 
	this.y,
	this.bar_canvas.width,
	this.bar_canvas.height);

	return canvas_context;

};

// Drag_Bar.prototype.selected = function(selected){

// 	//so that you dont have to always be doing these over again
// 	if(this.has_been_selected != selected){ 

// 		var tmp_ctx = this.bar_canvas.getContext("2d");

// 		if(selected){
// 			tmp_ctx.fillStyle = this.selected_color;
// 			tmp_ctx.fillRect(0,0,this.w,this.h);
// 		}
// 		else{
// 			tmp_ctx.fillStyle = this.not_selected_color;
// 			tmp_ctx.fillRect(0,0,this.w,this.h);
// 		}

// 		this.has_been_selected = selected;
// 	}	

// };

Drag_Bar.prototype.selected = function(selected){

	//so that you dont have to always be doing these over again
	if(this.has_been_selected != selected){ 

		if(selected){
			this.set_as_selected();
		}
		else{
			this.set_as_not_selected();
		}

	}	

};

//works
Drag_Bar.prototype.set_as_selected = function(){
	var tmp_ctx = this.bar_canvas.getContext("2d");
	tmp_ctx.fillStyle = this.selected_color;
	tmp_ctx.fillRect(0,0,this.w,this.h);
	this.has_been_selected = true;
};

//works
Drag_Bar.prototype.set_as_not_selected = function(){
	var tmp_ctx = this.bar_canvas.getContext("2d");
	tmp_ctx.fillStyle = this.not_selected_color;
	tmp_ctx.fillRect(0,0,this.w,this.h);
	this.has_been_selected = false;
}

Drag_Bar.prototype.drag_me = function(mouse_x,mouse_y,mlc) {


	//if the mouse was over the box, but not clicking (this looks better)
	if(this.mouse_intersects(mouse_x,mouse_y) && mlc == false){
		this.hover_but_no_click_before = true;
		// //console.log("hover but no click");
		// this.object_border_current_color = this.obcw_mouse_hover;

	}

	//if there is no click, set first_click_x and first_click_x to null (aka clear them) (working!)
	if(!mlc){

		this.proper_click = false; //set to false only if there is no longer a click

		//console.log("resetting first_click values");
		this.first_click_x =  null;
		this.first_click_y =  null;

		//if they stopped holding down on the left mouse button AND moved off of the square, I don't
		//want them to then have the error of moving off of the square AND THEN being able to just
		//hold down the left mouse button, scroll over the square, and then all of a sudden be 
		//accidentally dragging the square around. 
		if(!this.mouse_intersects(mouse_x,mouse_y)){
			this.hover_but_no_click_before = false;
			//console.log("no longer over object");
			//this.object_border_current_color = this.obcw_inactive;
		}

		//console.log("getting in here");
		this.set_as_not_selected();
	}

	//works
	//console.log("this.hover_but_no_click_before is: " + this.hover_but_no_click_before);

	//if you are properly clicking on the square (in order to drag it)... 
	//AND we've seen a proper first click before (by setting first_click_x and first_click_y
	//to the mouse values)

	var tmp = (this.properly_clicked(mouse_x,mouse_y) && this.have_seen_proper_first_click_before());
	//console.log("tmp is: " + tmp);


	if(this.have_seen_proper_first_click_before() || this.proper_click){
	//if(this.properly_clicked(mouse_x,mouse_y) && this.have_seen_proper_first_click_before()){

		this.object_border_current_color = this.obcw_mouse_click;

		this.proper_click = true;

		//difference between first click and upper left hand corner of object
		//ie corner of square is (10,10) and first click was (24,30) aka (14,20)
		var diff_x1 = this.first_click_x - this.x;
		var diff_y1 = this.first_click_y - this.y;

		// console.log("diff_x1 is: " + diff_x1);
		// console.log("diff_y1 is: " + diff_y1);

		//diff between the new location and the upper left hand corner of the object. 
		//ie (45,30) - (10,10) = (35,20)
		var diff_x2 = mouse_x - this.x;
		var diff_y2 = mouse_y - this.y;

		// console.log("diff_x2 is: " + diff_x2);
		// console.log("diff_y2 is: " + diff_y2);
	
		//calculate differences neede to shift all the rest of the points of the square relative
		//to where the user initially clicked.  
		//ie (35,20) - (14,20) = (21,0)
		//aka shift the whole thing over 21 on the x-axis. 
		var change_x_by = diff_x2 - diff_x1;
		var change_y_by = diff_y2 - diff_y1;

		// console.log("diff_y1 is: " + diff_y1);
		// console.log("diff_y1 is: " + diff_y1);

		//update the x and y values.
		this.x += change_x_by;
		this.y += change_y_by;

		// console.log("this.x is now: " + this.x);
		// console.log("this.y is now: " + this.y);


		//finally, set first_click_x and first_click_y to the current x and y values. 
		//because then, on the next iteration of the code, if the mouse hasn't moved, 
		//then all the values should stay the same. 
		this.first_click_x = mouse_x;
		this.first_click_y = mouse_y;

		// console.log("this.first_click_x is now: " + this.first_click_x);
		// console.log("this.first_click_y is now: " + this.first_click_y);

		this.set_as_selected();


	}
	//if it was clicked on, and we haven't seen an initial click(aka both this.first_click_x and
	//this.first_click_y are null)...set the values. 
	else if(this.properly_clicked(mouse_x,mouse_y) && this.first_click_x == null){

		this.first_click_x =  mouse_x;
		this.first_click_y =  mouse_y;

		//this.set_as_selected();

	}


};


Drag_Bar.prototype.properly_clicked = function(mouse_x,mouse_y) {

	if(this.hover_but_no_click_before && this.mouse_intersects(mouse_x,mouse_y)){
		return true;
	}

	return false;
}

Drag_Bar.prototype.have_seen_proper_first_click_before = function() {

	return this.first_click_x != null ? true : false;
}

Drag_Bar.prototype.draw_ssi = function(){

	ctx.drawImage(this.bar_canvas,
	this.x, 
	this.y,
	this.bar_canvas.width,
	this.bar_canvas.height);


};
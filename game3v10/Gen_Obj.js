

// function Gen_Obj(x, y, w, h, picture_name) {
// function Gen_Obj(x_and_y, w_and_h, pic_name,pic_dimensions) {
function Gen_Obj(x_and_y, pic_name,pic_dimensions) {

	//console.log("zonkers");

    this.x = x_and_y[0];
    this.y = x_and_y[1];

    //unlike the values in pic_dimensions, w and h will represent both the size
    //of the icon on the screen itself (as opposed to what it is on its original canvas)
    //and by association, the dimensions to be checked when it comes to the mouse interactions
    //with the object 
    Gen_Obj.h = 40;
    Gen_Obj.w = 40;
    this.w = Gen_Obj.w;
    this.h = Gen_Obj.h;
    // this.h = 40;
    // this.w = 40;
    // this.h = this.h;
    // this.w = this.w;


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

	this.img=document.getElementById(pic_name);

	//width and height here are actual dimensions on canvas
	this.ssi = new SSI();	
	this.ssi.set_x_y_w_and_h(pic_dimensions);

	this.display_border = true;
	this.obt = 3;//object border thickness

	//obcw == object border color when...
	this.obcw_inactive = 'black';
	this.obcw_mouse_hover = 'yellow';
	this.obcw_mouse_click = 'red';
	this.object_border_current_color = this.obcw_inactive;//basically null.

	//I (think!) that this is about drawing the object on the current canvas
	//that it is on. and this.x, this.y are about the general/global canvas that
	//everything is on. 
	this.draw_at_x = 0;
	this.draw_at_y = 0;

};


Gen_Obj.prototype.set_offsets = function(x_offset,y_offset) {

	// console.log("x_offset is: " + x_offset);
	// console.log("y_offset is: " + y_offset);

	this.x = this.x + x_offset;
	this.y = this.y + y_offset;

};

// Gen_Obj.prototype.set_offsets = function(offset_array) {

// 	this.x += offset_array[0];
// 	this.y += offset_array[1];

// };


//note: I don't need this method for a gen_object. However, I DO need it (or something like it)
//for the menu
// RECTANGLE.prototype.intersects = function(other) {

Gen_Obj.prototype.mouse_intersects = function(mouse_x,mouse_y) {

	// console.log("(mouse_intersects) this.x is: " + this.x);
	// console.log("(mouse_intersects) this.y is: " + this.y);

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

// var mx = 0;
// var my = 0;
// var lmc = false; //left mouse click


Gen_Obj.prototype.properly_clicked = function(mouse_x,mouse_y) {

	if(this.hover_but_no_click_before && this.mouse_intersects(mouse_x,mouse_y)){
		return true;
	}

	return false;
}

Gen_Obj.prototype.have_seen_proper_first_click_before = function() {

	return this.first_click_x != null ? true : false;
}

//is true if we see a proper click. is only false when the mouse is no longer
//being held down. 
//var proper_click = false;



// Gen_Obj.prototype.set_to_inactive = function() {

// 	this.object_border_current_color = this.obcw_inactive;

// }
Gen_Obj.prototype.conditions_were_met_to_start_dragging = function(mouse_x,mouse_y) {


	//if the mouse was over the box, but not clicking (this looks better)
	if(this.mouse_intersects(mouse_x,mouse_y) && mlc == false){
		this.hover_but_no_click_before = true;
		//console.log("hover but no click");
		this.object_border_current_color = this.obcw_mouse_hover;//yellow

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

		//var val = !this.mouse_intersects(mouse_x,mouse_y);

		//console.log("false if it does not interset: " + val);

		if(!this.mouse_intersects(mouse_x,mouse_y)){
			this.hover_but_no_click_before = false;
			//console.log("no longer over object");
			this.object_border_current_color = this.obcw_inactive;//black
		}
		
		//console.log("getting here much?");
		//return false;
	}

	if(this.have_seen_proper_first_click_before() || this.proper_click){

		//body of this was put into make_movement_changes

		return true;
	}
	//if it was clicked on, and we haven't seen an initial click(aka both this.first_click_x and
	//this.first_click_y are null)...set the values. 
	else if(this.properly_clicked(mouse_x,mouse_y) && this.first_click_x == null){

		this.first_click_x =  mouse_x;
		this.first_click_y =  mouse_y;

		//return false;

	}

	//the returns here are for Ground_Item_Displayer
	return false;
};

Gen_Obj.prototype.make_movement_changes = function(mouse_x,mouse_y) {

		//console.log("seeing this a bunch");
		this.object_border_current_color = this.obcw_mouse_click;

		this.proper_click = true;

		// console.log("---------------------");
		// console.log("this.x is: " + this.x);
		// console.log("this.y is: " + this.y);
		// console.log("this.first_click_x is: " + this.first_click_x);
		// console.log("this.first_click_y is: " + this.first_click_y);
		// console.log("mouse_x is: " + mouse_x);
		// console.log("mouse_y is: " + mouse_y);


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

};

//------------------------------------------------------

Gen_Obj.prototype.drag_me = function(mouse_x,mouse_y) {

	//console.log("lmc is: " + lmc);

	//console.log("this.hover_but_no_click_before is: " + this.hover_but_no_click_before);

	//console.log("this.mouse_intersects(mouse_x,mouse_y) is: " + this.mouse_intersects(mouse_x,mouse_y));

	//if the mouse was over the box, but not clicking (this looks better)
	if(this.mouse_intersects(mouse_x,mouse_y) && mlc == false){
		this.hover_but_no_click_before = true;
		//console.log("hover but no click");
		this.object_border_current_color = this.obcw_mouse_hover;//yellow

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

		var val = !this.mouse_intersects(mouse_x,mouse_y);

		//console.log("false if it does not interset: " + val);

		if(!this.mouse_intersects(mouse_x,mouse_y)){
			this.hover_but_no_click_before = false;
			//console.log("no longer over object");
			this.object_border_current_color = this.obcw_inactive;//black
		}
		
		//console.log("getting here much?");
	}

	//for testing only
	//if(lmc){console.log("see click!");}

	//works
	//console.log("this.hover_but_no_click_before is: " + this.hover_but_no_click_before);

	//if you are properly clicking on the square (in order to drag it)... 
	//AND we've seen a proper first click before (by setting first_click_x and first_click_y
	//to the mouse values)

	//var tmp = (this.properly_clicked(mouse_x,mouse_y) && this.have_seen_proper_first_click_before());
	//console.log("tmp is: " + tmp);

	if(this.have_seen_proper_first_click_before() || this.proper_click){
	//if(this.properly_clicked(mouse_x,mouse_y) && this.have_seen_proper_first_click_before()){

		//console.log("getting here a lot");
		this.object_border_current_color = this.obcw_mouse_click;

		this.proper_click = true;

		// console.log("---------------------");
		// console.log("this.x is: " + this.x);
		// console.log("this.y is: " + this.y);
		// console.log("this.first_click_x is: " + this.first_click_x);
		// console.log("this.first_click_y is: " + this.first_click_y);
		// console.log("mouse_x is: " + mouse_x);
		// console.log("mouse_y is: " + mouse_y);


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

		return true;
	}
	//if it was clicked on, and we haven't seen an initial click(aka both this.first_click_x and
	//this.first_click_y are null)...set the values. 
	else if(this.properly_clicked(mouse_x,mouse_y) && this.first_click_x == null){

		this.first_click_x =  mouse_x;
		this.first_click_y =  mouse_y;

	}

	//the returns here are for Ground_Item_Displayer
	return false;
};

Gen_Obj.prototype.draw_ssi = function(){

	ctx.drawImage(

		this.img,
		this.ssi.start_of_ssi_x,
		this.ssi.start_of_ssi_y,
		this.ssi.s_width,
		this.ssi.s_height,
		this.x, 
		this.y,
		this.w,
		this.h);

	if(this.display_border){

		ctx.rect(this.x, 
				this.y,
				this.w,
				this.h);

		ctx.strokeStyle = this.object_border_current_color;

		ctx.lineWidth= "" + this.obt;

		ctx.stroke();
	}


};

Gen_Obj.prototype.draw_ssi_in_box = function(canvas){

	canvas.drawImage(this.img,
		this.ssi.start_of_ssi_x,
		this.ssi.start_of_ssi_y,
		this.ssi.s_width,
		this.ssi.s_height,
		this.x, 
		this.y,
		this.w,
		this.h);

	if(this.display_border){

		canvas.rect(this.x, 
				this.y,
				this.w,
				this.h);

		canvas.strokeStyle = this.object_border_current_color;

		canvas.lineWidth= "" + this.obt;

		canvas.stroke();
	}


};

Gen_Obj.prototype.draw_item_in_box = function(box){

	var reduce_size_by = 10

	//lets say the box has a width of 50
	//the item with a width of 40 
	//50 - 40 is 10. 
	//that gets you how much bigger the box is than the item
	//divide 10 by 2 (getting you 5) tells you how much space
	//there should be on each side of the box (width wise)
	//the final "+ box.x" accounts for where the box is on the screen.
	//so basically we're taking the extra space from one side (5...10 is both sides)
	//and then adding it to the x value of the box...thus hopefully adjusting the 
	//x value properly 
	//(now do the same basic thing with y!!)

	this.x = (box.width - this.width)/2 + box.x; 

	//note: setting the x and y values to the results so that the object 
	//knows where it (at least initially) is.

	this.y = (box.height - this.height)/2 + box.y;

	ctx.drawImage(this.img,
		this.ssi.start_of_ssi_x,
		this.ssi.start_of_ssi_y,
		this.ssi.s_width,
		this.ssi.s_height,
		this.x, 
		this.y,
		this.w - reduce_size_by,
		this.h - reduce_size_by);

};

//upper left corner
Gen_Obj.prototype.ulc = function(){
	return [this.x,this.y];
};

//lower left corner
Gen_Obj.prototype.llc = function(){
	return [this.x,this.y + this.h];
};

//upper right corner
Gen_Obj.prototype.urc = function(){
	return [this.x + this.w,this.y];
};

//lower right corner
Gen_Obj.prototype.lrc = function(){
	return [this.x + this.w , this.y + this.h];
};


// Gen_Obj.prototype.draw_on_inventory_rect = function(inv_rect_ctx){

// 	inv_rect_ctx.drawImage(this.img,
// 		this.ssi.start_of_ssi_x,
// 		this.ssi.start_of_ssi_y,
// 		this.ssi.s_width,
// 		this.ssi.s_height,
// 		this.x, 
// 		this.y,
// 		this.w,
// 		this.h);

// 	if(this.display_border){

// 		inv_rect_ctx.rect(this.x, 
// 				this.y,
// 				this.w,
// 				this.h);

// 		inv_rect_ctx.strokeStyle = this.object_border_current_color;

// 		inv_rect_ctx.lineWidth= "" + this.obt;

// 		inv_rect_ctx.stroke();
// 	}

// 	return inv_rect_ctx;


// };

Gen_Obj.prototype.draw_on_inventory_rect = function(inv_rect_ctx){

	inv_rect_ctx.drawImage(this.img,//the image
		this.ssi.start_of_ssi_x,//where to go (x wise) on this.img to get the image
		this.ssi.start_of_ssi_y,//where to go (y wise) on this.img to get the image
		this.ssi.s_width,//the width (on the this.img canvas) of the image that we want.
		this.ssi.s_height,//the height (on the this.img canvas) of the image that we want.
		this.draw_at_x, //where (x wise, on the GIVEN canvas) we are to draw this stuff 
		this.draw_at_y, //where (y wise, on the GIVEN canvas) we are to draw this stuff 
		this.w, //how wide on the given canvas to draw it
		this.h); //how tall on the given canvas to draw it

	if(this.display_border){

		inv_rect_ctx.rect(this.draw_at_x, 
				this.draw_at_y,
				this.w,
				this.h);

		inv_rect_ctx.strokeStyle = this.object_border_current_color;

		inv_rect_ctx.lineWidth= "" + this.obt;

		inv_rect_ctx.stroke();
	}

	return inv_rect_ctx;


};

//loc should be at the persons feet. 
//so for a person, whatever x is, is probably right, but new_loc_y should 
//be something like y of char + height, + a tiny buffer (for looks)
Gen_Obj.prototype.set_at_owners_loc = function(new_loc_x,new_loc_y,perp_h){

	//this is for looks alone. thought that a little buffer would look better. 
	var buffer = 5;

	//console.log("perp_h is: " + perp_h);
	this.x = new_loc_x;
	this.y = new_loc_y + perp_h + buffer;
	this.draw_at_x = new_loc_x;
	this.draw_at_y = new_loc_y + perp_h + buffer;
};


Gen_Obj.prototype.turn_off_dragging = function(){
	this.proper_click = false;
	this.first_click_x = null;
	this.hover_but_no_click_before = false;

	//note: this might be a dirty hack. this line is to get it to turn
	//from red (object has the mouse holding it) to black (inactive).
	//the fact that it turned back and stayed black (rather than flickering
	//back and forth between black and red as I expected it to) tells me however
	//that there is probably just something wrong with the code, and turning it
	//black like this is probably fine. 
	this.object_border_current_color = this.obcw_inactive;
};
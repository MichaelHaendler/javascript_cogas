
//both graphic and not graphics
//So I am making the code for both the up button AND the menu button

/*
idea: 

make graphic button

make text button. 

possibly combine the classes later on ;-) 
*/
function Gen_Button(spirte_sheet_yn,x,y,w,h){

	//is for asking if this button is going to use a spirte sheet or not. 
	this.uses_sprite_sheet = spirte_sheet_yn;

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	//used to get the not clicked image
	this.ssi_reg = new SSI();

	//used to get the clicked image
	this.ssi_clicked = new SSI();

	//'this.ssi' will either be used to show ssi_reg or ssi_clicked image. (default is not clicked)
	this.ssi = this.ssi_reg

	/////////////////////////////
	this.chance_for_proper_click = true;

};


Gen_Button.prototype.mouse_intersects = function(mouse_x,mouse_y) {
	//console.log('here');

	//if the upper left hand x coord is beyond the end of
	//the big square (x being it's starting place, w taking us to the end)
	//then there is no way we are inside 
    if (mouse_x > this.x + this.ssi.destination_width) {

    	//console.log("returning false on: (mouse_x > this.x + this.w) ");
        return false;
    }

    //if the upper left hand y coord is lower then the bottom of the big square 
    //(aka the y plus the h, taking us to the bottom) then there is no way that 
    //it is within the square
    if (mouse_y > this.ssi.y + this.ssi.destination_height) {
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


Gen_Button.prototype.choose_graphic = function(mouse_x,mouse_y,mlc) {

	// var results = this.mouse_intersects(mouse_x,mouse_y);
	// var results = this.proper_mouse_left_click(mouse_x,mouse_y,mlc);

	// pw.AddToList("this.proper_mouse_left_click(mouse_x,mouse_y,mlc) is: " + results);

	if(this.proper_mouse_left_click(mouse_x,mouse_y,mlc)){
		this.ssi = this.ssi_clicked;
	}
	else{
		this.ssi = this.ssi_reg;
	}

};

Gen_Button.prototype.draw_ssi = function() {

	if(this.uses_sprite_sheet){
		ctx.drawImage(this.img,
			this.ssi.start_of_ssi_x,
			this.ssi.start_of_ssi_y,
			this.ssi.s_width,
			this.ssi.s_height,
			this.x, 
			this.y,
			this.ssi.destination_width,
			this.ssi.destination_height);

	}
	else{

	}

};


Gen_Button.prototype.proper_mouse_left_click = function() {

	var mouse_x = mx;
	var mouse_y = my;
	var mouse_left_click = mlc;

	// pw.AddToList("(proper_mouse_left_click)");

	// pw.AddToList("this.chance_for_proper_click is: " + this.chance_for_proper_click);
	// pw.AddToList("this.mouse_intersects(mouse_x,mouse_y)  is: " + this.mouse_intersects(mouse_x,mouse_y));
	// pw.AddToList("mlc is: " + mlc);

	if(this.chance_for_proper_click && this.mouse_intersects(mouse_x,mouse_y) && mouse_left_click){
		//console.log("got into here!!");
		//this.show_small_button = true;
		return true;
	}

    //if we had seen the mouse inside of the square, and there was no mlc, say that it's
    //possible now for there to be a proper mouse click. 
    if(this.mouse_intersects(mouse_x,mouse_y) && !mouse_left_click){
    	//this.show_small_button = false;
        this.chance_for_proper_click = true;
    }

    //if we had seen the potential for a proper mouse click, but we dont have a mlc, and
    //we aren't in the square, clear proper_click. could however have 
    else if(this.chance_for_proper_click && !mouse_left_click && !this.mouse_intersects(mouse_x,mouse_y)){
    	//this.show_small_button = false;
        this.chance_for_proper_click = false;   
    }

    return false; //obviously otherwise it isn't in the right conditions. 

};
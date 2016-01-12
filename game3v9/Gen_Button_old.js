
/*
(sighs)

this needs work...and I dont have the patience right now to do it. 

probably going to rename this something like 'sub_button' and then make
a new class called "Gen_Button" (new) Gen_Button, will be better built for 
2 graphics for the button stuff. basically, it will consist of two sub_button
instances. can probably delete and remove some stuff from here, and can then
put it into new class. 

lots of moving around and stuff. for now though...button BASICALLY works. 

important note: the current big bug of it constantly going back and forth 
between big and small graphic might have to do with keeping track of whether
or not the mouse is still on the graphic
*/

// function Gen_Button(x,y,w,h,dw,dh,pic_name_reg,pic_name_clicked){
function Gen_Button(x,y){

	//loc on canvas
	this.x = x;
	this.y = y;
	// this.dw = w;//width...on canvas
	// this.dh = h;//height...on canvas


	//still need x and y from sheet, as well as width and height of image

	//used to get the not clicked image
	this.ssi_reg = new SSI();

	//used to get the clicked image
	this.ssi_clicked = new SSI();

	//'this.ssi' will either be used to show ssi_reg or ssi_clicked image.
	this.ssi = null;

	this.chance_for_proper_click = false;

	// this.img_reg=null;//when not clicked
	// this.img_click=null;//when clicked
	this.img = null;//var to differentiate between clicked and not clicked

	//LOL!!! god this is awful coding. need to some point go back and do something better.
	this.small_button_x = 0;
	this.small_button_y = 0;

	this.show_small_button = true;




	// //used to get the not clicked image
	// this.ssi_reg = new SSI();
	// this.ssi_reg.set_x_y_w_h_dw_and_dh(x,y,w,h,dw,dh);

	// //used to get the clicked image
	// this.ssi_clicked = new SSI();
	// this.ssi_clicked.set_x_y_w_h_dw_and_dh(x,y,w,h,dw,dh);

	// //'this.ssi' will either be used to show ssi_reg or ssi_clicked image.
	// this.ssi = this.ssi_reg;

	// this.proper_click = false;

	// this.img_reg=document.getElementById(pic_name_reg);//when not clicked
	// this.img_click=document.getElementById(pic_name_clicked);//when clicked
	// this.img = this.img_reg; //var to differentiate between clicked and not clicked

};
Gen_Button.prototype.set_small_buttons_x_and_y = function() {

	var diff_w = this.ssi_reg.destination_width - this.ssi_clicked.destination_width;
	var diff_h = this.ssi_reg.destination_height - this.ssi_clicked.destination_height;
	this.small_button_x = this.x + (diff_w/2);
	this.small_button_y = this.y + (diff_h/2);
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

//if inside and not mlc, set been inside and not down variable to true.
//set to false...when?

//need to do the test again once it's outside the square AND is no longer
//holding the mlc button down. 



//a start
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

	// pw.AddToList("this.ssi.start_of_ssi_x is: " + this.ssi.start_of_ssi_x);
	// pw.AddToList("this.ssi.start_of_ssi_y is: " + this.ssi.start_of_ssi_y);
	// pw.AddToList("this.ssi.s_width is: " + this.ssi.s_width);
	// pw.AddToList("this.ssi.s_height is: " + this.ssi.s_height);
	// pw.AddToList("this.x is: " + this.x);
	// pw.AddToList("this.y is: " + this.y);
	// pw.AddToList("this.ssi.destination_width is: " + this.ssi.destination_width);
	// pw.AddToList("this.ssi.destination_height is: " + this.ssi.destination_height);
	// pw.AddToList("this.small_button_x is: " + this.small_button_x);
	// pw.AddToList("this.small_button_y is: " + this.small_button_y);
	// pw.AddToList("this.show_small_button is: " + this.show_small_button);

	//these 2 lines are for debugging only.
	// ctx.fillStyle = 'red';
	// ctx.fillRect(this.x,this.y,this.ssi.destination_width,this.ssi.destination_height);


	// if(this.show_small_button){

	// 	//console.log("small button");


	// 	ctx.drawImage(this.img,
	// 		this.ssi.start_of_ssi_x,
	// 		this.ssi.start_of_ssi_y,
	// 		this.ssi.s_width,
	// 		this.ssi.s_height,
	// 		this.small_button_x, 
	// 		this.small_button_y,
	// 		this.ssi.destination_width,
	// 		this.ssi.destination_height);

	// }
	// else{

	// 	//console.log("large button");

		ctx.drawImage(this.img,
			this.ssi.start_of_ssi_x,
			this.ssi.start_of_ssi_y,
			this.ssi.s_width,
			this.ssi.s_height,
			this.x, 
			this.y,
			this.ssi.destination_width,
			this.ssi.destination_height);

	//}




};

Gen_Button.prototype.proper_mouse_left_click = function(mouse_x,mouse_y,mlc) {

	// pw.AddToList("(proper_mouse_left_click)");

	// pw.AddToList("this.chance_for_proper_click is: " + this.chance_for_proper_click);
	// pw.AddToList("this.mouse_intersects(mouse_x,mouse_y)  is: " + this.mouse_intersects(mouse_x,mouse_y));
	// pw.AddToList("mlc is: " + mlc);

	if(this.chance_for_proper_click && this.mouse_intersects(mouse_x,mouse_y) && mlc){
		//console.log("got into here!!");
		//this.show_small_button = true;
		return true;
	}

    //if we had seen the mouse inside of the square, and there was no mlc, say that it's
    //possible now for there to be a proper mouse click. 
    if(this.mouse_intersects(mouse_x,mouse_y) && !mlc){
    	//this.show_small_button = false;
        this.chance_for_proper_click = true;
    }

    //if we had seen the potential for a proper mouse click, but we dont have a mlc, and
    //we aren't in the square, clear proper_click. could however have 
    else if(this.chance_for_proper_click && !mlc && !this.mouse_intersects(mouse_x,mouse_y)){
    	//this.show_small_button = false;
        this.chance_for_proper_click = false;   
    }

    return false; //obviously otherwise it isn't in the right conditions. 

};


Gen_Button.prototype.set_sheet = function(name){

	this.img = document.getElementById(name);

};

//the x and y gets you the loc on canvas
//the w and h gets you the pictures ACTUAL width and height
//the dw and dh are to be what it's supposed to be on the 
//screen (note, will just do this part in Gen_Button). 
Gen_Button.prototype.set_reg_image = function(x,y,w,h,dw,dh){
	this.ssi_reg.set_x_y_w_h_dw_and_dh(x,y,w,h,dw,dh);
	//this.ssi = this.ssi_reg;//NEED TO UNDO!!
};

Gen_Button.prototype.set_clicked_image = function(x,y,w,h,dw,dh){
	this.ssi_clicked.set_x_y_w_h_dw_and_dh(x,y,w,h,dw,dh);
	this.ssi = this.ssi_clicked;//temp
};

Gen_Button.prototype.set_x_and_y = function(x,y){

 	this.x = x;
 	this.y = y;
};


Gen_Button.prototype.show_sheet_test = function(){

 	ctx.drawImage(this.img,0,0);
};


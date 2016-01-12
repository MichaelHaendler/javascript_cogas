

//designed to hold **ONE** item.
//holding multiple items to be done somewhere else. 

//static variables. are global for things like inventory_rect
//so that I dont have to create an instance just to get w and h
//of Stuff_Box. 
Stuff_Box.w = 50;
Stuff_Box.h = 50;

function Stuff_Box(){

	this.item = null;

	//this.y = 150;
	//this.x = 150;
	// Stuff_Box.w = 50;
	// Stuff_Box.h = 50;

   // if (typeof Stuff_Box.w === 'undefined')
   //    Stuff_Box.w = 50;
   // if (typeof Stuff_Box.h === 'undefined')
   //    Stuff_Box.h = 50;

	this.x = 0;
	this.y = 0;
	this.w = Stuff_Box.w;
	this.h = Stuff_Box.h;

	this.ssi = new SSI();	
	this.ssi.set_x_y_w_and_h([this.x,this.y,this.w,this.h]);

	//0 so if there's no offset, adding it wont do anything. 
	this.offset_x = 0;
	this.offset_y = 0;

	//for debugging purposes (when in inventory rect) only. 
	this.d_name = "";

	this.draw_at_x = 0;
	this.draw_at_y = 0;


};

Stuff_Box.prototype.set_offsets = function(x,y){
	this.offset_x += x;
	this.offset_y += y;
}


// Stuff_Box.prototype.add_item = function(new_item,mlc){
Stuff_Box.prototype.add_item = function(new_item){

	// pw.AddToList("this.contains_a_quarter_or_more(new_item) is: " + this.contains_a_quarter_or_more(new_item));
	// pw.AddToList("mlc is: " + mlc);

	// if(this.contains_a_quarter_or_more(new_item)){
	// 	var amount = this.percentage_filled_by_item(new_item);
	// 	pw.AddToList("amount is: " + amount);
	// }else{
	// 	pw.AddToList("not in there");
	// }

	var enough_of_the_box_is_filled = this.percentage_filled_by_item(new_item) >= .10;


	//if an item is a 3rd or more in the box...and the mlc is false, 
	//and there is no item already there, put it in ;-) 
	//if(this.contains_a_quarter_or_more(new_item) && mlc == false && this.item == null){
	  if(enough_of_the_box_is_filled && mlc == false && this.item == null){

		//console.log("ADDING ITEM!!!!!!!!!!");
		//add item;
		this.item = new_item;
		//remove from general existence
		// global_item = null;
		gen_obj = null;

		//and tell the item it's new coordinates (need to do)

		var w_diff = this.w - new_item.w;
		var h_diff = this.h - new_item.h;

		this.item.x = this.x + (w_diff/2);
		this.item.y = this.y + (h_diff/2);

		this.item.x = this.x + (w_diff/2);
		this.item.y = this.y + (h_diff/2);

	}

};

/*
x for the object (once inside stuff_box) needs to be stuff_box.x + (stuff_box.w/2)
y for the object (once inside stuff_box) needs to be stuff_box.y + (stuff_box.y/2)
*/

Stuff_Box.prototype.take_item = function(mouse_x,mouse_y,mlc){

	//if there even is an item in there, andthe box contains the mouse, 
	//and the item contains the mouse, and there wasn't a left click but 
	//now is...give the item to the user


	// if(this.mouse_intersects(mouse_x,mouse_y) && this.item != null && 
	//    this.item.properly_clicked(mouse_x,mouse_y)){

	// if(this.item != null){
	// pw.AddToList("this item is not empty");
	// pw.AddToList("this.mouse_intersects(mouse_x,mouse_y) is: " + this.mouse_intersects(mouse_x,mouse_y));
	// pw.AddToList("this.item.mouse_intersects(mouse_x,mouse_y) is: " + this.item.mouse_intersects(mouse_x,mouse_y));
	// pw.AddToList("this.item.properly_clicked(mouse_x,mouse_y) is: " + this.item.properly_clicked(mouse_x,mouse_y));

	// }
	// else{
	// 	pw.AddToList("this item IS empty");

	// }

	if(this.item != null &&
		this.mouse_intersects(mouse_x,mouse_y) && 
		this.item.mouse_intersects(mouse_x,mouse_y) && 
	   this.item.properly_clicked(mouse_x,mouse_y)){


		//add item back into general area; 
		global_item = this.item;
		//and then remove item from box; 
		this.item = null;

	}


};




//the mouse is what you were bringing in, and the "this" was the response. 
Stuff_Box.prototype.mouse_intersects = function(mouse_x,mouse_y) {

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

Stuff_Box.prototype.draw_ssi = function(){

	// ctx.rect(this.x, 
	// 		this.y,
	// 		this.w,
	// 		this.h);

	// ctx.strokeStyle = "gray";

	// var my_gradient=ctx.createLinearGradient(0,0,0,170);
	// my_gradient.addColorStop(0,"black");
	// my_gradient.addColorStop(1,"white");

	// ctx.fillStyle=my_gradient;

	ctx.fillStyle="gray";

	ctx.fillRect(this.draw_at_x,this.draw_at_y,this.w,this.h);

	ctx.stroke();

	// if(this.item != null){

	// 	this.item.draw_item_in_box(this);
	// }

	if(this.item != null){

		this.update_item_loc();
		this.item.draw_ssi();
	}



};

/*
x for the object (once inside stuff_box) needs to be stuff_box.x + (stuff_box.w/2)
y for the object (once inside stuff_box) needs to be stuff_box.y + (stuff_box.y/2)
*/


Stuff_Box.prototype.update_item_loc = function(){

	var w_diff = this.w - this.item.w;
	var h_diff = this.h - this.item.h;

	this.item.x = this.x + (w_diff/2);
	this.item.y = this.y + (h_diff/2);

}



Stuff_Box.prototype.contains_item = function(item){

	//var total = this.w * this.h;

	if(item != null){

		var total = (this.x + this.w) * (this.y + this.h);


		//upper left hand corner
		var x = item.x;

		var y = item.y;

		if(this.contains_point(x,y)){
			return true;
		}


		//upper right hand corner
		var x = item.x + item.w;

		var y = item.y;

		if(this.contains_point(x,y)){
			return true;
		}

		//lower left hand corner 
		var x = item.x;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			return true;
		}

		//lower right hand corner
		var x = item.x + item.w;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			return true;
		}

	}

	return -1; //not in there and/or something went wrong. 
};


Stuff_Box.prototype.contains_point = function(x,y) {
	return this.mouse_intersects(x,y);
};

Stuff_Box.prototype.empty = function(item){
	return !this.item;
};





////////////////////

Stuff_Box.prototype.contains_a_quarter_or_more = function(new_item){

	//array exists basically to shorten the code (so that I
	//wouldn't need 8 if statements)
	var array = [];

	//note: the name attribute each one has is really just for debugging
	//purposes. 

	//upper left square
	var sq1 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq1",
		sect: "upper left quarter"
	};

	array.push(sq1);

	//lower left square
	var sq2 = {
		x: new_item.x,
		y: new_item.y + new_item.h/2,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq2",
		sect: "lower left quarter"
	};

	array.push(sq2);

	//upper right square
	var sq3 = {
		x: new_item.x + new_item.w/2,
		y: new_item.y,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq3",
		sect: "upper right quarter"
	};

	array.push(sq3);

	//lower right square
	var sq4 = {
		x: new_item.x + new_item.w/2,
		y: new_item.y + new_item.h/2,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq4",
		sect: "lower right corner"
	};

	array.push(sq4);

	//----------------------------------------
	//below are to be thought of as rectangles found within the square. 

	//left side row/rectangle/quarter
	var sq5 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w/4,
		h: new_item.h,
		name: "sq5",
		sec: "left side rect"
	};	

	array.push(sq5);

	//(far) right side row/rectangle/quarter 
	var sq6 = {
		x: new_item.x + ((new_item.w/4) * 3),
		y: new_item.y,
		w: new_item.w/4,
		h: new_item.h,
		name: "sq6",
		sect: "right side rect"
	};

	array.push(sq6);

	//top row/rectangle/quarter. 
	var sq7 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w,
		h: new_item.h/4,
		name: "sq7",
		sect: "top rect"
	};	

	array.push(sq7);

	//bottom row/rectangle/quarter. 
	var sq8 = {
		x: new_item.x,
		y: new_item.y + ((new_item.h/4) * 3),
		w: new_item.w,
		h: new_item.h/4,
		name: "sq8",
		sect: "bottom rect"
	};	

	array.push(sq8);

	//idea: make the 4 types as whole square, and just check em one by one
	//in another method called something like "contains_whole_thing" if none
	//of those return true, just return false. ;-)  

	if(this.contains_whole_thing(sq1)){
		//console.log("sq1 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq2)){
		//console.log("sq2 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq3)){
		//console.log("sq3 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq4)){
		//console.log("sq4 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq5)){
		//console.log("sq5 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq6)){
		//console.log("sq6 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq7)){
		//console.log("sq7 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq8)){
		//console.log("sq8 returning true");
		return true;
	}

	//once above code is working...delete it, and use this instead: 
	// for(var i = 0; i < array.length; i++){
	// 	var tmp_sq = array[i];
	// 	if(this.contains_whole_thing(tmp_sq)){
	// 		//console.log(tmp_sq.name + " is returning true");
	// 		return true;
	// 	}
	// }

	//console.log("returning false");

	return false; 


};

Stuff_Box.prototype.contains_whole_thing = function(sq) {

	// console.log(sq.name);
	// console.log(sq.sect);

	//if the x is less than 
	if(((sq.x > this.x) && (sq.x < this.x + this.w)) && 
		((sq.x + sq.w < this.x + this.w) && (sq.x + sq.w > this.x)) &&
		((sq.y > this.y) && (sq.y < this.y + this.h)) && 
		((sq.y + sq.h > this.y) && (sq.y + sq.h < this.y + this.h))){
		return true;
	}
	return false;

};

//////////////////////////////////////////////////////////////////////////////////


//absolute value
Stuff_Box.prototype.abs = function(num){
	return num >= 0 ? num : (num * -1);
};

Stuff_Box.prototype.ulc = function(){
	return [this.x , this.y];
};

Stuff_Box.prototype.urc = function(){
	return [this.x + this.w, this.y];
};

Stuff_Box.prototype.llc = function(){
	return [this.x, this.y + this.h];
};

Stuff_Box.prototype.lrc = function(){
	return [this.x + this.w, this.y + this.h];
};

Stuff_Box.prototype.percentage_filled_by_item = function(item){

	// var dirty_backup_of_x = this.x;
	// var dirty_backup_of_y = this.y;

	// this.x = this.offset_x;
	// this.y = this.offset_y;

	// var dirty_hack_x = this.x;
	// var dirty_hack_y = this.y;



	// console.log("(Stuff_Box) got into percentage_filled_by_item");
	// console.log("this.x is: " + this.x);
	// console.log("this.y is: " + this.y);
	// console.log("item.x is: " + item.x);
	// console.log("item.y is: " + item.y);
	// console.log("this.offset_x is: " + this.offset_x);
	// console.log("this.offset_y is: " + this.offset_y);

	// pw.print("item.x is: " + item.x);
	// pw.print("item.y is: " + item.y);

	//upper left corner
	var ulc = this.contains_point(x = item.x,y = item.y);
	//upper right corner
	var urc = this.contains_point(x = item.x + item.w, y = item.y);
	//lower left corner
	var llc = this.contains_point(x = item.x,y = item.y + item.h);
	//lower right corner
	var lrc = this.contains_point(x = item.x + item.w, y = item.y + item.h);

	var total = this.w * this.h;


	//case 1:
	//sb == stuff box
	//(ulc of item entered sb via llc)
	if(ulc && !llc && !urc && !lrc){
		//console.log("case 1");
		//calc and return case 1

		//have the width and height end where the sb ends. 
		var width = (this.x + this.w) - item.x;
		var height = (this.y + this.h) - item.y;

		// console.log("total is: " + total);
		// console.log("width is: " + width);
		// console.log("height is: " + height);

		return (width * height) / total;

	}

	//case 2
	//urc (via llc of sb) inside of the sb.
	if(!ulc && !llc && urc && !lrc){
		//console.log("case 2");

		var width = (item.x + item.w) - this.x;
		var height = this.h - item.y; 

		return (width * height) / total;

	} 

	//case 3
	//llc (via urc of sb) inside of the sb.
	if(!ulc && llc && !urc && !lrc){
		//console.log("case 3");

		var width = (this.x + this.w) - (item.x + item.w);
		var height = (item.y + item.h) - (this.y - this.h); 

		return (width * height) / total;

	} 

	//case4
	//lrc (via urc of sb) inside of the sb.
	if(!ulc && !llc && !urc && lrc){
		//console.log("case 4");

		var width = (item.x + item.w) - this.x;

		var height = (item.y + item.h) - this.y

		return (width * height) / total;
	}

	//111111111111111111111111111111111111111


	//case5
	//urc and lrc are inside of sb 
	//top of item in sb 
	if(ulc && !llc && urc && !lrc){
		//console.log("case 5");

		var height = (this.y + this.h) - item.y;

		//pw.AddToList("height is: " + height);

		return (item.w * height) / total; 
	}	



	//case6
	//llc and lrc inside sb via top of sb
	//bottom of item in sb 
	if(!ulc && llc && !urc && lrc){
		//console.log("case 6");

		var height = (item.y + item.h) - this.y;

		return (item.w * height) / total;
	}

	
	//case 7
	//both ulc and llc are inside of the sb.
	//left side of item is in sb 
	if(ulc && llc && !urc && !lrc){
		//console.log("case 7");

		var width = (this.x + this.w) - item.x;

		return (width * item.h) / total;

	}

	//case 8
	//right side of item is in sb 
	if(!ulc && !llc && urc && lrc){
		//console.log("case 8");

		var width = (item.x + item.w) - this.x;

		return (width * item.h) / total;

	}

	//333333333333333333333333333333333333333333333333333


	//case 9 (done!)
	//whole square inside
	if(ulc && llc && urc && lrc){
		//console.log("case 9");

		// console.log("item.w is: " + item.w);
		// console.log("item.h is: " + item.h);
		// console.log("total is: " + total);

		return (item.w * item.h) / total;
	}

	return false;

};


Stuff_Box.prototype.contains_item = function(){
	return this.item != null ? true : false;
};

Stuff_Box.prototype.contains_mouse = function(mx,my){

	return this.mouse_intersects(mx,my);
};




Stuff_Box.prototype.draw_on_inventory_rect = function(inv_rect_ctx){

	inv_rect_ctx.fillStyle="gray";

	inv_rect_ctx.fillRect(this.draw_at_x,this.draw_at_y,this.w,this.h);

	// console.log("222 this.w is: " + this.w);
	// console.log("222 this.h is: " + this.h);

	inv_rect_ctx.stroke();

	// if(this.item != null){

	// 	this.item.draw_item_in_box(this);
	// }

	if(this.item != null){

		this.update_item_loc();
		this.item.draw_on_inventory_rect(inv_rect_ctx);
	}

	return inv_rect_ctx;
};













//designed to hold **ONE** item.
//holding multiple items to be done somewhere else. 

function Stuff_Box(){

	this.item = null;

	this.x = 150;
	this.y = 150;
	this.w = 50;
	this.h = 50;

	this.ssi = new SSI();	
	this.ssi.set_x_y_w_and_h([this.x,this.y,this.w,this.h]);

	this.seen_release_of_mlc = false;


};

// Stuff_Box.prototype.add_item = function(new_item,mlc){
Stuff_Box.prototype.add_item = function(new_item){

	pw.AddToList("this.percentage_filled_by_item(new_item) is: " + this.percentage_filled_by_item(new_item));
	pw.AddToList("mlc is: " + mlc);


	//if an item is a 3rd or more in the box...and the mlc is false, 
	//and there is no item already there, put it in ;-) 
	// if(this.contains_a_quarter_or_more(new_item) && mlc == false && this.item == null){
	if(this.percentage_filled_by_item(new_item) && mlc == false && this.item == null){

		//console.log("ADDING ITEM!!!!!!!!!!");
		//add item;
		//console.log("new_item.x is: " + new_item.x);
		this.item = new_item;
		//console.log("1 this.item.x is: " + this.item.x);



		//console.log("this.item is true if not null: " + (this.item != null));

		// //remove from general existence
		// global_item = null;

		//and tell the item it's new coordinates (need to do)

		// console.log("new_item.w is: " + Gen_Obj.w);
		// console.log("new_item.h is: " + Gen_Obj.h);
		// console.log("new_item.x is: " + new_item.x);

		var w_diff = this.w - Gen_Obj.w;
		var h_diff = this.h - Gen_Obj.h;

		this.item.x = this.x + (w_diff/2);
		this.item.y = this.y + (h_diff/2);

		this.seen_release_of_mlc = false;

		//console.log("2 this.item.x is: " + this.item.x);

		return true;//for debugging

	}

	return false;//also for debugging

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

	

	if(this.item != null){
	pw.AddToList("this item is not empty");
	pw.AddToList("this.mouse_intersects(mouse_x,mouse_y) is: " + this.mouse_intersects(mouse_x,mouse_y));
	pw.AddToList("this.item.mouse_intersects(mouse_x,mouse_y) is: " + this.item.mouse_intersects(mouse_x,mouse_y));
	pw.AddToList("this.item.properly_clicked(mouse_x,mouse_y) is: " + this.item.properly_clicked(mouse_x,mouse_y));
	pw.AddToList("this.seen_release_of_mlc is: " + this.seen_release_of_mlc);

	}
	else{
		pw.AddToList("this item IS empty");

	}



	var tmp_item = null;

	//if there is an item
	if(this.item != null &&
		//the box contains the mouse
	   this.mouse_intersects(mouse_x,mouse_y) && 
	   //the item contais the mouse
	   this.item.mouse_intersects(mouse_x,mouse_y) && 
	   //the item was "properly clicked on"
	   this.item.properly_clicked(mouse_x,mouse_y)
	   //and had seen release of the lmc
	   && this.seen_release_of_mlc
	   ){

		//console.log("this.seen_release_of_mlc is: " + this.seen_release_of_mlc);

		// //add item back into general area; 
		// global_item = this.item;
		tmp_item = this.item;

		//remove item from box; 
		//console.log("resetting this.item?");
		this.item = null;

	}

	pw.AddToList("mlc is: " + mlc);

	if(mlc == false){
		this.seen_release_of_mlc = true;
	}

	return tmp_item;


};

//deleted in 3v7. look at 3v6 or earlier for code. 
//contains_a_quarter_or_more

//deleted in 3v7. look at 3v6 or earlier for code. 
//Stuff_Box.prototype.contains_whole_thing = function(sq)



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

	ctx.fillRect(this.x,this.y,this.w,this.h);

	ctx.stroke();

	// if(this.item != null){

	// 	this.item.draw_item_in_box(this);
	// }

	//console.log("(draw_ssi) true if item is not null: " + (this.item != null));

	if(this.item != null){

		//console.log("!!!!!!!!!!!getting in via draw_ssi??");

		this.update_item_loc();
		this.item.draw_ssi();
	}



};

Stuff_Box.prototype.draw_ssi_on_inventory = function(canvas){

	canvas.fillStyle="gray";

	canvas.fillRect(this.x,this.y,this.w,this.h);

	canvas.stroke();

	// if(this.item != null){

	// 	this.item.draw_item_in_box(this);
	// }

	if(this.item != null){

		//console.log("getting in via draw_ssi_on_inventory ??");

		this.update_item_loc();
		this.item.draw_ssi();
	}



};


/*
x for the object (once inside stuff_box) needs to be stuff_box.x + (stuff_box.w/2)
y for the object (once inside stuff_box) needs to be stuff_box.y + (stuff_box.y/2)
*/


Stuff_Box.prototype.update_item_loc = function(){

	var debugging_x = this.item.x;
	var debugging_y = this.item.y;

	var w_diff = this.w - Gen_Obj.w;
	var h_diff = this.h - Gen_Obj.h;

	this.item.x = this.x + (w_diff/2);
	this.item.y = this.y + (h_diff/2);

	//console.log("this.item.x was: " + debugging_x + " this.item.x is now: " + this.item.x);
	//console.log("this.item.x was: " + debugging_y + " this.item.x is now: " + this.item.y);

};



//duplicate of contains_item. duplicated just in case you wind up
//wanting to make changes to contains_item later down the road. 
Stuff_Box.prototype.percentage_filled_by_item = function(item){

	if(item != null){

		var total = (this.x + this.w) * (this.y + this.h);


		//upper left hand corner
		var x = item.x;

		var y = item.y;

		if(this.contains_point(x,y)){
			//console.log("if 1");
			var diff_x = x - this.x;
			var diff_y = y - this.y;
			return (diff_x * diff_y) / total;
		}


		//upper right hand corner
		var x = item.x + item.w;

		var y = item.y;

		if(this.contains_point(x,y)){
			//console.log("if 2");
			var diff_x = x - this.x;
			var diff_y = y - this.y;
			return (diff_x * diff_y) / total;
		}

		//lower left hand corner 
		var x = item.x;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			//console.log("if 3");
			var diff_x = x - this.x;
			var diff_y = y - this.y;
			return (diff_x * diff_y) / total;
		}

		//lower right hand corner
		var x = item.x + item.w;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			//console.log("if 4");
			var diff_x = x - this.x;
			var diff_y = y - this.y;
			return (diff_x * diff_y) / total;
		}

		//console.log("getting here for some crazy reason?");

	}


	return false; //not in there and/or something went wrong. 


	// return 0; //if there is too little of the item in the box to be noticed
};



Stuff_Box.prototype.contains_item = function(item){

	//var total = this.w * this.h;

	if(item != null){

		var total = (this.x + this.w) * (this.y + this.h);


		//upper left hand corner
		var x = item.x;

		var y = item.y;

		if(this.contains_point(x,y)){
			return (x * y) / total;
		}


		//upper right hand corner
		var x = item.x + item.w;

		var y = item.y;

		if(this.contains_point(x,y)){
			return (x * y) / total;
		}

		//lower left hand corner 
		var x = item.x;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			return (x * y) / total;
		}

		//lower right hand corner
		var x = item.x + item.w;

		var y = item.y + item.h;

		if(this.contains_point(x,y)){
			return (x * y) / total;
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





Stuff_Box.prototype.percentage_of_box_filled_by_item = function(item) {
	return this.contains_item(item);
};

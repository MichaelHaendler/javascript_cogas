//Inventory_Rectangle.prototype.update = function(mx,my,item,mlc){


//TODO FOR THIS CLASS:

//--boxes_item_is_in needs to be made more efficient. 

//--need to be able to create a canvas on the fly rather 
//than using one that was precreated and resides in game0

//constructor
function Inventory_Rectangle(size,x,y){

	//initial number of things that can be held in inventory. can easily be changed
	//with a call to resize_inventory
	this.size = (size != null && size > 0) ? size : 5; 

	//offsetx and y plus this.x and this.y will give you general on canvas as a whole
	this.offset_x = 0; 
	this.offset_y = 0; 

	//loc on menu canvas (needed to )
	this.x = x != null ? x : 0;
	this.y = y != null ? y : 0;

	this.item_array = [];

	//amount of space (vertically speaking..aka height wise) between each box.
	this.buffer_h = 3; 

	//amount of space (horizontally speaking...aka width wise) between a box and the 
	//wall of the inventory rectangle itself
	this.buffer_w = 3;

	//the height and width of an item. So that we can calculate
	//the height and width of the inventory rectangle. 
	// this.item_height = Gen_Obj.h;
	this.box_height = Stuff_Box.h;

	//console.log("Gen_Obj.w is: " + Gen_Obj.w);

	//this.item_width = Gen_Obj.w;
	//Stuff_Box.w
	//console.log("Stuff_Box.w is: " + Stuff_Box.w);
	this.box_width = Stuff_Box.w;
	//debugger;
	//the number of items times the height of an item (all of the same height) plus
	//all of the space for the buffers for each item (calculated in set_inventory_size)
	this.h = -1;

	//all items have the same width...thus the rectangle doesn't need that multiplied. HOWEVER! 
	//buffer_w is supposed to just represent one side of the width. Thus, multi by 2 to get both side.
	// (calculated in set_inventory_size) 
	this.w = -1;

	//height and width of the canvas for the rect
	this.inventory_canvas = null;

	//sets up inventory_canvas, this.w,this.h, and this.item_array.
	this.set_inventory_size(this.size);

	//works!
	// this.inventory_canvas = document.createElement('canvas');
	// this.inventory_canvas.width = 70;
	// this.inventory_canvas.height = 70;
	// this.inventory_canvas.id = "hello_my_baby";

	// var tmp_ctx = this.inventory_canvas.getContext("2d");
	// tmp_ctx.fillStyle="blue";
	// tmp_ctx.fillRect(0,0,this.inventory_canvas.width,this.inventory_canvas.height);

	// $("#top").append(this.inventory_canvas);

};

Inventory_Rectangle.prototype.set_initial_offsets = function(offset_x,offset_y){

	//x is loc on menu canvas, offset_x is to make it relative to the general
	//canvas
	this.offset_x = this.x + offset_x; 
	this.offset_y = this.y + offset_y; 
	// this.offset_x = offset_x; 
	// this.offset_y = offset_y; 


	// console.log("-----------------");
	// console.log("menu canvas x is: " + offset_x);
	// console.log("menu canvas y is: " + offset_y);

	// console.log("rec canvas x is: " + this.x);
	// console.log("rec canvas y is: " + this.y);

	// console.log("buffer W is: " + this.buffer_w);
	// console.log("buffer H is: " + this.buffer_h)

	// console.log("box x SHOULD be: " + (offset_x + this.x + this.buffer_w));
	// console.log("box y SHOULD be: " + (offset_y + this.y + this.buffer_h));

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_box = this.item_array[i];
		var tmp_box_x_offset = this.offset_x + this.buffer_w;
		var tmp_box_y_offset = this.offset_y + this.buffer_h;
		tmp_box.set_offsets(tmp_box_x_offset,tmp_box_y_offset);
	}



};


//incremental offsets caused by dragging the menu around. 
Inventory_Rectangle.prototype.set_offsets = function(offset_array){

	//x is loc on menu canvas, offset_x is to make it relative to the general
	//canvas
	this.x += offset_array[0]; 
	this.y += offset_array[1]; 

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_box = this.item_array[i];
		tmp_box.set_offsets(offset_array[0],offset_array[1]);
	}

};

//has to do with putting stuff in and taking stuff out. 
Inventory_Rectangle.prototype.update = function(mx,my,item,mlc){


	var rect_contains_item = this.contains(item);
	//pw.print("rect_contains_item is: " + rect_contains_item);

	//an initial check just to see if any of the rest of it is even worth doing.
	//the check for the mouse is for pulling stuff out. the check for the item is for putting stuff in.  
	if(this.contains_mouse(mx,my) || rect_contains_item){

		pw.print("getting in to update!");
		//console.log("mouse seen!");

		//and if it is...

		//check if there even is an item. And if there is, find out which box(es) it is hovering
		//over

		//1) if the user is not dragging an item, and there is no item in the box (do nothing)
		//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
		//3) if the user is dragging an item, and there is nothing in the box. (adding to)
		//4) if the user has no item, but there is something in the box. (taking out)	

//implemented rule 1 (yay!)
//implment rule 3 (thus adding an item)
//implement rule 4 (taking the item out)
//implement rule 2. that will be annoying. will have dropped items 
//reappear around player's feet. 
		
		if(rect_contains_item){
			//rule 2
			if(this.one_or_more_boxes_containing_new_item_not_empty(item)){
				console.log("rule 2");
				return this.update_rule_2(item,mlc);
			}
			//rule 3
			else{
				//console.log("rule 3");
				return this.update_rule_3(item);
			}
		}
		else{
			//rule 4
			
			if(this.box_containg_mouse_is_empty(mx,my)){
				console.log("rule 4");
				this.update_rule_4(mx,my,lmc)
				return item;
			}
			//rule 1 (but nothing to be done) DONE!
			console.log("rule 1");
			//else{}


		}

	}

	//probably "only" get here when the item/mouse is nowhere near the inventory 
	return item;

};

Inventory_Rectangle.prototype.box_containg_mouse_is_empty = function(item){

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_item = this.item_array[i];

		if(tmp_item.mouse_intersects(mx,my)){
			return tmp_item.contains_item();
		}
	}

	//assume that we're not in a box. so there's nothing to "take out"
	return false; 

};

Inventory_Rectangle.prototype.one_or_more_boxes_containing_new_item_not_empty = function(item){

	var tmp_boxes = this.boxes_item_is_in(item);

	for(var i = 0; i < tmp_boxes.length; i++){
		var tmp_box = tmp_boxes[i];

		if(tmp_item.contains_item()){
			return true;
		}
	}

	return false;

};

Inventory_Rectangle.prototype.box_item_is_the_most_in = function(item){

	//is initialized in for loop below
	var tmp_box = null;

	var percentage = 0;

	console.log("this.item_array.length is: " + this.item_array.length);

	//go through the list and find the box that it's in the most, then..
	for(var i = 0; i < this.item_array.length; i++){

		pw.print(""+i);

		//console.log(i);

		var other_tmp_box = this.item_array[i];

		var tmp_percentage = other_tmp_box.percentage_filled_by_item(item) * 100;

		console.log("tmp_percentage is: " + tmp_percentage);

		if(tmp_percentage >= percentage){
			console.log("bigger than percentage, which was: " + percentage);
			tmp_box = other_tmp_box;
			percentage = tmp_percentage;
		}

	}

	return tmp_box;

};

Inventory_Rectangle.prototype.boxes_item_is_in = function(item){

	//console.log("boxes_item_is_in");

	var tmp_boxes = [];

	//find out which box(es) the user is hovering

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_box = this.item_array[i];

		if(tmp_box.contains_item(item)){
			tmp_boxes.push(tmp_box);
		}

	}

	return tmp_boxes;

};

//NEED TO!!! implement "contains_mouse" and "contains_item" for stuff_box. thankfully, both
//are easy. contains_mouse probably already exist. hell...since I can add an item so well
//(heh, at least reasonably well...still some bugs there) and the contains_mouse probably
//exists a well (or would be extremely easy to implement). just need to look around for them.

//4) if the user has no item, but there is something in the box. (taking out check)
Inventory_Rectangle.prototype.update_rule_4 = function(mx,my,lmc){

	console.log("update_rule_4");

	var tmp_box = null;

	//find box that mouse is hovering over. 
	for(var i = 0; i < this.item_array.length;i++){

		tmp_box = this.item_array[i];

		if(tmp_box.mouse_intersects(mx,my)){
			break;
		}
	}

	//if there is a left mouse click, give the item to the user. 
	//not sure about how to implement this. (look up how it was already done)
	//switch the current gen_obj to be using the global_item variable. this is the item
	//that you drag around. you can only drag around one item at a time anyway. 
	// if(lmc){
	// 	gen_obj = tmp_box.get_item();
		
	// }

	//returning the item that the user is taking out. 
	return tmp_box.take_item(mx,my,mlc);

};

//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
Inventory_Rectangle.prototype.update_rule_2 = function(item,mlc){

	console.log("update_rule_2");



	//get box that item is the most in. then...
	var tmp_box = this.box_item_is_the_most_in(item);

	if(tmp_box != null){
		//switch items around, ie: 
		//temporarily set the item in the box off to the side.
		var tmp_item = tmp_box.get_item();
		//put the new item in the box 
		tmp_box.add_item(item,mlc);

		//then put the item that is being "pushed out" into that global item
		gen_obj = tmp_item.take_item(mx,my,mlc);
	}
	

};

//3) if the user is dragging an item, and there is nothing in the box. (adding to check)
Inventory_Rectangle.prototype.update_rule_3 = function(item){

	console.log("rule 3");

	var tmp_box = this.box_item_is_the_most_in(item);

	console.log("tmp_box.name is: " + tmp_box.name);

	if(tmp_box != null){
		tmp_box.add_item(item);
	}

};
 
//add_item was here but was deleted


//make it bigger (or smaller) by changing the size. this method should probably
//be called in the constructor (as well as being useable in other classes) in
//order to initially create the inventory (set everything up, make sure all the boxes
//have their proper x and y coords, that kind of thing)


	// this.c3 = document.createElement('canvas');
	// this.c3.width = 70;
	// this.c3.height = 70;
	// this.c3.id = "hello_my_baby";

	// var tmp_ctx = this.c3.getContext("2d");
	// tmp_ctx.fillStyle="blue";
	// tmp_ctx.fillRect(0,0,this.c3.width,this.c3.height);

	// $("#top").append(this.c3);

//first get this working. then go onto update. 


// var init_loc_on_screen = [230,50];
// var width_and_height_of_image_on_screen = [41,41];
// var image_name = "health_icon_1";
// var image_dimensions = [10,11,110,109];


// // gen_obj = new Gen_Obj(init_loc_on_screen,
// // 						  width_and_height_of_image_on_screen,
// // 						  image_name,
// // 						  image_dimensions);

// var gen_obj2 = new Gen_Obj(init_loc_on_screen,
// 						  image_name,
// 						  image_dimensions);


Inventory_Rectangle.prototype.set_inventory_size = function(size){

	this.inventory_canvas = document.createElement('canvas');

	//calculate the width of the inventory_rectangle canvas (the width of an item, plus
	//a buffer which is added to boths sides (thus the ' *2' part))
	this.w = this.box_width + (this.buffer_w * 2);

	// console.log("this.box_width is: " + this.box_width);
	// console.log("this.buffer_w is: " + this.buffer_w);
	// console.log("this.w is: " + this.w);

	this.inventory_canvas.width = this.w;

	//calculate the height of the inventory_rectangle canvas
	this.h = (this.box_height * size) + ( (1 + this.buffer_h) * size);

	//console.log("44this.h is: " + this.h);

	this.inventory_canvas.height = this.h;

	this.inventory_canvas.class = "inventory_rectangle_for_person";

	var tmp_ctx = this.inventory_canvas.getContext("2d");

	tmp_ctx.fillStyle="blue";

	tmp_ctx.fillRect(0,0,this.inventory_canvas.width,this.inventory_canvas.height);

	//$("#top").append(this.inventory_canvas);
	
	
	//build the boxes, set them to their proper locations on the 
	//inventory_rectangle canvas, and post them onto the inventory_canvas
	//for (var i = 1; i <= size; i++){
	for (var i = 0; i < size; i++){
	//for (var i = 0; i < 2; i++){
		//console.log(i);
		var tmp_box = new Stuff_Box();

		tmp_box.name = "box-" + i;//this line is for debugging purposes only. 
		
		/*interesting lesson: the zero point starts at tmp_ctx, not ctx*/
		// tmp_box.x = this.buffer_w;
		tmp_box.draw_at_x = this.buffer_w;
		tmp_box.x = this.x + this.buffer_w;


		var down_this_num_of_boxes = tmp_box.h * i;

		var num_of_buffers = this.buffer_h * (i + 1);

		// tmp_box.y = down_this_num_of_boxes + num_of_buffers;
		tmp_box.draw_at_y = down_this_num_of_boxes + num_of_buffers;
		tmp_box.y = this.y + this.buffer_h;


		//console.log("start_y is: " + start_y);

		//console.log("down_this_num_of_boxes is: " + down_this_num_of_boxes);		

		//console.log("tmp_box.y is: " + tmp_box.y);

		//console.log("tmp_box.y is: " + tmp_box.y);
		tmp_ctx = tmp_box.draw_on_inventory_rect(tmp_ctx);
		this.item_array.push(tmp_box);
	}
	
};

//this was more for the user end. if a user has the ability to increase 
//how much they can carry, you could just call this via 'instance_name.increase_inventory_size(1);'
//something like that. very very similar to set_inventory_size, except that it only goes up. 
Inventory_Rectangle.prototype.increase_inventory_size = function(amount){

	console.log("(increase_inventory_size)");

	// amount = amount >= 0 ? amount : amount * -1;

	// this.size = this.size + amount;

	//if the amount is 0 or a positive number, use it to set size to be a bigger amount (probably 1).
	//if however amount is a negative number, turn it into a positive number and set size to that number.
	this.size =  amount >= 0 ? this.size + amount : this.size + (amount * -1);

	//calculate the height of the inventory_rectangle canvas
	this.h = (this.item_height * this.size) + (buffer_h * this.size);

	//no need to recalculate width (this.w) since it stays the same. 

	//use the width and height to build a canvas for the inventory 
	this.inventory_canvas = document.createElement("canvas");
	//this.inventory_canvas = $('<canvas></canvas>').width(this.w).height(this.h);
	$(this.inventory_canvas).width(this.w).height(this.h);

	var tmp_box = new Stuff_Box();

	tmp_box.name = "box-" + this.size;//this line is for debugging purposes only. 

	// tmp_box.x = this.x + this.buffer_w;
	tmp_box.x = this.buffer_w;

	tmp_box.y = this.item_array.length + (this.buffer_h * this.item_array.length);

	this.item_array.push(tmp_box);


};

Inventory_Rectangle.prototype.contains_mouse = function(mx,my){

	//pw.print("(contains_mouse)");

	var x = this.x;
	var y = this.y;
	var w = this.w;
	var h = this.h;

	if(mx >= x && mx <= x + w && 
	   my >= y && my <= y + h){
	   	pw.print("return true, inside inventory rectangle");
		return true;
	}

	pw.print("not in inventory_rectangle, do nothing");
	return false;

};


Inventory_Rectangle.prototype.draw_ssi = function(){

		//console.log("this.inventory_canvas is: " + this.inventory_canvas);
		//ctx.drawImage(this.inventory_canvas,20,20);

	// pw.AddToList("this.x is: " + this.x);
	// pw.AddToList("this.y is: " + this.y);
	// pw.AddToList("this.inventory_canvas.width is: " + this.inventory_canvas.width);
	// pw.AddToList("this.inventory_canvas.height is: " + this.inventory_canvas.height);

	ctx.drawImage(this.inventory_canvas,
	this.x, 
	this.y,
	this.inventory_canvas.width,
	this.inventory_canvas.height);

};

Inventory_Rectangle.prototype.draw_ssi_on_given_canvas = function(canvas_context){

		//console.log("this.inventory_canvas is: " + this.inventory_canvas);
		//ctx.drawImage(this.inventory_canvas,20,20);

	// pw.AddToList("this.x is: " + this.x);
	// pw.AddToList("this.y is: " + this.y);
	// pw.AddToList("this.inventory_canvas.width is: " + this.inventory_canvas.width);
	// pw.AddToList("this.inventory_canvas.height is: " + this.inventory_canvas.height);

	canvas_context.drawImage(this.inventory_canvas,
	this.x, 
	this.y,
	this.inventory_canvas.width,
	this.inventory_canvas.height);

	return canvas_context;

};

Inventory_Rectangle.prototype.contains = function(item){

	// if(this.percentage_filled_by_item(item) > .5){
	if(item == null){
		return false;
	}

	if(this.percentage_filled_by_item(item)){
		return true;
	}
	else{
		return false;
	}

};

Inventory_Rectangle.prototype.percentage_filled_by_item = function(item){

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


//the mouse is what you were bringing in, and the "this" was the response. 
Inventory_Rectangle.prototype.contains_point = function(mouse_x,mouse_y) {

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

Inventory_Rectangle.prototype.testing = function(mx,my,item,mlc){

	this.update(mx,my,item,mlc);

	ctx.drawImage(this.inventory_canvas,
	this.x, 
	this.y,
	this.inventory_canvas.width,
	this.inventory_canvas.height);

};



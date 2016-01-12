//TODO FOR THIS CLASS:

//--boxes_item_is_in needs to be made more efficient. 

//--need to be able to create a canvas on the fly rather 
//than using one that was precreated and resides in game0

//constructor
function Inventory_Rectangle(size,x,y){

	//initial number of things that can be held in inventory. can easily be changed
	//with a call to resize_inventory
	this.size = (size != null && size > 0) ? size : 5; 

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
	this.item_height = Gen_Obj.h;

	this.item_width = Gen_Obj.w;

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


	///testing stuff
	 this.c3 = document.createElement('canvas');
	 this.c3.width = 70;
	 this.c3.height = 70;
	 this.c3.id = "hello_my_baby";

	// var tmp_ctx = this.c3.getContext("2d");
	// tmp_ctx.fillStyle="pink";
	// tmp_ctx.fillRect(0,0,this.c3.width,this.c3.height);

	var tmp_ctx = this.c3.getContext("2d");
	tmp_ctx.fillStyle="blue";
	tmp_ctx.fillRect(0,0,this.c3.width,this.c3.height);

	$("#top").append(this.c3);

};

//has to do with putting stuff in and taking stuff out. 
Inventory_Rectangle.prototype.update = function(mx,my,item,mlc){

	console.log("update");

	// //upper left hand corner (of item)
	// var ulhc = [item.x,item.y];
	// //upper right hand corner
	// var urhc = [item.x + item.w,item.y];
	// //lower left hand corner
	// var llhc = [item.x,item.y + item.h];
	// //lower right hand corner 
	// var lrhc = [item.x + item.w,item.y + item.h];

	// var rect_contains_item = (this.contains(ulhc[0],ulhc[1]) || 
	// 						this.contains(urhc[0],urhc[1]) || 
	// 						this.contains(llhc[0],llhc[1]) || 
	// 						this.contains(lrhc[0],lrhc[1]));


	var rect_contains_item = this.contains(item);

	//an initial check just to see if any of the rest of it is even worth doing.
	//the check for the mouse is for pulling stuff out. the check for the item is for putting stuff in.  
	if(this.contains(mx,my) || rect_contains_item){

		//and if it is...

		//check if there even is an item. And if there is, find out which box(es) it is hovering
		//over

		//1) if the user is not dragging an item, and there is no item in the box (do nothing)
		//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
		//3) if the user is dragging an item, and there is nothing in the box. (adding to)
		//4) if the user has no item, but there is something in the box. (taking out)	
		
		if(rect_contains_item){
			//rule 2
			if(this.one_or_more_boxes_containing_new_item_not_empty(item)){
				return this.update_rule_2(item,mlc);
			}
			//rule 3
			else{
				return this.update_rule_3(item);
			}
		}
		else{
			//rule 4
			if(this.box_containg_mouse_is_empty()){
				this.update_rule_4(mx,my,lmc)
				return item;
			}
			//rule 1 (but nothing to be done)
			//else{}


		}

	}

	//probably "only" get here when the item/mouse is nowhere near the inventory 
	return item;

};



Inventory_Rectangle.prototype.one_or_more_boxes_containing_new_item_not_empty = function(item){

	var tmp_boxes = this.boxes_item_is_in(item);

	if(tmp_boxes.length > 0){
		return true;
	}

	return false;

};

Inventory_Rectangle.prototype.box_item_is_the_most_in = function(item){

	//is initialized in for loop below
	var tmp_box = null;

	var percentage = 0;

	//go through the list and find the box that it's in the most, then..
	for(var i = 0; i < this.item_array.length; i++){

		var other_tmp_box = this.item_array[i];

		var tmp_percentage = other_tmp_box.percentage_of_box_filled_by_item(item);

		if(tmp_percentage >= percentage){
			tmp_box = other_tmp_box;
			percentage = tmp_percentage;
		}

	}

	return tmp_box;

};

Inventory_Rectangle.prototype.boxes_item_is_in = function(item){

	console.log("boxes_item_is_in");

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

	// //get the box(es) that the item is technically in
	// var tmp_boxes = this.boxes_item_is_in(item);

	// //is initialized in for loop below
	// var tmp_box = null;

	// var percentage = 0;

	// //go through the list and find the box that it's in the most, then..
	// for(var i = 0; i < this.tmp_boxes.length; i++){

	// 	var other_tmp_box = tmp_boxes[i];

	// 	var tmp_percentage = other_tmp_box.percentage_of_box_filled_by_item(item);

	// 	if(tmp_percentage >= percentage){
	// 		tmp_box = other_tmp_box;
	// 		percentage = tmp_percentage;
	// 	}

	// }

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
	

	// //set the item that we are taking out of the box to the last location of the
	// //item that we are putting into the box 
	// tmp_item.x = item.x;
	// tmp_item.y = item.y;

	// //then put the item that we are putting into the box...into the box. 
	// tmp_box.set_item(item);

	// //then set it so that we're now carrying that item that we took out. 
	// gen_obj = tmp_item;



};

//1) if the user is not dragging an item, and there is no item in the box (do nothing)
//3) if the user is dragging an item, and there is nothing in the box. (adding to check)
Inventory_Rectangle.prototype.update_rule_3 = function(item){

	console.log("update_rule_3");

	// var tmp_boxes = this.boxes_item_is_in(item);


	// for(var i = 0; i < tmp_boxes.length; i++){

	// 	var tmp_box = tmp_boxes[i];

	// 	//rule 4 (nothing to do for rule 1)

	// 	//if the box is empty, the item, not null, and the box contains the item,
	// 	//add the item to the box
	// 	if(tmp_box.empty() && tmp_box.contains(item)){
	// 		tmp_box.add_item(item);

	// 	}

	// }

	var tmp_box = this.box_item_is_the_most_in(item);

	if(tmp_box != null){
		tmp_box.add_item(item);
	}

};
 
//add it to that square
Inventory_Rectangle.prototype.add_item = function(item){

	console.log("(add_item)");


	//1) if the user is not dragging an item, and there is no item in the box (do nothing)
	//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
	//3) if the user is dragging an item, and there is nothing in the box. (adding to check)
	//if the user has no item, but there is something in the box. (taking out check)

	//see if it's within the inventory_canvas
	if(this.contains(item)){

		//an array instead of a single instance between the item might actually
		//be in 2 different 
		var tmp_box_array = [];

		for(var i = 0; i < this.item_array.length; i++){

			var box = this.item_array[i];

			if(box.contains(item)){

				//put box into array
				tmp_box_array.push(box);

				//check if theres a next box, and if there is, and it contains
				//the item as well, put that into the array too. 
				var there_is_a_next_item = i + 1 < this.item_array.length

				if(there_is_a_next_item){

					var next_box = this.item_array[i + 1];

					if(next_box.contains(item)){

						tmp_box_array.push(next_box);

					}

				}
				
			}
			//then break (no need to go any further)
			break;
		}

		if(tmp_box_array.length != 0){

			//if its just hovering over one square, and there is nothing in that square, put it in. 
			//if there is something already in that square...LOL...the items get switched. the item 
			//that HAD been in there is just floating there. set the lmc to true so that you might
			//move that item that you are now holding someplace else. should be reset when you actually
			//click the lmc again.
			if(tmp_box_array.length == 1){

				var box = tmp_box_array[0];

				this.add_item_helper(box,item);

			}

			//if it's between squares, choose which one it's in the most.
			if(tmp_box_array.length == 2){

				var box1 = tmp_box_array[0];
				var box2 = tmp_box_array[1];

				var box_1_contains_amount = box1.contains_percentage_amount(item);
				var box_2_contains_amount = box2.contains_percentage_amount(item);

				if(box_1_contains_amount >= box_2_contains_amount){
					this.add_item_helper(box1,item);
				}
				else{
					this.add_item_helper(box2,item);
				}

			}		

		}

	}

};

Inventory_Rectangle.prototype.add_item_helper = function(box,item){

	console.log("(add_item_helper)");

	if(box.empty()){
		//add item to box/inventory
		box.add_item(item);//set box to be holding the new item 
		//so that there aren't technically 2 copies of the same item floating around.
		gen_obj = null;  
	}
	//meaning it's not empty
	else{
		var tmp_item = box.gen_object();
		box.add_item(gen_obj);//set box to be holding the new item 
		gen_obj = tmp_item; //item that you were dragging around is now
		//there might be a temporary weird situation that I need to deal with (like
		//setting lmc to true here)
		gen_obj.set_tmp_situation();

	}

};


//make it bigger (or smaller) by changing the size. this method should probably
//be called in the constructor (as well as being useable in other classes) in
//order to initially create the inventory (set everything up, make sure all the boxes
//have their proper x and y coords, that kind of thing)
Inventory_Rectangle.prototype.set_inventory_size = function(size){

	//calculate the height of the inventory_rectangle canvas
	this.h = (this.item_height * size) + (this.buffer_h * size);

	//calculate the width of the inventory_rectangle canvas (the width of an item, plus
	//a buffer which is added to boths sides (thus the ' *2' part))
	this.w = this.item_width + (this.buffer_w * 2);

	//use the width and height to build a canvas for the inventory 
	//this.inventory_canvas = $('<canvas></canvas>').width(this.w).height(this.h);

	//this.inventory_canvas = document.createElement("canvas");
	// this.inventory_canvas = document.getElementById("inv_canvas");
	// this.inventory_canvas.id = "inventory_canvas3";	
	// this.inventory_canvas.width = this.w;
	// this.inventory_canvas.height = this.h;
	// this.inventory_canvas = document.getElementById("inv_canvas");
	// console.log("this.inventory_canvas is: " + this.inventory_canvas.get(0));
	// this.inventory_canvas.setAttribute("id", "inventory_canvas3");
	// this.inventory_canvas.setAttribute("width", this.w);
	// this.inventory_canvas.setAttribute("height", this.h);


	ctx.rect(this.x,this.y,this.w,this.h);
	ctx.fillStyle="green";
	
	//build the boxes, set them to their proper locations on the 
	//inventory_rectangle canvas, and post them onto the inventory_canvas
	for (var i = 1; i <= size; i++){
		var tmp_box = new Stuff_Box();
		tmp_box.x = this.x + this.buffer_w;
		tmp_box.y = (this.y * i) + (this.buffer_h * i);
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

	tmp_box.x = this.x + this.buffer_w;

	tmp_box.y = this.item_array.length + (this.buffer_h * this.item_array.length);

	this.item_array.push(tmp_box);


};

Inventory_Rectangle.prototype.contains_mouse = function(mx,my){

	console.log("(contains_mouse)");

	var x = this.x;
	var y = this.y;
	var w = this.w;
	var h = this.h;

	if(mx >= x && mx <= x + w && 
	   my >= y && my <= y + h){
		return true;
	}

	return false;

};


Inventory_Rectangle.prototype.draw_ssi = function(){



		//console.log("1111this.inventory_canvas.height() is: " + $(this.inventory_canvas).height());
		//console.log("this.inventory_canvas.width() is: " + $(this.inventory_canvas).width());
		//console.log("this.inventory_canvas.get(0).tagName is: " + this.inventory_canvas.get(0).tagName);

		//this.inventory_canvas.get(0).style.background = 'red';
		//this.inventory_canvas.fillStyle = "#000000";
		console.log("this.inventory_canvas is: " + this.inventory_canvas);
		ctx.drawImage(this.inventory_canvas,20,20);

};

Inventory_Rectangle.prototype.contains = function(item){

	if(item != null){

		//var total = this.w * this.h;

		var total = (this.x + this.w) * (this.y + this.h);


		//upper left hand corner
		var x = item.x;

		var y = item.y;

		if(this.contains_mouse(x,y)){
			return (x * y) / total;
		}


		//upper right hand corner
		var x = item.x + item.w;

		var y = item.y;

		if(this.contains_mouse(x,y)){
			return (x * y) / total;
		}

		//lower left hand corner 
		var x = item.x;

		var y = item.y + item.h;

		if(this.contains_mouse(x,y)){
			return (x * y) / total;
		}

		//lower right hand corner
		var x = item.x + item.w;

		var y = item.y + item.h;

		if(this.contains_mouse(x,y)){
			return (x * y) / total;
		}
	}

	return -1; //not in there and/or something went wrong. 
};

Inventory_Rectangle.prototype.testing = function(){


		ctx.drawImage(this.c3,
		0, 
		0,
		70,
		70);

	//$("#hello_my_baby").remove();

};



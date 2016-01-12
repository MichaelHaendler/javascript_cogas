

// http://stackoverflow.com/questions/10433046/creating-a-canvas-element-and-setting-its-width-and-height-attributes-using-jque
//every character will have an item array. there will be a limit as to how many
//items a charater can carry. Howeer, Inventory_Rectangle is just about displaying
//item_array

/*
idea: make game3v5 soon. in it...do 3 things: 
1) make each item it's own canvas. the canvas will have an id that 
will be the items name, the date, time, and a random number (this will be to prevent 
issues of canvases potentially having the same id).
2) fix button's hyper fluxuation. this might take time.
3) implement borders for each inventory square. on the note, make said borders easy to turn off. 

I am making game3v5 because I am afraid that I will mess up gen_object. 

4) make the sub_button and gen_button thing. 

5) make sub_menu. should be a combo of a square and write and some mrc (for initial creation) and
mlc for selecting stuff (or closing it) shouldn't be...too too bad. 

6) finish inventory_rectangle 

7) actually probably for game3v6...but since each item will be it's own canvas...I need to think about 
how I want to delete items (since they will each be their own canvas...I will need to delete them when
they can no longer be accessed). I will probably do something (because I basically have to) like...

-consider my current area my "main area"

-somehow create another area that my character can go to. This area will be considered a "random area"

-go to that area and drop something (will need inventory and sub menu working in order to do this stuff)
and then leave that area. when I go back to the main area that item should be deleted (since it was left
in a random area that you can never go back to).

8) LOL ....friggin...start making some designs about what you want this thing to look like (and why) 

*/

//constructor
function Inventory_Rectangle(size,x,y){

	//initial number of things that can be held in inventory. can easilycan easily be changed
	//with a call to resize_inventory
	this.init_size = (size != null && size > 0) ? size : 5; 

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
	this.set_inventory_size(this.init_size);

};

Inventory_Rectangle.prototype.update = function(mx,my,item){

	console.log("update");

	//upper left hand corner (of item)
	var ulhc = [item.x,item.y];
	//upper right hand corner
	var urhc = [item.x + item.w,item.y];
	//lower left hand corner
	var llhc = [item.x,item.y + item.h];
	//lower right hand corner 
	var lrhc = [item.x + item.w,item.y + item.h];

	var rect_contains_item = (this.contains(ulhc[0],ulhc[1]) || 
							this.contains(urhc[0],urhc[1]) || 
							this.contains(llhc[0],llhc[1]) || 
							this.contains(lrhc[0],lrhc[1]));

	//an initial check just to see if any of the rest of it is even worth doing.
	//the check for the mouse is for pulling stuff out. the check for the item is for putting stuff in.  
	if(this.contains(mx,my) || rect_contains_item){

		//and if it is...

		//check if there even is an item. And if there is, find out which box(es) it is hovering
		//over

		//1) if the user is not dragging an item, and there is no item in the box (do nothing)
		//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
		//3) if the user is dragging an item, and there is nothing in the box. (adding to check)
		//4) if the user has no item, but there is something in the box. (taking out check)	

		////////////////////////////

		// //rule 2
		// else if(item != null && this.one_or_more_boxes_containing_new_item_not_empty()){

		// }
		// //rule 3
		// else if(item != null && !this.one_or_more_boxes_containing_new_item_not_empty()){

		// }
		// //rule 1
		// if(item == null && this.box_containg_mouse_is_empty()){

		// }
		// //rule 4
		// else if(item == null && !this.box_containg_mouse_is_empty()){

		// }
		
		if(rect_contains_item){
			//rule 2
			if(this.one_or_more_boxes_containing_new_item_not_empty()){
				this.update_rule_2(item);
			}
			//rule 3
			else{
				this.update_rule_3(item);
			}
		}
		else{
			//rule 4
			if(this.box_containg_mouse_is_empty()){
				this.update_rule_4(mx,my,lmc)
			}
			//rule 1 (but nothing to be done)
			//else{}


		}

	}

};


Inventory_Rectangle.prototype.boxes_item_is_in = function(item){

	console.log("boxes_item_is_in");

	var tmp_boxes = [];

	//find out which box(es) the user is hovering

	for(var i = 0; i < this.item_array.length; i++){
		var tmp_box = this.item_array[1];

		if(tmp_box.contains_item(item)){
			tmp_boxes.push(tmp_box);
		}

	}

	return tmp_boxes;

};

//NEED TO!!! implement "contains mouse" and "contains_item" for stuff_box. thankfully, both
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

		if(tmp_box.contains_mouse(mx,my)){
			break;
		}
	}

	//if there is a left mouse click, give the item to the user. 
	//not sure about how to implement this. 
	//switch the current gen_obj to be using the global_item variable. this is the item
	//that you drag around. you can only drag around one item at a time anyway. 
	if(lmc){
		gen_obj = tmp_box.get_item();
	}

};

//2) if there is an item in the box and the user is dragging an item (hardest one...taking out AND adding to)
Inventory_Rectangle.prototype.update_rule_2 = function(item){

	console.log("update_rule_2");

	var tmp_boxes = this.boxes_item_is_in(item);


	for(var i = 0; i < this.tmp_boxes.length; i++){

		var tmp_box = tmp_boxes[0];

		if(!tmp_box.empty()){
			//switch items around (put the new item in the old items place, and )
			var tmp_item = tmp_box.get_item();

			//set the item that we are taking out of the box to the last location of the
			//item that we are putting into the box 
			tmp_item.x = item.x;
			tmp_item.y = item.y;

			//then put the item that we are putting into the box...into the box. 
			tmp_box.set_item(item);

			//then set it so that we're now carrying that item that we took out. 
			gen_obj = tmp_item;


		}

	}

};

//1) if the user is not dragging an item, and there is no item in the box (do nothing)
//3) if the user is dragging an item, and there is nothing in the box. (adding to check)
Inventory_Rectangle.prototype.update_rule_3 = function(item){

	console.log("update_rule_3");

	var tmp_boxes = this.boxes_item_is_in(item);


	for(var i = 0; i < tmp_boxes.length; i++){

		var tmp_box = tmp_boxes[i];

		//rule 4 (nothing to do for rule 1)

		//if the box is empty, the item, not null, and the box contains the item,
		//add the item to the box
		if(tmp_box.empty() && tmp_box.contains(item)){
			tmp_box.add_item(item);

		}

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

				// if(box.empty()){
				// 	//add item to box/inventory
				// 	box.add_item(item);//set box to be holding the new item 
				// 	//so that there aren't technically 2 copies of the same item floating around.
				// 	gen_obj = null;  
				// }
				// //meaning it's not empty
				// else{
				// 	var tmp_item = box.gen_object();
				// 	box.add_item(gen_obj);//set box to be holding the new item 
				// 	gen_obj = tmp_item; //item that you were dragging around is now
				// 	//there might be a temporary weird situation that I need to deal with (like
				// 	//setting lmc to true here)
				// 	gen_obj.set_tmp_situation();

				// }

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

	this.inventory_canvas = document.createElement("canvas");
	$(this.inventory_canvas).width(this.w).height(this.h);
	$(this.inventory_canvas).css('background-color', 'red');
	$(this.inventory_canvas).id = "inventory_canvas2";	
	//this.inventory_canvas = $('<canvas></canvas>').width(this.w).height(this.h);
	//this.inventory_canvas = $(".inventory_canvas");
	

	//console.log("HERE this.inventory_canvas is: " + $($(this.inventory_canvas).get(0)).get(0));
	
	//this.inventory_canvas.strokeStyle = 'red';

	// this.inventory_canvas.color = "black";


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

	console.log("going in here for some reason?");


	//calculate the height of the inventory_rectangle canvas
	this.h = (this.item_height * size) + (buffer_h * size);

	//calculate the width of the inventory_rectangle canvas (the width of an item, plus
	//a buffer which is added to boths sides (thus the ' *2' part))
	this.w = this.item_width + (this.buffer_w * 2);

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

	var x = this.inventory_canvas.top;
	var y = this.inventory_canvas.left;
	var w = this.inventory_canvas.width();
	var h = this.inventory_canvas.height();

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


	// ctx.drawImage(this.inventory_canvas,
	// 	0,
	// 	0,
	// 	$(this.inventory_canvas).width(),
	// 	$(this.inventory_canvas).height(),
	// 	0, 
	// 	0,
	// 	$(this.inventory_canvas).width(),
	// 	$(this.inventory_canvas).height());



};


var tmp_box = new Stuff_Box();

Inventory_Rectangle.prototype.testing = function(){

	// var can = $("#can").get(0);

	// //var blah1 = document.getElementById("inventory_canvas"); // c == canvas
	// var can = c.getContext("2d");

 //    can.fillStyle = "green";
 //    //can.strokeStyle = "#ff0000";
 //    can.fillRect(50, 10, 70, 200);

 //    tmp_box.draw_ssi_on_inventory(can);

 		//var blah = $('<canvas>')

 		var img = document.getElementById("person_set_1");
 		var start_of_ssi_x = 0;
 		var start_of_ssi_y = 0;
 		var s_width = 50;
 		var s_height = 50;
 		var canvas_loc_x = 10;
 		var canvas_loc_y = 20;
 		var d_width = s_width;
 		var d_height = s_height;

	var c2 = document.getElementById("test_canvas"); // c == canvas

	// 	var c2 = $('<canvas>').attr({
 //    id: "blahblah"
	// }).css({
 //    width: s_width + 'px',
 //    height: s_height + 'px'
	// }).appendTo('.top');

// $('<canvas id="BLAHEY">').appendTo('body').html(html).css({
//     'top': '200px',
//     'left': '300px',
//     'width': '50px',
//     'height': '50px',
//     'z-index': '10'
// });
// $('<canvas id="BLAHEY">').appendTo('#top');
// $('#BLAHEY')[0].width = 50;
// $('#BLAHEY')[0].height = 50;
	//$('<canvas id="BLAHEY">').appendTo('#top');
	// var tmp = $('#BLAHEY');
	// tmp[0].width = 50;
	// tmp[0].height = 50;

		// var ctx2 = c2.getContext("2d");
		//var ctx2 = tmp[0].getContext("2d");

 			// ctx.drawImage(img,
				// canvas_loc_x, 
				// canvas_loc_y,
				// d_width,
				// d_height);

		// ctx2.drawImage(img,
		// 	start_of_ssi_x,
		// 	start_of_ssi_y,
		// 	s_width,
		// 	s_height,
		// 	canvas_loc_x, 
		// 	canvas_loc_y,
		// 	d_width,
		// 	d_height);

 		//console.log("ctx's width is: " + $("#myCanvas").get(0).height);

		// ctx.drawImage(c2,
		// 	canvas_loc_x, 
		// 	canvas_loc_y,
		// 	1000,
		// 	500);

	$('<canvas id="ZOOMY"></canvas>').appendTo('#test_canvas');

	var tmp = $('#ZOOMY');
	tmp[0].width = 50;
	tmp[0].height = 50;

	ctx.drawImage(tmp[0],
		canvas_loc_x, 
		canvas_loc_y,
		1000,
		500);

};

			// ctx.drawImage(this.img,
			// 	curr_ssi.start_of_ssi_x,
			// 	curr_ssi.start_of_ssi_y,
			// 	curr_ssi.s_width,
			// 	curr_ssi.s_height,
			// 	this.canvas_loc_x, 
			// 	this.canvas_loc_y,
			// 	curr_ssi.destination_width,
			// 	curr_ssi.destination_height
			// );



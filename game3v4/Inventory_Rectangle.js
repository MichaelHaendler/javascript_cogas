

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

init_size is the number of objects that can be (at least initially) held in the inventory

*/
function Inventory_Rectangle(init_size){

	this.x = 0;
	this.y = 0;

	this.item_array = [];

	//amount of space (vertically speaking..aka height wise) between each box.
	this.buffer_h = 3; 

	//amount of space (horizontally speaking...aka width wise) between a box and the 
	//wall of the inventory rectangle itself
	this.buffer_w = 3;

	//the height and width of a random item. So that we can calculate
	//the height and width of the inventory rectangle. 
	//IMPORTANT NOTE!: if you change the size of an object, then you will need to change the 
	//size of it here as well. 
	var item_height = 40;

	var item_width = 40;

	//the number of items times the height of an item (all of the same height) plus
	//all of the space for the buffers for each item
	this.h = (item_height * this.item_array) + (buffer_h * this.item_array);

	//all items have the same width...thus the rectangle doesn't need that multiplied. HOWEVER! 
	//buffer_w is supposed to just represent one side of the width. Thus, multi by 2 to get both side. 
	this.w = item_width + (this.buffer_w * 2);

	//height and width of the canvas for the rect
	this.inventory_canvas = $('<canvas/>').width(this.w).height(this.h);

};


 
//add it to that square
Inventory_Rectangle.prototype. add_item = function(item){

	//see if it's within the inventory_canvas
	if(this.contains(item)){

		//see which square it's in.

		//if it's between squares, choose which one it's in the most. However, if one
		//of those squares has something in it, and the other is empty, just automatically
		//put it in the empty one. 

		//if it's exactly between squares, and both are emtpy randomly choose one or the other. 


	}



};
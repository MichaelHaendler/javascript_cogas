

//should have a: 
//--menu_canvas
//--inventory rectangle (probably includes invisible rectangle and up and down buttons)
//boxes for holding guns and the like 
//box for holding armor
//x/close button

function Menu(){

	// var start_x = 20;
	// var start_y = 20;
	var start_x = 400;
	var start_y = 20;


	this.menu_canvas = new Menu_Canvas(start_x,start_y,250,300);
	// this.inv_rec = new Inventory_Rectangle(2, this.menu_canvas.x + 20, this.menu_canvas.y + 20);

	this.bar = new Drag_Bar(100 + start_x, 0 + start_y,100,25);

	this.inv_rec = new Inventory_Rectangle(1, 10 + start_x, 5 + start_y);
};


// function Menu(menu,array){

// 	this,menu_canvas = menu_canvas;
// 	this.array = array;

// 	for(var i = 0; i < this.array.length;i++){

// 		this.array[i].set_offsets(this.menu_canvas.x,this.menu_canvas.y);

// 	}

// };

//all updates. button being clicked on, menu as a whole being dragged around,
//inventory being messed with, everything
Menu.prototype.update = function(mx,my,mlc,item){

	//console.log("getting here?");

	//if(this.menu_canvas.contains_mouse(mx,my)){
		//this.inv_rec.update(mx,my,item,mlc);
	//}

		var add_res = this.bar.drag(mx,my,mlc);

		this.menu_canvas.set_offset(add_res);

		this.inv_rec.set_offsets(add_res);

		this.inv_rec.update(mx,my,item,mlc);
			
};

// Menu.prototype.move = function(mx,my,mlc,item){


// };

// Menu.prototype.draw_ssi = function(){

// 	var tmp_canvas = this.menu_canvas.get_canvas();

// 	var tmp_ctx = tmp_canvas.getContext("2d");

// 	tmp_ctx = this.bar.draw_ssi_on_given_canvas(tmp_ctx);

// 	ctx.drawImage(tmp_canvas,
// 		this.menu_canvas.x, 
// 		this.menu_canvas.y);
// };

Menu.prototype.draw_ssi = function(){

	this.menu_canvas.draw_ssi();
	this.inv_rec.draw_ssi();
	this.bar.draw_ssi();

};


// function person_inventory(){

// 	var menu_canvas = new Menu_Canvas(20,20,250,300);

// 	var bar = new Drag_Bar(100,0,100,25);

// 	var inv_rec = new Inventory_Rectangle(4, 10, 15);

// 	var array = 

// 	return new Menu(menu_canvas)

// }

/*
how to proceed: 

place a menu canvas here, and ontop of that, an inventory rectangle. 

once you have that, go back to debugging the inventory rectangle. 


*/


/*
idea: 

gonna have a special value for where to place the item on the canvas. gonna
set the x and y values to their initial offset values...thus making all the code
correct. 

the items (such as inv_rect, menu_canvas, and the upcoming stuff like buttons) will
each have a method call set_offset which we will use to update their actual (relative
to the general canvas) x and y values. 


-------------------------

bar is working now 

so 

1) get it drawn on the canvas properly

2) after that, mess around with dragging that stuff around

*/
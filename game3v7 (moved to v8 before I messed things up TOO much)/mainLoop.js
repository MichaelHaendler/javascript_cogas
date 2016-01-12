

//var check = null;

//var inv_rec = new Inventory_Rectangle(2,20,20);

//how to find certain stuff
//grep -rnw '/home/mike/Desktop/java_script_video_game1/game_branch_3/game3v7' -e "var gen_obj"

var menu = new Menu();

// var menu_rect = new Menu_Canvas(20,20,250,400);

var d_bar = new Drag_Bar(100,0,100,25);

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	// ctx.fillStyle="pink";
	// ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	//mike.run(g_direction,g_moved);

	/*
	//all within this documented out piece of code is useful for 
	//testing out a stuff_box and an item with it. 
	// gen_obj.drag_me(mx,my);

	// box.add_item(gen_obj,mlc);
	// box.take_item(mx,my);

	// box.draw_ssi();

	// gen_obj.draw_ssi();

	// var val = box.percentage_filled_by_item(gen_obj);
	// pw.AddToList("val is: " + val);
	*/

	/*
	//for testing inventory_rect (probably not really applicable anymore)
	inv_rec.testing(mx,my,gen_obj,mlc);

	gen_obj.drag_me(mx,my);
	gen_obj.draw_ssi();
	*/

	
	//menu_rect.selected(true);
	//menu_rect.draw_ssi();
	
	/*
	gen_obj.drag_me(mx,my);

	menu.update(mx,my,mlc,gen_obj);

	menu.draw_ssi();

	gen_obj.draw_ssi();
	*/
	// d_bar.drag_me(mx,my,mlc);
	// d_bar.draw_ssi();



	menu.update(mx,my,mlc,gen_obj);
	menu.draw_ssi();

	gen_obj.drag_me(mx,my);
	gen_obj.draw_ssi();

	pw.displayList();

	//testing_thing.test1([35,35]);

	
};//end of mainloop




//going to need a single place to create all of this stuff, as long as a single
//way to run it (though the latter has, in a bad way, been solved.)
var mike = new Person();

var init_loc_on_screen = [100,50];
var width_and_height_of_image_on_screen = [40,40];
var image_name = "health_icon_1";
var image_dimensions = [10,11,110,109];


var gen_obj = new Gen_Obj(init_loc_on_screen,
						  width_and_height_of_image_on_screen,
						  image_name,
						  image_dimensions);

	//blah_img=document.getElementById("health_icon_1");

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	//ctx.drawImage(blah_img,100,0);

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	// var results = gen_obj.mouse_intersects(mx,my);

	// pw.AddToList("results is: " + results);

	// pw.AddToList("key is: " + g_key);

	gen_obj.drag_me(mx,my);

	//mike.testing_site();

	set_user_inputs();//get keyboard and mouse input from user

	//mouse_values();

	mike.run(g_direction,g_moved);

	gen_obj.draw_ssi();
	//gen_obj.testing(mx,my);

	pw.displayList();

	
}//end of mainloop


var gen_obj = new Gen_Obj("health_icon_1");
gen_obj.set_image(10,11,110,109);
gen_obj.set_loc(100,50);
gen_obj.set_display_size(51,52);

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	pw.AddToList("this working?");

	set_user_inputs();

	//mouse_values();

	gen_obj.testing(mx,my);

	pw.displayList();

	
};//end of mainloop
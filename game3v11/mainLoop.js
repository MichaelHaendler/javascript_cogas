

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	// ctx.fillStyle="pink";
	// ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	//pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	th.contains_mouse(mx,my);
	th.draw_ssi();

	// mike.run();

	// test_ts.contains_mouse_check();
	// test_ts.draw_ssi();
	// test_ts.draw_containing_tb();

	pw.displayList();

	
};//end of mainloop

function draw_items(){

	GID.select_item(mx,my);
	GID.draw_ssi();


	if(gen_obj != null){
		gen_obj.drag_me(mx,my);
		gen_obj.draw_ssi();
		pw.print("gen_obj.name is: " + gen_obj.name);
	}
	else{
		pw.print("gen_obj is NULL ");
	}


};



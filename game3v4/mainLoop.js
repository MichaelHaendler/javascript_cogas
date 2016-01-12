

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	//ctx.drawImage(blah_img,100,0);

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	gen_obj.drag_me(mx,my);

	set_user_inputs();//get keyboard and mouse input from user

	mike.run(g_direction,g_moved);

	box.add_item(gen_obj,mlc);
	box.take_item(mx,my);

	box.draw_ssi();

	gen_obj.draw_ssi();

	up_button.choose_graphic(mx,my,mlc);

	up_button.draw_ssi();

	//up_button.show_sheet_test();

	pw.displayList();

	
}//end of mainloop
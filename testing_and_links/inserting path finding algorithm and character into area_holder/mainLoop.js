


var mainloop = function (){

	c.width = c.width;

	ctx.fillStyle="pink";
	ctx.fillRect(0,0,c.width,c.height);
	

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	
	pw.print("ms is: " + ms);
	//pw.print("calc_loc is: " + calc_loc());

	set_user_inputs();//get keyboard and mouse input from user

	//ah.draw_ssi();

	//mike.run();

	//tcb.draw_ssi();

	cbc.draw_ssi();

	pw.displayList();

	
};//end of mainloop







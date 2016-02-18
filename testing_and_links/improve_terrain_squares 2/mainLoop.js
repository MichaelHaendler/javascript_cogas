


var mainloop = function (){

	c.width = c.width;

	ctx.fillStyle="pink";
	ctx.fillRect(0,0,c.width,c.height);
	

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	//th.draw_ssi();
	ah.draw_ssi();
	//test_ts.draw_ssi();

	pw.displayList();

	
};//end of mainloop







// var c2 = document.getElementById("grass_and_rocks_canvas");
// var ctx2 = c2.getContext("2d");

//log_colored("howdy there!","green")

var mainloop = function (){

	// ctx2.fillStyle="black";
	// ctx2.fillRect(0,0,c2.width,c2.height);

	// myCanvas.width = myCanvas.width;
	c.width = c.width;

	// ctx.fillStyle="pink";
	// ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	// ctx.drawImage(c2,10,10);

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	th.contains_mouse(mx,my);
	th.draw_ssi();

	//createWorld();

	pw.displayList();

	
};//end of mainloop






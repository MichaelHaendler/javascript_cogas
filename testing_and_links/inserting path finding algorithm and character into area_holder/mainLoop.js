


var mainloop = function (){

	c.width = c.width;

	ctx.fillStyle="pink";
	ctx.fillRect(0,0,c.width,c.height);
	

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	
	pw.print("ms is: " + ms);
	pw.print("calc_loc is: " + calc_loc());

	set_user_inputs();//get keyboard and mouse input from user

	//ah.draw_ssi();

	//mike.run();

	tcb.draw_ssi();

	pw.displayList();

	
};//end of mainloop


function calc_loc(){

	var length = 4;

	if(ms < 0){
		var tmp_pos_num = ms * -1;

		var mod = tmp_pos_num % length;

		//the "-1" is because otherwise it will go outside the bounds
		//at times (as well as never get to the zero spot in the array)
		var array_loc = length - mod - 1;

		return array_loc;

	}
	else{

		return ms % length;
	}

};







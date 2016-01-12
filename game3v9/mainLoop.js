
//x 250
//y 30
//var check = null;

//var inv_rec = new Inventory_Rectangle(2,20,20);

//how to find certain stuff
//grep -rnw '/home/mike/Desktop/java_script_video_game1/game_branch_3/game3v7' -e "var gen_obj"

//Uncaught InvalidStateError: Failed to execute 'drawImage' 
//on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.

//var menu = new Menu();

// var menu_rect = new Menu_Canvas(20,20,250,400);

//var d_bar = new Drag_Bar(100,0,100,25);

var test = new Text_Button(10,10);

var lets = new Calc_Letter_Size();

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	// ctx.fillStyle="pink";
	// ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	//pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	// mike.run();

	// draw_items();

	test.draw_ssi();

	lets.draw_ssi();

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





// var blah = $('#myCanvas').get(0);

// console.log("blah.height is: " + blah.height);
// console.log("blah.width is: " + blah.width);

var mainloop = function (){

	// ctx.fillStyle="#FF0000";
	// ctx.fillRect(20,20,150,100);

// console.log("$('#myCanvas').get(0).width is: " + $('#myCanvas').get(0).width);
// console.log("$('#myCanvas').get(0).height is: " + $('#myCanvas').get(0).height);

// ctx.rect(0,0,$('#myCanvas').get(0).width,$('#myCanvas').get(0).height);
// ctx.fillStyle="pink";
//ctx.fill();



	myCanvas.width = myCanvas.width;

	ctx.rect(0,0,$('#myCanvas').get(0).width,$('#myCanvas').get(0).height);
	ctx.fillStyle="pink";
	ctx.fill();

	//ctx.drawImage(blah_img,100,0);

	pw.AddToList("hello there.");
	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	gen_obj.drag_me(mx,my);

	set_user_inputs();//get keyboard and mouse input from user

	//mike.run(g_direction,g_moved);

	// box.add_item(gen_obj,mlc);
	// box.take_item(mx,my);

	//box.draw_ssi();

	//inv_rect.update(mx,my,item);

	

	inv_rect.testing();

	gen_obj.draw_ssi();

	//up_button.choose_graphic(mx,my,mlc);

	//up_button.draw_ssi();

	//up_button.show_sheet_test();

	pw.displayList();

	//even though probably a bit crazy, I think a system where I create the elements add them, then remove
	//them, and then create and add them again (ad naseum) will in the long run be best since there will
	//be items and the like going in and out of the game, and I dont want them hanging around on the canvas. 
	//$( "#BLAHEY" ).remove();

	
};//end of mainloop
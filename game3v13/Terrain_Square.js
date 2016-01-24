
//stuff for drawing squares:
//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_rect2

//info about transparency: 
//http://www.w3schools.com/tags/canvas_globalalpha.asp

// (x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

//more colored square stuff
//http://www.w3schools.com/tags/canvas_rect.asp

/*
okay...so now what? 

I think the asci_tss is working

and tss is working. 

--now I need to get path to take in ascii_tss and give a proper output. 

path then needs to be modified so that the width of the path is correct. 

let's have path take in 2 parameters. the person in question (this is being
done because sometimes it wont be characters. sometimes it might be vechicles)
and ascii_tss. the person (or vechicle) will pass it's width/heigh requirements.

the ascii_tss will be used to find a path. 

the path itself has to be verified to be wide enough for the person or whatever
to get through. 


*/

function Terrain_Square(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet){

	//note: kinda needed the width and height of a block before any were defined. 
	//so thats why I made the static variables. besides, a block shouldn't change 
	//in size. 
	this.tb_w = Terrain_Block.w;
	this.tb_h = Terrain_Block.h;

	//note: each terrain block is 10 by 10. in order to make sure that no terrain_square
	//is either too big or too small to be properly filled with terrain_blocks, we are
	//doing this rounding. 

	//this is the ACTUAL width of the ts 
	this.w = Math.round(w/this.tb_w) * this.tb_w;
	this.h = Math.round(h/this.tb_h) * this.tb_h;

	//this is the ACTUAL width of the ts 
	// this.w = w * this.tb_w;
	// this.h = h * this.tb_h;	

	//this represents where this ts is in the array 
	this.array_loc_x = x;
	this.array_loc_y = y;

	//this represents the number of terrain blocks wide this terrain square is. 
	this.array_w = Math.round(w/this.tb_w);
	this.array_h = Math.round(h/this.tb_h);

	// //this represents where this terrain square REALLy goes on the canvas
	// this.x = x * this.w;
	// this.y = y * this.h; 

	//this represents where this terrain square REALLy goes on the canvas
	this.x = x * Terrain_Block.w;
	this.y = y * Terrain_Block.h; 

	// console.log("this.x is: " + this.x);
	// console.log("this.y is: " + this.y);

	//dont need instance here (could have used Terrain_Square.ts_w) but this is simpler. 

	//terrain block count wide. aka how many terrain blocks across in this terrain square
	this.tb_c_w = this.w / this.tb_w;

	//terrain block count high. aka how many terrain blocks down/vertically in this terrain square
	this.tb_c_h = this.h / this.tb_h;


	//for iterating through the array. 
	this.x_end_at = this.array_loc_x + this.tb_c_w;
	this.y_end_at = this.array_loc_y + this.tb_c_h;

	// console.log("Terrain_Block.w is: " + Terrain_Block.w);

	// console.log("this.ts_w is: " + this.ts_w);
	// console.log("this.ts_h is: " + this.ts_h);

	//console.log("1which_sprite_array is: " + which_sprite_array);
	
	//so that these 4 values dont need to be calculated over and over again. 
	this.ulc_x = this.x;
	this.urc_x = this.x + this.w;
	this.ulc_y = this.y;
	this.llc_y = this.y + this.h;

	this.contains_mouse = false;
	this.color = "black";
	this.type = type; //can it be walked on.

	if(this.type == 0){
		this.color = "yellow";
	}
	else if(this.type == 1){
		this.color = "red";
	}

	this.sprite_sheet = document.getElementById(name_of_sprite_sheet);

	this.ssi = new SSI();

	this.loc_of_image_x = which_sprite_array[0];
	this.loc_of_image_y = which_sprite_array[1];

	this.ssi.set_x_y_w_h_dw_and_dh(which_sprite_array[0],
								   which_sprite_array[1],
								   which_sprite_array[2],
								   which_sprite_array[3],
								   this.w,
								   this.h
								   );



	//terrain block array. Holds what parts of the items can be walked over/behind (0)
	//and what parts can't (1)
	this.tba = [];
	this.ascii_tba = [];

	var start_at_x = this.array_loc_x;
	var stop_at_x = this.array_loc_x + this.tb_c_w;
	var start_at_y = this.array_loc_y;
	var stop_at_y = this.array_loc_y + this.tb_c_h;

	// var test_x = 0;
	// var test_y = 0;

	for(var x = start_at_x; x < stop_at_x; x++){

		this.ascii_tba[x] = [];
		this.tba[x] = [];
		// console.log("test_x is: " + test_x);
		// console.log("here, x is: " + x);
		for(var y = start_at_y; y < stop_at_y; y++){

			var tb_loc_x = x * this.tb_w;
			var tb_loc_y = y * this.tb_h;

			// console.log("test_y is: " + test_y);
			// console.log("here, y is: " + y);
			// console.log("tb_loc_x is: " + tb_loc_x);
			// console.log("tb_loc_y is: " + tb_loc_y);

			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,type);

			//the 'x - start_at_x' i *know* is bad. 
			var image_chunk_x = (x - start_at_x) * this.loc_of_image_x;
			var image_chunk_y = (y - start_at_y) * this.loc_of_image_y;

			//each tb already knows how much of the image it needs (it's own width)
			//but now it also knows which section of the image from the sprite sheet
			//source is needed. 
			this.tba[x][y].set_image_xy_chunks(image_chunk_x,image_chunk_y);

			this.ascii_tba[x][y] = type;

			//test_y++;
		}

		// test_x++;

		// test_y = 0;

		//console.log("-----------");

	}

	

};


Terrain_Square.prototype.draw_ssi = function(){

	//for testing only
	this.contains_mouse_check();


	for(var x = 0; x < this.tba.length; x++){
		for(var y = 0; y < this.tba[x].length; x++){

			ctx.drawImage(this.sprite_sheet,
				this.tba[x][y].get_image_chunk_x(),
				this.tba[x][y].get_image_chunk_y(),
				this.tba[x][y].get_image_chunk_w(),
				this.tba[x][y].get_image_chunk_h(),
				this.tba[x][y].x, 
				this.tba[x][y].y,
				this.ssi.destination_width,
				this.ssi.destination_height
			);	

		}
	}




	// ctx.drawImage(this.sprite_sheet,
	// 	this.ssi.start_of_ssi_x,
	// 	this.ssi.start_of_ssi_y,
	// 	this.ssi.s_width,
	// 	this.ssi.s_height,
	// 	this.x, 
	// 	this.y,
	// 	this.ssi.destination_width,
	// 	this.ssi.destination_height
	// );



	// if(this.contains_mouse){

	// 	pw.print("this.array_loc_x is: " + this.array_loc_x);
	// 	pw.print("this.array_loc_y is: " + this.array_loc_y);

	// 	ctx.beginPath();
		
	// 	ctx.lineWidth="1";

	// 	//ctx.strokeStyle="yellow";

	// 	ctx.rect(this.x,
	// 			this.y,
	// 			this.ssi.destination_width,
	// 			this.ssi.destination_height
	// 			);

	// 	ctx.stroke();

	// }

	this.draw_containing_tb();

};

Terrain_Square.prototype.draw_containing_tb = function(){

	this.contains_mouse_check()

	if(this.contains_mouse){

		var tmp_tb = this.get_containing_tb();

		if(tmp_tb != null){
			pw.print("seeing it----------");
			tmp_tb.draw_ssi();
		}
		else{
			pw.print("not seeing it");
		}

	}


};

Terrain_Square.prototype.get_containing_tb = function(){


	// var loc_x = Math.floor(mx / this.tb_w)  - this.array_loc_x;
	// var loc_y = Math.floor(my / this.tb_h)  - this.array_loc_y;
	var loc_x = Math.floor(mx / this.tb_w);
	var loc_y = Math.floor(my / this.tb_h);

	// pw.print("loc_x is: " + loc_x);
	// pw.print("loc_y is: " + loc_y);

	// pw.print("this.tba.length is: " + this.tba.length);
	// pw.print("this.tba[" + loc_x + "].length is: " + this.tba[loc_x].length);

	if(this.tba[loc_x] != null && this.tba[loc_x][loc_y] != null){
		//pw.print("exists");
		return this.tba[loc_x][loc_y];
	}
	else{
		//pw.print("does not exist");
		return null;
	}

};


//draw terrain block (for debugging only)
Terrain_Square.prototype.draw_tb = function(){

	for(var x = 0; x < this.tba.length; x++){

		for(var y = 0; y < this.tba[x].length; y++){

			var tmp_tb = this.tba[x][y];

			pw.print("here???????");
			tmp_tb.draw_ssi();

			// if(tmp_tb.contains_mouse()){
			// 	tmp_tb.draw_ssi();
			// }
			
		}
	}
};


//ba == boundary array. 
//an example of ba:
/*
you have an area like this: 
[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
]

ba looks like this: 
[
[3,1],
[3,2],
]

you then set ba as a parameter to add_boundaries.

and then the area looks like this: 

[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,1,1,0],
]

*/

//for adding boundaries to a ts. see above for how to use it. 
//NOTE: when adding a boundary, no matter where the ts is located,
//said terrain squares upper left hand tb is located at 0,0. The 
//location to the right is 1,0. the location just down from 0,0 is 0,1.
//so on and so forth.  
Terrain_Square.prototype.add_boundaries = function(ba){

	var start_at_point = this.array_loc_x;

	var stop_at_point = this.array_loc_x + ba.length;

	// console.log("before: ")
	// print_2d_array(this.ascii_tba);

	for(var i = 0; i < ba.length; i++){

		var loc = ba[i];

		var tmp_x = loc[0] + this.array_loc_x;
		var tmp_y = loc[1] + this.array_loc_y;

		this.tba[tmp_x][tmp_y].set_block_type(1);

		this.ascii_tba[tmp_x][tmp_y] = 1;

	}

	// console.log("after: ")
	// print_2d_array(this.ascii_tba);

};


//only ever used this in testing. not actual code. 
Terrain_Square.prototype.contains_mouse_check = function(){

	var contains_x = (mx >= this.ulc_x && mx <= this.urc_x);

	if(contains_x){

		var contains_y = (my >= this.ulc_y && my <= this.llc_y);

		if(contains_y){
			this.contains_mouse = true;
		}
		else{
			this.contains_mouse = false;
		}

	}
	else{
		this.contains_mouse = false;
	}

	//pw.print("ts this.contains_mouse is: " + this.contains_mouse);

};


Terrain_Square.prototype.get_ascii_terrain_blocks = function(){

	return this.ascii_tba;

};



//30,31,32
//when accessing these values, the upper left hand corner is 0,0. you ignore
//the specific terrain square's location. this is to make debugging easier. 
Terrain_Square.prototype.get_ascii_terrain_block_type = function(x,y){

	var adj_x = x + this.array_loc_x;
	var adj_y = y + this.array_loc_y;

	return this.ascii_tba[adj_x][adj_y];
	
};





// This book is dedicated to my wife Sharon, who seemed to just disappear 
// shortly after I began taking industrial grade anti-physcotics. 

// This book is dedicated to my wife Sharon, and my daughter Emily, both of 
// whom seemed to just disappear shortly after I began taking industrial 
// grade anti-physcotics.

// This book is dedicated to my wife Sharon, and my daughter Emily, both of 
// whom disappeared shortly after I began a industrial 
// grade anti-physcotics regimine. 

// This book is dedicated to my wife Sharon, and my daughter Emily, both of 
// whom disappeared shortly after I began taking an industrial 
// grade anti-physcotics regimine due to self diaognoised multiple personality
// and sever shciophrenia disorder. 

// 1 horse sized surpository once every half hour on the hour. 

// note to the code readers here.  


//I think that the walking algorithm is going to be slower (makes sense) but the 
//drawing might not be much slower. so keep working on getting that to work. 

//work on getting a square to work (squares should be adjustable in size too. a big
//job. dont forget that).

//then (the above will take a while) work on getting squares to overlay other squares. 

//when you hover over an area, all of the squares right there should light up.  

//--get this working for a single square (and it highlights properly)
//--then mess with dimensions of the object and make sure you can have
//squares/rectangles of different sizes
//--then go up to the add_squar and add_square_with_boundaries method 
//actually, no. it might just work after I do the first two. I think 
//I just need to make sure the stack stuff is working for each tb. 
//as is, Area_Layer does the stack stuff. that's actually good. 
//under the hood, we're going to have each tb section have its own 
//stack. that way we can draw multiple things at the same place. 
//the way this needs to work is...
//we have tb which contains the type and info about it's location. 
//we have ts which contains a 2d array of tbs which will vary based
//on what is entered for w and h. ts also contains a contains_method
//which should help speed up checks for stuff. ts also has a draw_ssi
//that just uses all of its tbs to do the drawing. 
//area_layer (probably should go back to it being called terrain_holder
//since I think I decided to just have it hold the terrain and nothing
//else after all) should go back to what it was in v12. that is to say, no
//stacks. no no no...
// i see it! 
//area_layer also has the 2d array. 
//the width and height of the 2d array are relative to ter blocks rather than ter sqs.  
//however, it will be terrain squares that will be inserted into those locations
//also, each one of those "terrain block" locations will be stacks. 
//so instead of have each location being based on some standard sized square, each one will
//be a stack. 
//when it comes to printing, we will have to go through the 2d array in area_layer. 
//check if size is 0 (because plenty of the spots will be in fact empty, and will simply)
//have a lot of areas that are being covered by other squares. 
//so area layer has the queue after all (it's not a stack, it's a queue that I need to use).
//how about printing? 
//this brings us back to our original issue of images being drawn over others. frak. 
//could basically delete terrain square. make it into more of a method. 
//make an area_layer (soon to be terrain_holder again) instance. 
//okay okay okay. 
//area_layer has a 2d array relati

//lol could redo this shit to a large degree. and like I said, get rid of terrain_Square
//(at least for the most part). 
//area square then has 2 arrays. the tba array and the ascii_tba. 
//each tb will now have an ssi associated with it. 
//iterate through your 2d array of queues, where said queues contain tbs. 
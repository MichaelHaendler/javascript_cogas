

function Terrain_Square(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba){

	//just for debugging (sprite sheet name)
	this.ss_name = name_of_sprite_sheet;

	//note: kinda needed the width and height of a block before any were defined. 
	//so thats why I made the static variables. besides, a block shouldn't change 
	//in size. 
	this.tb_w = Terrain_Block.w;//thickness
	this.tb_l = Terrain_Block.l;//how long/wide it is
	this.tb_h = Terrain_Block.h;//height


	//this represents where this terrain square REALLy goes on the canvas
	this.x = x * Terrain_Block.w;
	this.y = y * Terrain_Block.h; 
	this.default_type = Terrain_Block.can_walk; //can it be walked on.

	//note: each terrain block is 10 by 10. in order to make sure that no terrain_square
	//is either too big or too small to be properly filled with terrain_blocks, we are
	//doing this rounding. 

	//this is the ACTUAL width of the ts 
	this.w = Math.round(w/this.tb_w) * this.tb_w;
	this.l = Math.round(l/this.tb_l) * this.tb_l;
	this.h = Math.round(h/this.tb_h) * this.tb_h;

	//this is the ACTUAL width of the ts 
	// this.w = w * this.tb_w;
	// this.l = h * this.tb_l;	

	//this represents where this ts is in the array 
	this.array_loc_x = x;
	this.array_loc_y = y;

	//array_w represents the number of terrain blocks wide this terrain square is. 
	this.array_w = Math.round(w/this.tb_w);
	this.array_l = Math.round(l/this.tb_l);
	this.array_h = Math.round(h/this.tb_h);

	//dont need instance here (could have used Terrain_Square.ts_w) but this is simpler. 

	//terrain block count wide. aka how many terrain blocks down/vertically in this terrain square

	this.tb_c_w = this.w / this.tb_w;

	//terrain block count long. aka how many terrain blocks across in this terrain square
	this.tb_c_l = this.l / this.tb_l;

	this.tb_c_h = this.h / this.tb_h;


	//for iterating through the array. 
	this.x_end_at = this.array_loc_x + this.tb_c_w;
	this.y_end_at = this.array_loc_y + this.tb_c_l;

	// console.log("Terrain_Block.w is: " + Terrain_Block.w);

	// console.log("this.ts_w is: " + this.ts_w);
	// console.log("this.ts_h is: " + this.ts_h);

	//console.log("1which_sprite_array is: " + which_sprite_array);
	
	//so that these 4 values dont need to be calculated over and over again. 
	this.ulc_x = this.x;
	this.urc_x = this.x + this.w;
	this.ulc_y = this.y;
	this.llc_y = this.y + this.l;

	this.contains_mouse = false;
	this.color = "black";
	

	//console.log("this.default_type is: " + this.default_type);

	if(this.default_type == 0){
		this.color = "yellow";
	}
	else if(this.default_type == 1){
		this.color = "red";
	}

	// console.log("name_of_sprite_sheet is: " + name_of_sprite_sheet);
	// console.log("which_sprite_array is: ");
	// console.log(which_sprite_array);

	this.sprite_sheet = document.getElementById(name_of_sprite_sheet);

	this.ssi = new SSI();



	this.ssi.set_x_y_w_h_dw_and_dh(which_sprite_array[0],
								   which_sprite_array[1],
								   which_sprite_array[2],
								   which_sprite_array[3],
								   this.w,
								   this.l
								   );


	//initiates the z array
	this.tba = [];

	//terrain block array. Holds what parts of the items can be walked over/behind (0)
	//and what parts can't (1)
	this.ascii_tba = [];

	//this.set_arrays1();

	//console.log("============================================");

	this.set_tb_design(x,y,ba);

	print_2d_array(this.ascii_tba[0]);

	//set terrain block design. set where this terrain square can and cannot be walked on or
	//how and how not it can be interacted with. is this a solid rock? Or is it a rock
	//that has a hole in the middle of it that can be shot through when crouching? 
	//set_tang
	//this.set_tb_design(x,y,ba);


	// console.log(x,y,w,l,h,type,which_sprite_array,name_of_sprite_sheet);
	// console.log("h is: " + h);
	// console.log("type is: " + type);
	// console.log("which_sprite_array is: " + which_sprite_array);
	

	///height stuff 
	//this.h = h;

	//

	//barrier
	this.ba = [];

	this.default_type = 0;

};



Terrain_Square.prototype.set_arrays1 = function(){

	var start_at_x = this.array_loc_x;
	var stop_at_x = this.array_loc_x + this.tb_c_w;
	var start_at_y = this.array_loc_y;
	var stop_at_y = this.array_loc_y + this.tb_c_l;


	for(var x = start_at_x; x < stop_at_x; x++){

		this.ascii_tba[x] = [];
		this.tba[x] = [];

		for(var y = start_at_y; y < stop_at_y; y++){

			var tb_loc_x = x * this.tb_w;
			var tb_loc_y = y * this.tb_l;

			console.log("x is: " + x);
			console.log("y is: " + y);
			console.log("tb_loc_x is: " + tb_loc_x);
			console.log("tb_loc_y is: " + tb_loc_y);


			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,this.default_type);
			this.ascii_tba[x][y] = this.default_type;
		}

	}

};

//not in use at the moment. 
Terrain_Square.prototype.set_arrays2 = function(ba){

	if(ba.d_array == true){
		this.set_arrays_1d(ba);
	}
	else{
		this.set_arrays_2d(ba);
	}

};


///okay okay okay...I get this. 
//it will have a copy of a 3d array of tb's and ascci tb's. 
//(lol god dangit this complicates stuff. hopefully it'll pay off later on) 
//anyway, the arrays will go z,x,y
//once this is formated properly...it should be a bunch 
//easier to insert said terrain squares 3d values into the 
//general z,x,y ascii_tsa and tsa  which is really the final goal there. 
Terrain_Square.prototype.set_tb_design = function(start_at_x,start_at_y,ba){

	//need to use starting location...but that's it! :-) 

	// var start_at_x = this.array_loc_x;
	// var start_at_y = this.array_loc_y;

	for(var tmp_obj of ba){

		var z = tmp_obj.layer;

		console.log("--------------------");
		console.log("z is: " + z);

		//initiate x layers
		this.tba[z] = [];
		this.ascii_tba[z] = [];

		//get layer
		var ts_layer = tmp_obj.ts_layer;
		
		//iterate through 2d array.
		for(var x = 0; x < ts_layer.length; x++){

			//terrain block location x (location of a particular tb)
			var tb_loc_x = (start_at_x + x) * this.tb_w;

			//array location x
			var alx = (start_at_x + x);

			//initiate y layers
			this.ascii_tba[z][alx] = [];
			this.tba[z][alx] = [];

			for(var y = 0; y < ts_layer[x].length; y++){

				//terrain block location y (location of a particular tb)
				var tb_loc_y = (start_at_y + y) * this.tb_l;

				//array location x (and y). is used to say where in the xy plane
				//this terrain square is supposed to go. 
				
				var aly = (start_at_y + y);

				//type value. 1, 0, etc. 
				var type_val = ts_layer[x][y];

				// console.log("x is: " + alx);
				// console.log("y is: " + aly);
				// console.log("tb_loc_x is: " + tb_loc_x);
				// console.log("tb_loc_y is: " + tb_loc_y);
				// console.log("this.tba is: ");
				// console.log(this.tba);
				// console.log("this.tba[z] is: ");
				// console.log(this.tba[0]);
				// console.log("this.tba[z][x] is: ");
				// console.log(this.tba[0][0]);
				// console.log("this.tba[z][x][y] is: ");
				// console.log(this.tba[0][0][0]);

				this.tba[z][alx][aly] = new Terrain_Block(tb_loc_x,tb_loc_y,type_val);
				this.ascii_tba[z][alx][aly] = type_val;
			}

		}

	}

}

Terrain_Square.prototype.set_arrays_2d = function(ba){



}



//number of layers (in the 3d array) tall this terrain square is. 
Terrain_Square.prototype.get_layer_count = function(){
	return this.array_h;
};



Terrain_Square.prototype.draw_ssi = function(){

	//for testing only
	this.contains_mouse_check();

	// console.log("this.ssi.start_of_ssi_x is: " + this.ssi.start_of_ssi_x);
	// console.log("this.ssi.start_of_ssi_y is: " + this.ssi.start_of_ssi_y);
	// console.log("this.ssi.s_width is: " + this.ssi.s_width);
	// console.log("this.ssi.s_height is: " + this.ssi.s_height);
	// console.log("this.x is: " + this.x);
	// console.log("this.y is: " + this.y);
	// console.log("this.ssi.destination_width is: " + this.ssi.destination_width);
	// console.log("this.ssi.destination_height is: " + this.ssi.destination_height);
	// console.log(this.sprite_sheet);


	ctx.drawImage(this.sprite_sheet,
		this.ssi.start_of_ssi_x,
		this.ssi.start_of_ssi_y,
		this.ssi.s_width,
		this.ssi.s_height,
		this.x, 
		this.y,
		this.ssi.destination_width,
		this.ssi.destination_height
	);

	//undocument out in order to see square.
	//this.draw_sq_around_ts();

	this.draw_containing_tb();

};

//for debugging only
Terrain_Square.prototype.draw_sq_around_ts = function(){

	if(this.contains_mouse){

		pw.print("this.array_loc_x is: " + this.array_loc_x);
		pw.print("this.array_loc_y is: " + this.array_loc_y);

		ctx.beginPath();
		
		ctx.lineWidth="1";

		//ctx.strokeStyle="yellow";

		ctx.rect(this.x,
				this.y,
				this.ssi.destination_width,
				this.ssi.destination_height
				);

		ctx.stroke();

	}

};


Terrain_Square.prototype.draw_containing_tb = function(){

	this.contains_mouse_check()

	if(this.contains_mouse){

		var tmp_tb = this.get_containing_tb();

		if(tmp_tb != null){
			//pw.print("seeing it");
			tmp_tb.draw_ssi();
		}
		// else{
		// 	pw.print("not seeing it");
		// }

	}


};

Terrain_Square.prototype.get_containing_tb = function(){


	// var loc_x = Math.floor(mx / this.tb_w)  - this.array_loc_x;
	// var loc_y = Math.floor(my / this.tb_l)  - this.array_loc_y;
	var loc_x = Math.floor(mx / this.tb_w);
	var loc_y = Math.floor(my / this.tb_l);

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

			tmp_tb.draw_ssi();

			// if(tmp_tb.contains_mouse()){
			// 	tmp_tb.draw_ssi();
			// }
			
		}
	}
};


//this is to be used for rocks, abandoned cars, etc. things that
//block a characters path. 
Terrain_Square.prototype.set_type = function(num){

	//console.log("getting in here");

	for(x in this.tba){
		for(y in this.tba[x]){
			this.tba[x][y].set_block_type(num);
			this.ascii_tba[x][y] = num;
		}
	}
};


Terrain_Square.prototype.get_type = function(num){
	return this.default_type;
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

/*
//old
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
*/

//new. :-) 

// var ba = [
// 		{layer: 0, start_loc: [0,2], row_vals: [1,1,1], d_array: false},
// 		{layer: 1, start_loc: [0,2], row_vals: [1,1,1], d_array: false},
// 		{layer: 2, start_loc: [0,2], row_vals: [1,1,1], d_array: false}
// 		];
Terrain_Square.prototype.add_boundaries = function(ba){

	for(var obj of ba){

		//get [1,1,1]
		var row_vals = obj.row_vals;

		//get 0 of [0,2]
		var x = obj.start_loc[0];

		//this will tell me on the x axis how far over on the screen this 
		//tb starts. (used in for loop)
		var tb_loc_x = start_loc_x * this.tb_w;

		//get 2 of [0,2]
		var start_loc_y = obj.start_loc[1];

		//get where to stop (the starting spot and the ending spot)
		var end = start_loc_y + row_vals.length;

		//so y starts at 2, and goes up to 4 before stopping (or gets to 5 and
		//doesn't complete the whole process)
		for(var y = start_loc_y; y < end; y++){

			//this tells me how far down the screen on the y axis  this tb starts 
			var tb_loc_y = y * this.tb_l;

			//0 should be thought of as be x - x. 
			//for the y part...I need it to go "0,1,2,3...etc"
			var type = row_vals[0][y - start_loc_y];

			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,Terrain_Block.cannot_walk);

		}

	}

};

/*
lol well I'm changing it...so how about the size shyte? okay, yeah. lol. fuck it. 

no defining the size via numbers (to simplify stuff)

we're going to define it via the boundaries (or lack thereof)

going to need z,x,y coords for all this stuff though. 

the z,x,y coords will help identify what is in front of, behind, etc, everything else. 


----

thoughts: 

when ts is working the way that I want it to...I dunno. 

I guess start with terrain holder. make sure that an all
grass layer works, then try with a rock. will be a field of zeros 
with a single small row of ones :-P 

after that, move onto area holder in order to get all of the layers
for rock working. 

then start testing with multiple rocks. but at that point you should be groovy. ;-) 


//all location sets need to be 2d arrays. 
*/


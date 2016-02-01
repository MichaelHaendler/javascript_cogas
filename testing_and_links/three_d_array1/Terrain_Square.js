

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

	this.ssi.set_x_y_w_h_dw_and_dh(which_sprite_array[0],
								   which_sprite_array[1],
								   which_sprite_array[2],
								   which_sprite_array[3],
								   this.w,
								   this.h
								   );


	this.tba = [];

	//terrain block array. Holds what parts of the items can be walked over/behind (0)
	//and what parts can't (1)
	this.ascii_tba = [];



	var start_at_x = this.array_loc_x;
	var stop_at_x = this.array_loc_x + this.tb_c_w;
	var start_at_y = this.array_loc_y;
	var stop_at_y = this.array_loc_y + this.tb_c_h;


	for(var x = start_at_x; x < stop_at_x; x++){

		this.ascii_tba[x] = [];
		this.tba[x] = [];

		for(var y = start_at_y; y < stop_at_y; y++){

			var tb_loc_x = x * this.tb_w;
			var tb_loc_y = y * this.tb_h;

			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,type);
			this.ascii_tba[x][y] = type;
		}

	}

};


//number of layers (in the 3d array) tall this terrain square is. 
Terrain_Square.prototype.get_layer_count = function(){
	return this.array_h;
};



Terrain_Square.prototype.draw_ssi = function(){

	//for testing only
	this.contains_mouse_check();

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

	this.draw_containing_tb();

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
	return this.type;
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
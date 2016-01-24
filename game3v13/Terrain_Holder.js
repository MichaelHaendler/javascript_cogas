
//push and pop are what you use to treat an array like a queue in js. 
//http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript

function Terrain_Holder(terrain_blocks_across,terrain_blocks_down){


	//terrain blocks wide: number of terrain blocks across x axis. 
	this.tbw = terrain_blocks_across;

	//terrain blocks high. number of terrain blocks down y axis. 
	this.tbh = terrain_blocks_down;

	//canvas width
	//gaw (game)
	this.c_w = this.tbw * Terrain_Block.w;

	//canvas height
	this.c_h = this.tbh * Terrain_Block.h;


	this.nos = (this.tbw >= this.tbh) ? this.tbw : this.tbh;

	this.contains = false;
	this.contains_x = null;
	this.contains_y = null;

	//terrain squares
	//terrain block array
	this.tba = [];

	//sets each [x,y] loc with an array (which will be treated like a queue)
	this.init_tba();

	//same as this.tba except it holds numbers in place of objects. 
	//is good for things like the path finding code. 
	this.ascii_tba = [];

	this.init_ascii_tba();

	var backup_ascii_tss = [];
	var backup_tss = [];

	this.default_type = 0;

};

Terrain_Holder.prototype.init_tba = function(){


	for(var x = 0; x < this.nos; x++){

		this.tba[x] = [];

		for(var y = 0; y < this.nos; y++){

			this.tba[x][y] = null;

		}
	}


};


//represents entire canvas (and not just what is defined)
//reason for this has to do with the path finding algorithm needing 
//the array to be square. honestly, I might come back, and change this
//code to be virtually identicle to init_tss.
Terrain_Holder.prototype.init_ascii_tba = function(){

	var canvas_width = c.width;

	var canvas_height = c.height;

	var canvas_size = (canvas_width >= canvas_height) ? canvas_width : canvas_height;

	//terrain block count size (the biggest of either height or width)
	//note: doing this 'size' thing rather than by width and height because of walking/shortest path
	//algorithm which requires both w and h have to be the same. 
 	var tbc_s = Math.ceil(canvas_size/Terrain_Block.w);


 	var tmp_array = [];

	for(var x = 0; x < tbc_s; x++){

		this.ascii_tba[x] = [];

		for(var y = 0; y < tbc_s; y++){

			this.ascii_tba[x][y] = null;

		}
	}

};



//including w and h here because not all sprite squares are going to be the same size. 
//x is where it goes in the array. same with y. 
//w is for how wide it should be displayed as (how many ter blocks across). same idea with h
//which_sprite_array is used to actually selected the image
//name_of_sprite_sheet tells you which sprite sheet to use. 
Terrain_Holder.prototype.add_square = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet){

	var tb_w = Terrain_Block.w;
	var tb_h = Terrain_Block.h;

	//terrain block count wide. aka how many terrain blocks across in this terrain square
	var tb_c_w = Math.round(w / tb_w);

	//terrain block count high. aka how many terrain blocks down/vertically in this terrain square
	var tb_c_h = Math.round(h / tb_h);

	var start_at_x = x;
	var stop_at_x = x + tb_c_w;
	var start_at_y = y;
	var stop_at_y = y + tb_c_h;

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
	}


	// ////////////////////////////////////

	// //build instance
	// var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);



	// //var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);


	// //if it doesn't equal to null that means there's an array there already. 
	// //so push the current square onto it.
	// if(this.tba[x][y] != null){
	// 	this.tba[x][y].push(tmp_ts);
	// }
	// else{
	// 	//else, if that location IS null, set it as an array, and push
	// 	//the terrain square onto it. 
	// 	this.tba[x][y] = [];
	// 	this.tba[x][y].push(tmp_ts);
	// }

	

	// this.add_to_ascii_tss(tmp_ts);	

};


//ba == boundary array 

Terrain_Holder.prototype.add_square_w_boundaries = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet,ba){
//Terrain_Holder.prototype.add_square_w_boundaries = function(x,y,type,which_sprite_array,name_of_sprite_sheet,ba){

	//temp terrain square
	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);

	//add boundaries to item 
	tmp_ts.add_boundaries(ba);

	//if it doesn't equal to null that means there's an array there already. 
	//so push the current square onto it. 
	if(this.tba[x][y] != null){
		this.tba[x][y].push(tmp_ts);
	}
	else{
		this.tba[x][y] = [];
		this.tba[x][y].push(tmp_ts);
	}

	this.add_to_ascii_tss(tmp_ts);



};

Terrain_Holder.prototype.add_to_ascii_tss = function(tmp_ts){

	//this represents the type of area that cannot be replaced
	//if stepped on. here are the general rules
	//null: (nothing) can be replaced by a 1 or a 0
	//0: can be replaced by a 1
	//1: cannot be replaced
	var non_replaceable_type = 1;

	for(var x = 0; x < tmp_ts.array_w; x++){

		for(var y = 0; y < tmp_ts.array_h; y++){

			//tmp_ts.array_loc_x is the starting x loc for the object in the array
			//x will iterate from something like 0 to 2
			var array_x = tmp_ts.array_loc_x + x;

			//same deal as with x and array_loc_x
			var array_y = tmp_ts.array_loc_y + y;

			if(this.ascii_tba[array_x][array_y] != non_replaceable_type){
				this.ascii_tba[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
			}

			
			//this.ascii_tba[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
		}
	}

	//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	//right now you are getting the tb drawing to work when the ts isn't at 0,0
	print_2d_array(this.ascii_tba);
};



//important note of need to dos: 
//--get terrain holder with area_builder working (yay! almost there!)
//--need a method for taking a character, and setting it's ascii double array
//as part of the map 

//d_array == double array 
//add temporary terrain blocks (will need to be able to revert back)
// Terrain_Holder.prototype.add_tmp_tbs = function(x,y,d_array){



// };

Terrain_Holder.prototype.contains_mouse = function(x,y){

	// var tmpx = Math.floor(x/this.wos);
	// var tmpy = Math.floor(y/this.hos);
	// pw.print("|");
	// pw.print("tmpx is: " + tmpx);
	// pw.print("tmpy is: " + tmpy);


	if((x >= 0 && x < this.c_w) &&
	   (y >= 0 && y < this.c_h)){

		this.contains = true;
		// this.contains_x = x;
		// this.contains_y = y;
		this.contains_x = Math.floor(x/this.tbw);
		this.contains_y = Math.floor(y/this.tbh);
	}
	else{
		this.contains = false;
		this.contains_x = null;
		this.contains_y = null;
	}

};


Terrain_Holder.prototype.draw_ssi = function(){

	// this.tba[0][0].contains_mouse = true;
	// this.tba[0][0].draw_ssi();


	//to speed up the second if statement.
	var need_to_set_back_to_false = false;

	//temporary terrain square object
	var tmp_ts_obj = null;
	
	if(this.contains){
		// if(	this.tba[this.contains_x] != null && 
		// 	this.tba[this.contains_x][this.contains_y] != null){
		// 	this.tba[this.contains_x][this.contains_y].contains_mouse = true;
		// 	need_to_set_back_to_false = true;
		// }

		//the land graphic should always be the first thing pushed onto the stack. 
		// tmp_ts_obj = this.tba[this.contains_x][this.contains_y][0];
		// tmp_ts_obj.contains_mouse = true;
		// need_to_set_back_to_false = true;


		if(	this.tba[this.contains_x][this.contains_y] != null){
			//the land graphic should always be the first thing pushed onto the stack. 
			tmp_ts_obj = this.tba[this.contains_x][this.contains_y][0];
			tmp_ts_obj.contains_mouse = true;
			need_to_set_back_to_false = true;
		}

	}


	//console.log("------------------------------------");

	//console.log("")

	for(var x = 0; x < this.tba.length; x++){
		for(var y = 0; y < this.tba[x].length; y++){

			//if(this.tba[x] != null && this.tba[x][y] != null){
			if(this.tba[x][y] != null){

				var tmp_array = this.tba[x][y];

				for(var i = 0; i < tmp_array.length; i++){

					var tmp_ts = tmp_array[i];
					tmp_ts.draw_ssi();
					//tmp_ts.draw_containing_tb();

				}

				// tmp_ts = this.tba[x][y];
				// tmp_ts.draw_ssi();
				// tmp_ts.draw_containing_tb();
			}
			
		}
	}


	if(need_to_set_back_to_false){
		//this.tba[this.contains_x][this.contains_y].contains_mouse = false;	
		tmp_ts_obj.contains_mouse = false;
	}
	

};

//idea: 

/*
lol. fucking...lol. why not though, right? 

fuck making it really 3d. at least for now. debug what you currently 
have, switching over to the "clean_rock" graphic. 

dont even have a method for adding ground items or anything. 

leave the person how he currently is. just pass him the array, and

use that to figure out whether he can or cannot move forward. 

*/


Terrain_Holder.prototype.get_ascii_map = function(){

	return this.ascii_tba;
};


Terrain_Holder.prototype.get_worldWidth = function(){

	return (this.wos * this.tba.length);

};


Terrain_Holder.prototype.get_worldHeight = function(){

	return (this.hos * this.tba[0].length);

};

Terrain_Holder.prototype.get_tileHeight = function(){

	return this.tile_height;

};


Terrain_Holder.prototype.get_tileWidth = function(){

	return this.tile_Width;

};

Terrain_Holder.prototype.testing = function(){

	//this.tba[0][1]

};

/*
http://stackoverflow.com/questions/565430/deep-copying-an-array-using-jquery

you have the 2d array of objects (and some nulls in there too)

use example below to copy said 2d array of objects

ex from link: 

var a =[[1], [2], [3]];
var b = $.extend(true, [], a);

b.shift().shift();
// a is still [[1], [2], [3]]

iterate through all of the locs 1 by 1, using the nested x and y for loops

check the array as you go along. 

if the array at the location is empty after you pop off the array, then delete
that array. 

note: instead of deep copying and shit...maybe I could just mark everything? I dunno. 

*/

//push and pop are what you use to treat an array like a queue in js. 
//http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript

function Terrain_Layer(terrain_blocks_across,terrain_blocks_down){


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
	this.tsa = [];

	//sets each [x,y] loc with an array (which will be treated like a queue)
	this.init_tba();

	//same as this.tsa except it holds numbers in place of objects. 
	//is good for things like the path finding code. 
	this.ascii_tsa = [];

	this.init_ascii_tba();

	var backup_ascii_tss = [];
	var backup_tss = [];

	this.default_type = 0;

};

Terrain_Layer.prototype.init_tba = function(){


	for(var x = 0; x < this.nos; x++){

		this.tsa[x] = [];

		for(var y = 0; y < this.nos; y++){

			this.tsa[x][y] = null;
			//this.tsa[x][y] = 0;

		}
	}


};


//represents entire canvas (and not just what is defined)
//reason for this has to do with the path finding algorithm needing 
//the array to be square. honestly, I might come back, and change this
//code to be virtually identicle to init_tss.
Terrain_Layer.prototype.init_ascii_tba = function(){

	var canvas_width = c.width;

	var canvas_height = c.height;

	var canvas_size = (canvas_width >= canvas_height) ? canvas_width : canvas_height;

	//terrain block count size (the biggest of either height or width)
	//note: doing this 'size' thing rather than by width and height because of walking/shortest path
	//algorithm which requires both w and h have to be the same. 
 	var tbc_s = Math.ceil(canvas_size/Terrain_Block.w);


 	var tmp_array = [];

	for(var x = 0; x < tbc_s; x++){

		this.ascii_tsa[x] = [];

		for(var y = 0; y < tbc_s; y++){

			// this.ascii_tsa[x][y] = null;
			this.ascii_tsa[x][y] = 0;

		}
	}

};

//this method exists so that if theres ever a time where I have multiple unwalkable types, that it'll
//be easier to incorporate into the code 
Terrain_Layer.prototype.un_walkable_type = function(num){

	var unwalkable_type1 = 1;
	//var unwalkable_type2;

	if(num == unwalkable_type1){return true;}

	return false;
};



//including w and h here because not all sprite squares are going to be the same size. 
//x is where it goes in the array. same with y. 
//w is for how wide it should be displayed as (how many ter blocks across). same idea with h
//which_sprite_array is used to actually selected the image
//name_of_sprite_sheet tells you which sprite sheet to use.

//in the terrain square array, there will be spaces between the squares. however, in the 
//ascii_tsa, there will be no spaces. 


Terrain_Layer.prototype.add_square = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet){

	//make the ts

	//temp terrain square
	//var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);

	this.tsa[x][y] = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);
	 

	// //check if it contains 1 (or some unwalkable type) at all
	// if(this.un_walkable_type(tmp_ts.get_type())){
	// 	//if it does, you need to make the proper changes to the ascii_tsa


	// }
	// else{

	// 	//otherwise, just add it to tsa.

	// }




	//--------------------------------------------------------------------
	// var tb_w = Terrain_Block.w;
	// var tb_h = Terrain_Block.h;

	// //terrain block count wide. aka how many terrain blocks across in this terrain square
	// var tb_c_w = Math.round(w / tb_w);

	// //terrain block count high. aka how many terrain blocks down/vertically in this terrain square
	// var tb_c_h = Math.round(h / tb_h);

	// var start_at_x = x;
	// var stop_at_x = x + tb_c_w;
	// var start_at_y = y;
	// var stop_at_y = y + tb_c_h;

	// // var test_x = 0;
	// // var test_y = 0;

	// for(var x = start_at_x; x < stop_at_x; x++){

	// 	this.ascii_tsa[x] = [];
	// 	this.tsa[x] = [];
	// 	// console.log("test_x is: " + test_x);
	// 	// console.log("here, x is: " + x);
	// 	for(var y = start_at_y; y < stop_at_y; y++){

	// 		var tb_loc_x = x * this.tb_w;
	// 		var tb_loc_y = y * this.tb_h;

	// 		// console.log("test_y is: " + test_y);
	// 		// console.log("here, y is: " + y);
	// 		// console.log("tb_loc_x is: " + tb_loc_x);
	// 		// console.log("tb_loc_y is: " + tb_loc_y);

	// 		this.tsa[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,type);

	// 		//the 'x - start_at_x' i *know* is bad. 
	// 		var image_chunk_x = (x - start_at_x) * this.loc_of_image_x;
	// 		var image_chunk_y = (y - start_at_y) * this.loc_of_image_y;

	// 		//each tb already knows how much of the image it needs (it's own width)
	// 		//but now it also knows which section of the image from the sprite sheet
	// 		//source is needed. 
	// 		this.tsa[x][y].set_image_xy_chunks(image_chunk_x,image_chunk_y);

	// 		this.ascii_tsa[x][y] = type;

	// 		//test_y++;
	// 	}
	// }

};



Terrain_Layer.prototype.add_3d_item = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet,ba){

	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);

	

};



//ba == boundary array 

	// //check if it contains 1 (or some unwalkable type) at all
	// if(this.un_walkable_type(tmp_ts.get_type())){
	// 	//if it does, you need to make the proper changes to the ascii_tsa

Terrain_Layer.prototype.add_square_w_boundaries = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet,type){
//Terrain_Layer.prototype.add_square_w_boundaries = function(x,y,type,which_sprite_array,name_of_sprite_sheet,ba){

	//temp terrain square
	var tmp_ts = new Terrain_Square(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet);

	//the ascii_tb from a single ts. 
	var tmp_single_ascii_tba = tmp_ts.get_ascii_terrain_blocks();

	//we then take the last row (aka the base) of the image...
	var base = tmp_single_ascii_tba[tmp_single_ascii_tba.length - 1];

	//and set those particular tb's in the ascii_tsa to be unwalkable. 
	for(var tb in base){

		this.ascii_tsa[tb.x][tb.y] = tmp_ts.get_type();

	}

};

// Terrain_Layer.prototype.add_to_ascii_tss = function(tmp_ts){

// 	//this represents the type of area that cannot be replaced
// 	//if stepped on. here are the general rules
// 	//null: (nothing) can be replaced by a 1 or a 0
// 	//0: can be replaced by a 1
// 	//1: cannot be replaced
// 	var non_replaceable_type = 1;

// 	for(var x = 0; x < tmp_ts.array_w; x++){

// 		for(var y = 0; y < tmp_ts.array_h; y++){

// 			//tmp_ts.array_loc_x is the starting x loc for the object in the array
// 			//x will iterate from something like 0 to 2
// 			var array_x = tmp_ts.array_loc_x + x;

// 			//same deal as with x and array_loc_x
// 			var array_y = tmp_ts.array_loc_y + y;

// 			if(this.ascii_tsa[array_x][array_y] != non_replaceable_type){
// 				this.ascii_tsa[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
// 			}

			
// 			//this.ascii_tsa[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
// 		}
// 	}

// 	//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// 	//right now you are getting the tb drawing to work when the ts isn't at 0,0
// 	print_2d_array(this.ascii_tsa);
// };



Terrain_Layer.prototype.contains_mouse = function(x,y){


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


Terrain_Layer.prototype.draw_ssi = function(){

	// this.tsa[0][0].contains_mouse = true;
	// this.tsa[0][0].draw_ssi();


	//to speed up the second if statement.
	var need_to_set_back_to_false = false;

	//temporary terrain square object
	var tmp_ts_obj = null;
	
	if(this.contains){

		if(	this.tsa[this.contains_x][this.contains_y] != null){
			//the land graphic should always be the first thing pushed onto the stack. 
			tmp_ts_obj = this.tsa[this.contains_x][this.contains_y][0];
			tmp_ts_obj.contains_mouse = true;
			need_to_set_back_to_false = true;
		}

	}


	//console.log("------------------------------------");

	//console.log("")

	for(var x = 0; x < this.tsa.length; x++){
		for(var y = 0; y < this.tsa[x].length; y++){

			//if(this.tsa[x] != null && this.tsa[x][y] != null){
			if(this.tsa[x][y] != null){

				var tmp_array = this.tsa[x][y];

				for(var i = 0; i < tmp_array.length; i++){

					var tmp_ts = tmp_array[i];
					tmp_ts.draw_ssi();
					//tmp_ts.draw_containing_tb();

				}

				// tmp_ts = this.tsa[x][y];
				// tmp_ts.draw_ssi();
				// tmp_ts.draw_containing_tb();
			}
			
		}
	}


	if(need_to_set_back_to_false){
		//this.tsa[this.contains_x][this.contains_y].contains_mouse = false;	
		tmp_ts_obj.contains_mouse = false;
	}
	

};


Terrain_Layer.prototype.get_ascii_map = function(){

	return this.ascii_tsa;
};


Terrain_Layer.prototype.get_worldWidth = function(){

	return (this.wos * this.tsa.length);

};


Terrain_Layer.prototype.get_worldHeight = function(){

	return (this.hos * this.tsa[0].length);

};

Terrain_Layer.prototype.get_tileHeight = function(){

	return this.tile_height;

};


Terrain_Layer.prototype.get_tileWidth = function(){

	return this.tile_Width;

};

Terrain_Layer.prototype.testing = function(){

	//this.tsa[0][1]

};



//push and pop are what you use to treat an array like a queue in js. 
//http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript

function Area_Layer(terrain_blocks_across,terrain_blocks_down){


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

	//biggest size. 
	//this.b_size = (this.c_w >= this.c_h) ? this.c_w : this.c_h;

	// console.log("this.c_w is: " + this.c_w);
	// console.log("this.c_h is: " + this.c_h);

	this.contains = false;
	this.contains_x = null;
	this.contains_y = null;

	//terrain squares
	this.tss = [];

	//sets each [x,y] loc with an array (which will be treated like a queue)
	this.init_tss();

	//same as this.tss except it holds numbers in place of objects. 
	//is good for things like the path finding code. 
	this.ascii_tss = [];

	this.init_ascii_tss();

	var backup_ascii_tss = [];
	var backup_tss = [];

	this.default_type = 0;

};

Area_Layer.prototype.init_tss = function(){


	for(var x = 0; x < this.nos; x++){

		this.tss[x] = [];

		for(var y = 0; y < this.nos; y++){

			this.tss[x][y] = null;

		}
	}

	console.log("2 this.tss.length is: " + this.tss.length);

	console.log("2 this.tss[0].length is: " + this.tss[0].length);


};


Area_Layer.prototype.init_ascii_tss = function(){

	var canvas_width = c.width;

	var canvas_height = c.height;

	var canvas_size = (canvas_width >= canvas_height) ? canvas_width : canvas_height;

	//terrain block count size (the biggest of either height or width)
	//note: doing this 'size' thing rather than by width and height because of walking/shortest path
	//algorithm which requires both w and h have to be the same. 
 	var tbc_s = Math.ceil(canvas_size/Terrain_Block.w);


 	var tmp_array = [];

	for(var x = 0; x < tbc_s; x++){

		this.ascii_tss[x] = [];

		for(var y = 0; y < tbc_s; y++){

			this.ascii_tss[x][y] = null;

		}
	}

};



//including w and h here because not all sprite squares are going to be the same size. 
Area_Layer.prototype.add_square = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet){
// Area_Layer.prototype.add_square = function(x,y,type,which_sprite_array,name_of_sprite_sheet){

	//build instance
	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);
	//var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);


	//if it doesn't equal to null that means there's an array there already. 
	//so push the current square onto it.
	if(this.tss[x][y] != null){
		this.tss[x][y].push(tmp_ts);
	}
	else{
		//else, if that location IS null, set it as an array, and push
		//the terrain square onto it. 
		this.tss[x][y] = [];
		this.tss[x][y].push(tmp_ts);
	}

	

	this.add_to_ascii_tss(tmp_ts);	

};


//ba == boundary array 

Area_Layer.prototype.add_square_w_boundaries = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet,ba){
//Area_Layer.prototype.add_square_w_boundaries = function(x,y,type,which_sprite_array,name_of_sprite_sheet,ba){

	//temp terrain square
	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);

	//add boundaries to item 
	tmp_ts.add_boundaries(ba);

	//if it doesn't equal to null that means there's an array there already. 
	//so push the current square onto it. 
	if(this.tss[x][y] != null){
		this.tss[x][y].push(tmp_ts);
	}
	else{
		this.tss[x][y] = [];
		this.tss[x][y].push(tmp_ts);
	}

	this.add_to_ascii_tss(tmp_ts);



};

Area_Layer.prototype.add_to_ascii_tss = function(tmp_ts){

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

			if(this.ascii_tss[array_x][array_y] != non_replaceable_type){
				this.ascii_tss[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
			}

			
			//this.ascii_tss[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
		}
	}

	//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	//right now you are getting the tb drawing to work when the ts isn't at 0,0
	print_2d_array(this.ascii_tss);
};



//important note of need to dos: 
//--get terrain holder with area_builder working (yay! almost there!)
//--need a method for taking a character, and setting it's ascii double array
//as part of the map 

//d_array == double array 
//add temporary terrain blocks (will need to be able to revert back)
// Area_Layer.prototype.add_tmp_tbs = function(x,y,d_array){



// };

Area_Layer.prototype.contains_mouse = function(x,y){

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


Area_Layer.prototype.draw_ssi = function(){

	// this.tss[0][0].contains_mouse = true;
	// this.tss[0][0].draw_ssi();


	//to speed up the second if statement.
	var need_to_set_back_to_false = false;

	//temporary terrain square object
	var tmp_ts_obj = null;
	
	if(this.contains){
		// if(	this.tss[this.contains_x] != null && 
		// 	this.tss[this.contains_x][this.contains_y] != null){
		// 	this.tss[this.contains_x][this.contains_y].contains_mouse = true;
		// 	need_to_set_back_to_false = true;
		// }

		//the land graphic should always be the first thing pushed onto the stack. 
		// tmp_ts_obj = this.tss[this.contains_x][this.contains_y][0];
		// tmp_ts_obj.contains_mouse = true;
		// need_to_set_back_to_false = true;


		if(	this.tss[this.contains_x][this.contains_y] != null){
			//the land graphic should always be the first thing pushed onto the stack. 
			tmp_ts_obj = this.tss[this.contains_x][this.contains_y][0];
			tmp_ts_obj.contains_mouse = true;
			need_to_set_back_to_false = true;
		}

	}


	//console.log("------------------------------------");

	//console.log("")

	for(var x = 0; x < this.tss.length; x++){
		for(var y = 0; y < this.tss[x].length; y++){

			//if(this.tss[x] != null && this.tss[x][y] != null){
			if(this.tss[x][y] != null){

				var tmp_array = this.tss[x][y];

				for(var i = 0; i < tmp_array.length; i++){

					var tmp_ts = tmp_array[i];
					tmp_ts.draw_ssi();
					//tmp_ts.draw_containing_tb();

				}

				// tmp_ts = this.tss[x][y];
				// tmp_ts.draw_ssi();
				// tmp_ts.draw_containing_tb();
			}
			
		}
	}


	if(need_to_set_back_to_false){
		//this.tss[this.contains_x][this.contains_y].contains_mouse = false;	
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


Area_Layer.prototype.get_ascii_map = function(){

	return this.ascii_tss;
};


Area_Layer.prototype.get_worldWidth = function(){

	return (this.wos * this.tss.length);

};


Area_Layer.prototype.get_worldHeight = function(){

	return (this.hos * this.tss[0].length);

};

Area_Layer.prototype.get_tileHeight = function(){

	return this.tile_height;

};


Area_Layer.prototype.get_tileWidth = function(){

	return this.tile_Width;

};

Area_Layer.prototype.testing = function(){

	//this.tss[0][1]

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
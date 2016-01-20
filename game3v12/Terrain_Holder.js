

//var something_by_something = 20;
//var width_of_square = 20;
//var height_of_square = 20;


// function Terrain_Holder(width,height){

//wos == width of squares
//hos == height of squares
//nos == number of squares

/*
how to approach problem.

get the ascii version working. 

from that, the regular thing should
be working as well. 

*/

//(wos,hos,c_w,c_h);
//function Terrain_Holder(wos,hos,nos){
function Terrain_Holder(terrain_blocks_across,terrain_blocks_down){

	// console.log("canvas_width is: " + canvas_width);
	// console.log("canvas_height is: " + canvas_height);

	// this.wos = wos;
	// this.hos = hos;

	// //canvas width
	// this.c_w = this.wos * nos;
	// //canvas height
	// this.c_h = this.hos * nos;

	// this.nos = nos;

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

	//same as this.tss except it holds numbers in place of objects. 
	//is good for things like the path finding code. 
	this.ascii_tss = [];




	//this.ascii_tss is now 4x4. Each spot must be made 9x9. 
	/*
	we are going to be able to automatically say how many squares wide
	and long this thing is. 

	*/

	this.init_tss();

	this.init_ascii_tss();

	// console.log(this.b_size);
	// console.log(this.tss);

	//3)now there is a "null" in place for every single square. 

	var backup_ascii_tss = [];
	var backup_tss = [];

	this.default_type = 0;

};

Terrain_Holder.prototype.init_tss = function(){


	for(var x = 0; x < this.nos; x++){

		this.tss[x] = [];

		for(var y = 0; y < this.nos; y++){

			this.tss[x][y] = null;

		}
	}

	console.log("2 this.tss.length is: " + this.tss.length);

	console.log("2 this.tss[0].length is: " + this.tss[0].length);


};

// Terrain_Holder.prototype.add_to_ascii_tss = function(tmp_tb){

// 	//terrain block count width
//  	var tbc_w = nos * (tmp_tb.w/Terrain_Block.w);

// 	//terrain block count height
//  	var tbc_h = nos * (tmp_tb.w/Terrain_Block.w);


// };

/*my idea here is that I will take the entire canvas. color
it to blue or pink or something. then will set it to transparent (this
will help when it comes to additional layers. as well as debugging when
transparent or something isn't working). I will then set those various
locations (as I already do) with the add_square method */
Terrain_Holder.prototype.init_ascii_tss = function(){

	var canvas_width = c.width;

	var canvas_height = c.height;

	var canvas_size = (canvas_width >= canvas_height) ? canvas_width : canvas_height;

	//terrain block count size (the biggest of either height or width)
	//note: doing this 'size' thing rather than by width and height because of walking/shortest path
	//algorithm which requires both w and h have to be the same. 
 	var tbc_s = Math.ceil(canvas_size/Terrain_Block.w);


 	var tmp_array = [];

 	/*
	//build the columns for the array of ts
	for(var y = 0; y < tbc_s; y++){

		tmp_array[y] = null;

	}

	//fill it in so that all of those locations exist. 
	for(var x = 0; x < tbc_s; x++){

		this.ascii_tss[x] = tmp_array.splice(0);
	}
	*/

	for(var x = 0; x < tbc_s; x++){

		this.ascii_tss[x] = [];

		for(var y = 0; y < tbc_s; y++){

			this.ascii_tss[x][y] = null;

		}
	}

	//expecting both to be 100. 
	// console.log("this.ascii_tss.length is: " + this.ascii_tss.length);
	// console.log("this.ascii_tss[0].length is: " + this.ascii_tss[0].length);

};



//including w and h here because not all sprite squares are going to be the same size. 
Terrain_Holder.prototype.add_square = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet){
// Terrain_Holder.prototype.add_square = function(x,y,type,which_sprite_array,name_of_sprite_sheet){

	//build instance
	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);
	//var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

	//add it to the array. 
	// console.log("this.tss.length is: " + this.tss.length);
	// console.log("this.tss[2] is: " + this.tss[2]);
	// console.log("this.tss["+x+"] is: " + this.tss[x]);

	this.tss[x][y] = tmp_ts;

	this.add_to_ascii_tss(tmp_ts);

	//so there's like A location that holds an object (really another 2d array) that will
	//have the details on what section is a 1, a 0, etc. come to think of it...this might be
	//really good faster updates of the map (of whats a 1 and whats a 0) methinks 

	// //number of blocks wide 
	// var nobw = tmp_ts.w;
	// //number of blocks high
	// var nobh = tmp_ts.h;

	// console.log("tmp_ts.x is: " + tmp_ts.x);
	// console.log("tmp_ts.y is: " + tmp_ts.y);
	// console.log("tmp_ts.w is: " + tmp_ts.w);
	// console.log("tmp_ts.h is: " + tmp_ts.h);

	// console.log("tmp_ts.array_loc_x is: " + tmp_ts.array_loc_x);
	// console.log("tmp_ts.array_loc_x is: " + tmp_ts.array_loc_x);
	// console.log("tmp_ts.x_end_at is: " + tmp_ts.x_end_at);
	// console.log("tmp_ts.y_end_at is: " + tmp_ts.y_end_at);


	// console.log("this.ascii_tss is: ");
	// console.log(this.ascii_tss);

	// for(var x = tmp_ts.array_loc_x; x < tmp_ts.x_end_at; x++){

	// 	//console.log("---");

	// 	for(var y = tmp_ts.array_loc_x; y < tmp_ts.y_end_at; y++){

	// 		this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_block_type(x,y);
	// 		//this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_blocks();
	// 	}
	// }

	// for(var x = 0; x < tmp_ts.array_w; x++){

	// 	//console.log("---");

	// 	for(var y = 0; y < tmp_ts.array_h; y++){

	// 		this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_block_type(x,y);
	// 		//this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_blocks();
	// 	}
	// }


	

};


//ba == boundary array 

Terrain_Holder.prototype.add_square_w_boundaries = function(x,y,w,h,which_sprite_array,name_of_sprite_sheet,ba){
//Terrain_Holder.prototype.add_square_w_boundaries = function(x,y,type,which_sprite_array,name_of_sprite_sheet,ba){

	//temp terrain square
	var tmp_ts = new Terrain_Square(x,y,w,h,this.default_type,which_sprite_array,name_of_sprite_sheet);

	// console.log("ba is: ");
	// console.log(ba);

	tmp_ts.add_boundaries(ba);

	this.tss[x][y] = tmp_ts;

	//this.ascii_tss[x][y] = type;

	//this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_blocks();

	this.add_to_ascii_tss(tmp_ts);



};

Terrain_Holder.prototype.add_to_ascii_tss = function(tmp_ts){

//ascii_tss

	// console.log("tmp_ts.array_loc_x is: " + tmp_ts.array_loc_x);
	// console.log("tmp_ts.array_loc_y is: " + tmp_ts.array_loc_y);

	// console.log("this.ascii_tss[0].length is: " + this.ascii_tss[0].length);
	// print_2d_array(this.ascii_tss);

	for(var x = 0; x < tmp_ts.array_w; x++){

		for(var y = 0; y < tmp_ts.array_h; y++){

			//tmp_ts.array_loc_x is the starting x loc for the object in the array
			//x will iterate from something like 0 to 2
			var array_x = tmp_ts.array_loc_x + x;

			//same deal as with x and array_loc_x
			var array_y = tmp_ts.array_loc_y + y;

			this.ascii_tss[array_x][array_y] = tmp_ts.get_ascii_terrain_block_type(x,y);
			//this.ascii_tss[x][y] = tmp_ts.get_ascii_terrain_blocks();
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
Terrain_Holder.prototype.add_tmp_tbs = function(x,y,d_array){



};

Terrain_Holder.prototype.contains_mouse = function(x,y){

	// var tmpx = Math.floor(x/this.wos);
	// var tmpy = Math.floor(y/this.hos);
	// pw.print("|");
	// pw.print("|");
	// pw.print("|");
	// pw.print("|");
	// pw.print("|");
	// pw.print("|");
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

	// this.tss[0][0].contains_mouse = true;
	// this.tss[0][0].draw_ssi();


	//to speed up the second if statement.
	var need_to_set_back_to_false = false;

	
	if(this.contains){
		if(	this.tss[this.contains_x] != null && 
			this.tss[this.contains_x][this.contains_y] != null){
			this.tss[this.contains_x][this.contains_y].contains_mouse = true;
			need_to_set_back_to_false = true;
		}
	}


	//console.log("------------------------------------");

	//console.log("")
	for(var x = 0; x < this.tss.length; x++){
		for(var y = 0; y < this.tss[x].length; y++){

			if(this.tss[x] != null && this.tss[x][y] != null){

				// console.log("(see it) x is: " + x);
				// console.log("(see it) y is: " + y);

				tmp_ts = this.tss[x][y];
				tmp_ts.draw_ssi();
				tmp_ts.draw_containing_tb();
			}
			//else statement is for debugging only.
			// else{
			// 	console.log("(dont see it) x is: " + x);
			// 	console.log("(dont see it) y is: " + y);
			// }
			
		}
	}

	// //console.log("")
	// for(var x = 0; x < this.c_w; x++){
	// 	for(var y = 0; y < this.c_h; y++){

	// 		if(this.tss[x] != null && this.tss[x][y] != null){

	// 			console.log("(see it) x is: " + x);
	// 			console.log("(see it) y is: " + y);

	// 			tmp_ts = this.tss[x][y];
	// 			tmp_ts.draw_ssi();
	// 			tmp_ts.draw_containing_tb();
	// 		}
	// 		//else statement is for debugging only.
	// 		else{
	// 			console.log("(dont see it) x is: " + x);
	// 			console.log("(dont see it) y is: " + y);
	// 		}
			
	// 	}
	// }

	if(need_to_set_back_to_false){
		this.tss[this.contains_x][this.contains_y].contains_mouse = false;		
	}
	

};

// Terrain_Holder.prototype.print_2d_array = function(){

// 	var tmp_string = '\n' + "[" + '\n';

// 	// console.log("this.tss.length is: " + this.tss.length);
// 	// console.log("this.tss[0].length is: " + this.tss[0].length);
// 	// console.log("this.ascii_tss.length is: " + this.ascii_tss.length);
// 	// console.log("this.ascii_tss[0].length is: " + this.ascii_tss[0].length);

// 	for(var x = 0; x < this.nos; x++){


// 		tmp_string += "[";

// 		for(var y = 0; y < this.nos; y++){

// 			//check 1
// 			var c1 = (y == this.ascii_tss[x].length -1) ? "" : ",";

// 			var symbol = (this.ascii_tss[y][x] == null) ? 'n' : this.ascii_tss[y][x];

// 			tmp_string += symbol + c1;

// 			//tmp_string += this.ascii_tss[y][x] + c1;

// 		}

// 		//check 2
// 		var c2 = (x == this.ascii_tss.length -1) ? "]" : "],";

// 		tmp_string += c2 + '\n';
		
// 	}

// 	tmp_string += "];";

// 	console.log(tmp_string);


// };

Terrain_Holder.prototype.get_ascii_map = function(){

	return this.ascii_tss;
};


Terrain_Holder.prototype.get_worldWidth = function(){

	return (this.wos * this.tss.length);

};


Terrain_Holder.prototype.get_worldHeight = function(){

	return (this.hos * this.tss[0].length);

};

Terrain_Holder.prototype.get_tileHeight = function(){

	return this.tile_height;

};


Terrain_Holder.prototype.get_tileWidth = function(){

	return this.tile_Width;

};

Terrain_Holder.prototype.testing = function(){

	//this.tss[0][1]

};

//I dont even know. 
// Terrain_Holder.prototype.add_boundaries_to_square = function(array_loc_x,
// 															array_loc_y){

// };




//ba == boundary array. 
//an example of ba:
/*

need to select which square, so need an x and y 

you have then selected a square like this. 

[0,0,0]
[0,0,0]
[0,0,0]

need to provide the type (because there might be
more than 1 and 0 in the future.)


wsX --which square x
wsY 
wbX --which block x
wbY

type (first element, defines what these blocks will be)

ba looks like this: 
[
type,
[wsX1,wsY1],[wbX1,wbY1],
[wsX2,wsY2],[wbX2,wbY2],
[wsX3,wsY3],[wbX3,wbY3],
]

(or, to use numbers) ba looks like this: 
[
1,
[0,0],[2,0],
[0,0],[2,1],
[0,0],[2,2],
]

(note, this would )

you then set ba as a parameter to add_boundaries.

and then the area looks like this: 

[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,1,1,0],
]

*/

/*
//for adding boundaries to a ts. see above for how to use it. 
Terrain_Square.prototype.add_boundaries_to_square = function(ba){

	for(var i = 0; i < ba.length; i++){

		var loc = ba[i];

		var tmp_x = loc[0];
		var tmp_y = loc[1];

		// console.log("tmp_x is: " + tmp_x);
		// console.log("tmp_y is: " + tmp_y);
		// console.log("this.tba["+tmp_x+"] is: ");
		// console.log(this.tba[tmp_x]);
		// console.log("this.tba["+tmp_x+"]["+tmp_y+"] is: ");
		// console.log(this.tba[tmp_x][tmp_y]);

		this.tba[tmp_x][tmp_y].block_type = 1;

	}
};

Terrain_Square.prototype.print_2d_array = function(){

	console.log("this.ascii_tss.length is: " + this.ascii_tss.length);

	console.log("this.ascii_tss[0].length is: " + this.ascii_tss[0].length);

	var tmp_string = '\n' + "[" + '\n';

	for(var x = 0; x < this.ascii_tss.length; x++){

		tmp_string += "[";

		for(var y = 0; y < this.ascii_tss[x].length; y++){

			//check 1
			var c1 = (y == this.ascii_tss[x].length -1) ? "" : ",";

			var symbol = (this.ascii_tss[y][x] == null) ? 'n' : this.ascii_tss[y][x];

			//tmp_string += world[y][x] + c1;

			tmp_string += symbol + c1;

		}

		//check 2
		var c2 = (x == this.ascii_tss.length -1) ? "]" : "],";

		tmp_string += c2 + '\n';
		
	}

	tmp_string += "];";

	console.log(tmp_string);

};
*/


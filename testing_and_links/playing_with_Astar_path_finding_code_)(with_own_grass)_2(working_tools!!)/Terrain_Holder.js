

//var something_by_something = 20;
//var width_of_square = 20;
//var height_of_square = 20;


// function Terrain_Holder(width,height){

//wos == width of squares
//hos == height of squares
//nos == number of squares
function Terrain_Holder(wos,hos,nos,name_of_sprite_sheet){

	this.wos = wos;
	this.hos = hos;

	this.tile_width = -1;

	this.tile_height = -1;

	//canvas width
	this.c_w = wos * nos;
	//canvas height
	this.c_h = hos * nos;

	this.contains = false;
	this.contains_x = null;
	this.contains_y = null;

	//terrain squares
	this.tss = [];

	this.nos = nos;

	//dont need to save it 
	//var size = (this.c_w >= this.c_h) ? this.c_w : this.c_h;

	// var tmp_array = [];

	/*
	////1)build up the temp array of the proper length (say, it'll be the width row)
	for(var i = 0; i < nos; i++){
		tmp_array[i] = null;
	}

	//2)and then put it in for every column (height)
	for(var i = 0; i < nos; i++){
		this.tss[i] = tmp_array;
	}
	*/

	for(var x = 0; x < nos; x++){

		var tmp_array = [];
		for(var y = 0; y < nos; y++){
			tmp_array[y] = null;
		}
		this.tss[x] = tmp_array;
	}

	//3)now there is a "null" in place for every single square. 

};



Terrain_Holder.prototype.add_square = function(x,y,type,which_sprite_array,name_of_sprite_sheet){

	//could have used either one
	if(this.tile_width == null){
		this.tile_width = which_sprite_array[2];
		this.tile_height = which_sprite_array[3];
	}

	//var name_of_sprite_sheet = "ground_and_mark_path_images_set_1";

	//console.log("getting into this place???");

	//var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,0,name_of_sprite_sheet);

	//console.log("2which_sprite_array is: " + which_sprite_array);
	// console.log("this.wos is: " + this.wos);
	// console.log("this.hos is: " + this.hos);

	//console.log("entering here");
	var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

	// console.log("x is: " + x);
	// console.log("y is: " + y);
	// console.log("tmp_ts.x is: " + tmp_ts.x);
	// console.log("tmp_ts.y is: " + tmp_ts.y);

	this.tss[x][y] = tmp_ts;

	//console.log("this.tss["+x+"]["+y+"] x and y is: " + [this.tss[x][y].x,this.tss[x][y].y]);

	// for(var x = 0; x < 20; x++){
	// 	for(var y = 0; y < 20; y++){

	// 	}
	// }

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
		this.contains_x = Math.floor(x/this.wos);
		this.contains_y = Math.floor(y/this.hos);
	}
	else{
		this.contains = false;
		this.contains_x = null;
		this.contains_y = null;
	}

};

Terrain_Holder.prototype.draw_ssi = function(){

	//this.tss[0][0].contains_mouse = true;

	// this.tss[0][0].draw_ssi();

	
	if(this.contains){
		this.tss[this.contains_x][this.contains_y].contains_mouse = true;
	}


	for(var x = 0; x < this.nos; x++){
		//console.log("this.tss[x].length is: " + this.tss[x].length);
		for(var y = 0; y < this.nos; y++){
			//console.log("x and y are : " + [x,y]);
			this.tss[x][y].draw_ssi();
		}
	}

	if(this.contains){
		this.tss[this.contains_x][this.contains_y].contains_mouse = false;
	}
	

};

Terrain_Holder.prototype.chosen_start_loc_is_okay = function(loc){

	return this.tss[loc[0]][loc[1]].type == 0;

};

Terrain_Holder.prototype.length = function(){

	return this.tss.length;

};


//grid of that represents the actual ground. zeros represent grass (walkable) and
//1 represents a rock (not walkable).
Terrain_Holder.prototype.get_grid_of_integers = function(){

	var temp_2d_array = [];


	for(var x = 0; x < this.nos; x++){
		var tmp_array = [];
		for(var y = 0; y < this.nos; y++){
			tmp_array[y] = this.tss[x][y].type;
		}
		temp_2d_array[x] = tmp_array;
	}

	//this.print_2d_array2(temp_2d_array);

	// var tmp_array_thing = [[1,2],[3,4]];
	// this.print_2d_array(tmp_array_thing);
	

	return temp_2d_array;

};

//start = 12,14
//end = 24,14
// [
// [1,2],
// [3,4]
// ]

Terrain_Holder.prototype.print_2d_array = function(array){

	var tmp_x = 5;
	var tmp_y = 9;

	console.log("array.length is: " + array.length);
	console.log("array[0].length is: " + array[0].length);
	console.log("array["+tmp_x+"]["+tmp_y+"] is: " + array[tmp_x][tmp_y]);

	console.log("start array[6][6] is: " + array[6][6]);
	console.log("end array[12][6] is: " + array[12][6]);


	//console.log("[");

	// for(var x = 0; x < array.length; x++){
	// 	var tmp_string = "[";
	// 	for(var y = 0; y < array[x].length; y++){
	// 		tmp_string += array[x][y] + ",";
	// 	}
	// 	tmp_string += "],";
	// 	console.log(tmp_string);
	// }

	//console.log("]");

	var tmp_string = "";

	for(var x = 0; x < array.length; x++){
		//console.log(array[x]);

		for(var i = 0; i < array[x].length; i++){
			if(array[x][i] == 1){
				console.log("1 loc is: ["+x+","+i+"]");
			}
		}

		tmp_string += array[x] + '\n';
	}


	console.log(tmp_string);

};

Terrain_Holder.prototype.print_2d_array2 = function(array){

	var tmp_string = "[" + '\n';

	for(var x = 0; x < array.length; x++){

		tmp_string += "[";

		for(var y = 0; y < array[x].length; y++){

			//comma check
			var cc = (y == array[x].length -1) ? "" : ",";

			tmp_string += array[x][y] + cc;
		}
		tmp_string += "]" + '\n';
		
	}

	tmp_string += "]"


	console.log(tmp_string);

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
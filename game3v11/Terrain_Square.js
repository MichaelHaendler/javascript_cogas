
//stuff for drawing squares:
//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_rect2

//info about transparency: 
//http://www.w3schools.com/tags/canvas_globalalpha.asp

// (x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

//more colored square stuff
//http://www.w3schools.com/tags/canvas_rect.asp

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

	//this represents where this ts is in the array 
	this.array_loc_x = x;
	this.array_loc_y = y;

	//this represents the number of terrain blocks wide this terrain square is. 
	this.array_w = Math.round(w/this.tb_w);
	this.array_h = Math.round(h/this.tb_h);

	//this represents where this terrain square REALLy goes on the canvas
	this.x = x * this.w;
	this.y = y * this.h; 

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

	//terrain block array. Holds what parts of the items can be walked over/behind (0)
	//and what parts can't (1)
	this.tba = [];
	this.ascii_tba = [];


	// var tmp_row = [];

	// //fill the row with a walkable area 
	// for(var i = 0; i < this.w; i++){
	// 	tmp_row[i] = 0;
	// }

	// //for each of the columns, put in a row of a walkable area. 
	// //note: this is just a default value. any area where you want
	// //the item not to be stepped on needs to be set manually.
	// for(var i = 0; i < this.h; i++){
	// 	this.tba[i] = tmp_row.splice(0);
	// }

	//////////////////

	// console.log("this.tb_c_w is: " + this.tb_c_w);
	// console.log("this.tb_c_w is: " + this.tb_c_w);

	for(var x = 0; x < this.tb_c_w; x++){

		this.ascii_tba[x] = [];
		this.tba[x] = [];
		for(var y = 0; y < this.tb_c_h; y++){

			var tb_loc_x = x * this.tb_w;
			var tb_loc_y = y * this.tb_h;

			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,type);
			this.ascii_tba[x][y] = type;
		}

	}

	// console.log("this.w is: " + this.w);

	// //testing
	// this.tba[0] = [];
	// this.tba[1] = [];
	// this.tba[2] = [];
	// var tmp_x = 0;
	// var tmp_y = 0;
	// var tmp_type = 0;
	// this.tba[0][0] = new Terrain_Block(tmp_x,tmp_y,tmp_type);
	// this.tba[1][0] = new Terrain_Block(10,0,tmp_type);
	// this.tba[2][0] = new Terrain_Block(20,0,tmp_type);


};


Terrain_Square.prototype.draw_ssi = function(){

	//for testing only
	// this.contains_mouse_check();

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



	// if(this.contains_mouse){

	// 	var tmp_ts = this.get_containing_tb();

	// 	if(tmp_ts != null){
	// 		pw.print("seeing it");
	// 		tmp_ts.draw_ssi();
	// 	}{
	// 		pw.print("not seeing it");
	// 	}

	// }

};

Terrain_Square.prototype.draw_containing_tb = function(){

	this.contains_mouse_check()

	if(this.contains_mouse){

		var tmp_tb = this.get_containing_tb();

		if(tmp_tb != null){
			pw.print("seeing it");
			tmp_tb.draw_ssi();
		}
		else{
			pw.print("not seeing it");
		}

	}


};

Terrain_Square.prototype.get_containing_tb = function(){

	var loc_x = Math.floor(mx / this.tb_w) ;
	var loc_y = Math.floor(my / this.tb_h) ;

	pw.print("this.ts_w is: " + this.tb_w);
	pw.print("this.ts_h is: " + this.tb_h);

	pw.print("loc_x is: " + loc_x);
	pw.print("loc_y is: " + loc_y);

	if(this.tba[loc_x] != null && this.tba[loc_x][loc_y] != null){
		return this.tba[loc_x][loc_y];
	}
	else{
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
Terrain_Square.prototype.add_boundaries = function(ba){

	for(var i = 0; i < ba.length; i++){

		var loc = ba[i];

		var tmp_x = loc[0];
		var tmp_y = loc[1];

		// console.log("tmp_x is: " + tmp_x);
		// console.log("tmp_y is: " + tmp_y);
		//console.log("")
		// console.log("this.tba["+tmp_x+"] is: ");
		// console.log(this.tba[tmp_x]);
		// console.log("this.tba["+tmp_x+"]["+tmp_y+"] is: ");
		// console.log(this.tba[tmp_x][tmp_y]);

		// console.log("this.tba["+tmp_x+"]["+tmp_y+"] is: " + this.tba[tmp_x][tmp_y]);
		// console.log("this.tba["+tmp_x+"]["+tmp_y+"].type is: " + this.tba[tmp_x][tmp_y].type);

		//this.tba[tmp_x][tmp_y].type = 1;

		this.tba[tmp_x][tmp_y].set_block_type(1);

		this.ascii_tba[tmp_x][tmp_y] = 1;

		//console.log("this.tba["+tmp_x+"]["+tmp_y+"].type NOW is: " + this.tba[tmp_x][tmp_y].type);

	}
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
Terrain_Square.prototype.get_ascii_terrain_block_type = function(x,y){

	// ex:
	// this.x == 30
	// x == 30
	// array_x == 0 (works)
	// this.x == 30
	// x == 31
	// array_x == 1 (works)

	/*
	console.log("---");
	console.log("this.y is: " + this.y);
	console.log("y is: " + y);

	var array_x = x - this.x;
	var array_y = y - this.y;

	console.log("array_x is: " + array_x);
	console.log("array_y is: " + array_y);

	console.log()

	console.log("this.ascii_tba[array_x][array_y] is: " + this.ascii_tba[array_x][array_y]);

	// console.log("this.ascii_tba[array_x][array_y].type is: " + this.ascii_tba[array_x][array_y].type);

	// return this.ascii_tba[array_x][array_y].type;

	//console.log("this.ascii_tba[array_x][array_y].type is: " + this.ascii_tba[array_x][array_y]);

	return this.ascii_tba[array_x][array_y];
	*/
	// console.log("----");
	// console.log("x is: " + x);
	// console.log("y is: " + y);
	// console.log("this.ascii_tba.length is: " + this.ascii_tba.length);
	// console.log("this.ascii_tba[x].length is: " + this.ascii_tba[x].length);
	// console.log("this.ascii_tba[x][y] is: " + this.ascii_tba[x][y]);
	return this.ascii_tba[x][y];
};



// Terrain_Square.prototype.print_2d_array = function(){

// 	console.log("loc is: "+this.x+","+this.y);

// 	// console.log("this.ascii_tba.length is: " + this.ascii_tba.length);

// 	// console.log("this.ascii_tba[0].length is: " + this.ascii_tba[0].length);

// 	var tmp_string = '\n' + "[" + '\n';

// 	for(var x = 0; x < this.ascii_tba.length; x++){

// 		tmp_string += "[";

// 		for(var y = 0; y < this.ascii_tba[x].length; y++){

// 			//check 1
// 			var c1 = (y == this.ascii_tba[x].length -1) ? "" : ",";

// 			var symbol = (this.ascii_tba[y][x] == null) ? 'n' : this.ascii_tba[y][x];

// 			//tmp_string += world[y][x] + c1;

// 			tmp_string += symbol + c1;

// 		}

// 		//check 2
// 		var c2 = (x == this.ascii_tba.length -1) ? "]" : "],";

// 		tmp_string += c2 + '\n';
		
// 	}

// 	tmp_string += "];";

// 	console.log(tmp_string);

// };






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

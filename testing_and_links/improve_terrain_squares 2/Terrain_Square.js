

function Terrain_Square(x,y,w,l,h,which_sprite_array,name_of_sprite_sheet,ba,which_layer){



	//layer of this terrain square (rename terrain cube? or
	//terrain obj, since it's not always a cube?) that we are currently
	//looking at.
	this.curr_layer = 0;

	//curr_layer looks at the layers of the object. base_layer situates
	//the terr sq someplace. 
	//will be useful for when an object is on something like layer 1 or up. 
	this.base_layer = which_layer;

	this.ba = ba;

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
	this.y = y * Terrain_Block.l; 
	this.default_type = Terrain_Block.can_walk; //can it be walked on.

	//note: each terrain block is 10 by 10. in order to make sure that no terrain_square
	//is either too big or too small to be properly filled with terrain_blocks, we are
	//doing this rounding. 

	//this is the ACTUAL width of the ts 
	
	this.h = Math.round(h/this.tb_h) * this.tb_h;
	this.w = Math.round(w/this.tb_w) * this.tb_w;
	this.l = Math.round(l/this.tb_l) * this.tb_l;


	//this is the ACTUAL width of the ts 
	// this.w = w * this.tb_w;
	// this.l = h * this.tb_l;	

	//this represents where this ts is in the array 
	this.array_loc_x = x;
	this.array_loc_y = y;

	//array_w represents the number of terrain blocks wide this terrain square is. 
	this.array_h = Math.round(h/this.tb_h);
	this.array_w = Math.round(w/this.tb_w);
	this.array_l = Math.round(l/this.tb_l);

	// console.log("h is: " + h);
	// console.log("(3) this.array_h is: " + this.array_h);
	// console.log("(3) this.array_w is: " + this.array_w);
	// console.log("(1) this.array_l is: " + this.array_l);

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

	//did this because of difference between rock and grass. grass has a length
	//of 30 but a height of 0. rock has a length of 10 but a height of 30. couldn't
	//use length due to rock having a small length, and couldn't use height because
	//grass has a height of zero.
	var graphic_w = Math.round(which_sprite_array[2]/this.tb_w) * this.tb_w;
	var graphic_h = Math.round(which_sprite_array[3]/this.tb_l) * this.tb_l;

	this.ssi.set_x_y_w_h_dw_and_dh(which_sprite_array[0],
								   which_sprite_array[1],
								   which_sprite_array[2],
								   which_sprite_array[3],
								   graphic_w,
								   graphic_h
								   );


	//initiates the z array
	this.tba = [];

	//terrain block array. Holds what parts of the items can be walked over/behind (0)
	//and what parts can't (1)
	this.ascii_tba = [];

	//this.set_arrays1();

	//console.log("============================================");

	// console.log(ba);
	// console.log(ba[2].start_loc);

	this.set_tb_design(x,y,ba);

	//--here
	//print_3d_array(this.ascii_tba);

	//console.log("===============");
	// console.log(this.ascii_tba[0][0]);
	//console.log("this.ascii_tba[0][0] is: " + this.ascii_tba[0][0]);
	//print_2d_array(this.ascii_tba[0]);

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
	//this.ba = [];



};


Terrain_Square.prototype.set_curr_layer = function(curr_layer){

	this.curr_layer = curr_layer;

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

			// console.log("x is: " + x);
			// console.log("y is: " + y);
			// console.log("tb_loc_x is: " + tb_loc_x);
			// console.log("tb_loc_y is: " + tb_loc_y);


			this.tba[x][y] = new Terrain_Block(tb_loc_x,tb_loc_y,this.default_type);
			this.ascii_tba[x][y] = this.default_type;
		}

	}

};

/*
what do I want? 

I want all 3 rows to be in their proper locations (I think done)

the first layer to the rocks is on the ground. so the bottom row
should light up red when hovered over.

the grass tbs should light up as blue when hovered over

the upper 2 parts of the rock should light up as blue since it is grass. 

*/

//not in use at the moment. 
Terrain_Square.prototype.set_tb_design = function(start_at_x,start_at_y,ba){

	//console.log("ba.start_loc is: " + ba.start_loc);

	// console.log("ba is: ");
	// console.log(ba[0]);

	// console.log("ba.d_array is: " + ba[0].d_array);

	if(ba[0].d_array == true){
		//console.log("2d");
		this.set_tb_design_2d(start_at_x,start_at_y,ba);
	}
	else{
		//console.log("1d");
		this.set_tb_design_1d(start_at_x,start_at_y,ba);
	}

};

//set terrain block design 1 dimensional (array). for when you only have a single
//row
// Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){


// 	//array location y of tb (always the same because the y 
// 	//value is stationary here)
// 	var alx = start_at_x;

// 	//terrain block location y (y location of a particular tb)
// 	var tb_loc_x = start_at_x * this.tb_w;

// 	//go through the tmp objects
// 	for(var tmp_obj of ba){

// 		//get z layer 
// 		var z = tmp_obj.layer;

// 		//initiate x layers
// 		this.tba[z] = [];
// 		this.ascii_tba[z] = [];


// 		//initiate y layers
// 		this.ascii_tba[z][alx] = [];
// 		this.tba[z][alx] = [];

// 		//get layer
// 		var ts_layer = tmp_obj.ts_layer;


		
// 		//iterate through 1d array.
// 		for(var y = 0; y < ts_layer.length; y++){

// 			//terrain block location x (x location of a particular tb)
// 			var tb_loc_y = (start_at_y + y) * this.tb_l;

// 			//array location x
// 			var aly = (start_at_y + y);

// 			// //initiate y layers
// 			// this.ascii_tba[z][alx] = [];
// 			// this.tba[z][alx] = [];

// 			//type value. 1, 0, etc. 
// 			var type_val = ts_layer[y];

// 			console.log("z is: " + z);
// 			console.log("alx is: " + alx);
// 			console.log("aly is: " + aly);
// 			console.log("val: " + type_val);
// 			console.log("---");

// 			this.tba[z][alx][aly] = new Terrain_Block(tb_loc_x,tb_loc_y,type_val);
// 			this.ascii_tba[z][alx][aly] = type_val;

// 			// console.log("this.ascii_tba["+z+"]["+alx+"]["+aly+"] is: " + this.ascii_tba[z][alx][aly]);
// 			//console.log("this.ascii_tba["+z+"]["+alx+"] is: " + this.ascii_tba[z][alx]);

// 		}

// 		//console.log("==============");

// 	}
// 	//debugger
	
// 	// console.log("111this.ascii_tba[0][0] is: " + this.ascii_tba[0][0]);
// 	// console.log("111this.ascii_tba[2][0] is: " + this.ascii_tba[2][0]);
// 	// console.log("this.ascii_tba[2][0] is: " + this.ascii_tba[2][0][1]);
// 	// console.log("this.ascii_tba[2][0] is: " + this.ascii_tba[2][0][2]);

// 	//print_3d_array(this.ascii_tba);
// 	//console.log(this.ascii_tba);
// 	//console.log("--------------");
// 	//console.log(this.ascii_tba[1]);
// 	//print_2d_array(this.ascii_tba[0]);

// };

//a rock needs to be 1 tb thick (length...and thats y). width is 3 tb's (x). height is 3 tb's (z). 
Terrain_Square.prototype.init_3d_array = function(){

	for(var z = 0; z < this.array_h; z++){

		for(var x = 0; x < this.array_w; x++){

			for(var y = 0; y < this.array_l; y++){

				this.this.tba[z][x][y] = null;
			}
		}
	}

}



//helper method...nothing more
// Terrain_Square.prototype.get_ba_max_layer_height = function(ba){

// 	var max = -1;

// 	for(var tmp_obj of ba){

// 		if(tmp_obj.layer > max){
// 			max = tmp_obj.layer;
// 		}

// 	}

// 	return max;

// };


//0,0,2
//0,1,2
//0,2,2
// [
// [n,n,n],
// [n,n,n],
// [1,1,1]
// ]

//1,0,2
//1,1,2
//1,2,2

//2,0,2
//2,1,2
//2,2,2

Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){


	//number of layers being made 
	var layer_count = ba.length;

	// var alx = start_at_x + start_loc_x;


		// //make y dimension
		// this.tba[z][alx] = [];

		// //make y dimension
		// this.ascii_tba[z][alx] = [];


	//go through the tmp objects of ba (doing 1 layer at a time)
	//*Z* layer
	for(var tmp_obj of ba){

		//this represents how many blocks across on the graphic the
		//boundaries start (in this case 2)
		var start_loc_x = tmp_obj.start_loc[0];

		//this represents how many blocks down on the graphic the
		//boundaries start (in this case 2)
		var start_loc_y = tmp_obj.start_loc[1];	

		//which layer this is
		var z = tmp_obj.layer;	

		//make x dimension
		this.tba[z] = [];
		this.ascii_tba[z] = [];
	

		//the bottom of this tb. or the top of the one directly below.  
		var tb_loc_z = z * this.tb_h;

		//so start_at_x might be 0 (because we're starting at 0,0 for instance)
		//and then start_loc_x might be 2 (you move down 2) so you add them together,
		//and that's where the x array is for the dimension.

		//temporary terr box array. is array for temporarily building the row for
		//this.tba
		var tb_loc_x = (start_at_x + start_loc_x) * this.tb_w;

		//explained with tb_loc_x notes
		var tb_loc_y = (start_at_y + start_loc_y) * this.tb_l;

		//get layer
		var ts_layer = tmp_obj.ts_layer;

		//for alx
		for(var x = 0; x < ts_layer.length; x++){

			//locations in array 
			var alx = start_at_x + start_loc_x + x;
			var aly = start_at_y + start_loc_y; 

			//make y dimension
			// console.log(this.tba[0]);
			// console.log("!!z is: " + z);
			// console.log("!!x is: " + alx);
			this.tba[z][alx] = [];
			this.ascii_tba[z][alx] = [];

			//build tb's and insert into array 
			//for(var l = 0; l < ts_layer.length; l++){

				var tb_loc_x = (start_at_x + start_loc_x + x) * this.tb_w;

				var type_val = ts_layer[x];

				var tb = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);

				this.tba[z][alx][aly] = tb;
				this.ascii_tba[z][alx][aly] = type_val;

				// console.log("tb_loc_z is: " + tb_loc_z);
				// console.log("tb_loc_x is: " + tb_loc_x);
				// console.log("tb_loc_y is: " + tb_loc_y);
				// console.log("z is: " + z);
				// console.log("alx is: " + alx);
				// console.log("aly is: " + aly);
				// console.log("this.tba["+z+"]["+alx+"]["+aly+"] is: ");
				// console.log(this.tba[z][alx][aly]);
				// console.log("----");
				// console.log("2 is: ");
				// console.log(this.tba[0][0]);
				// console.log(this.tba[0][0][2]);

			//}

			// this.tba[z][alx] = temp_tba;
			// this.ascii_tba[z][alx] = ts_layer;



		}

		//console.log("=====");

		//make the second dimension (x) in tba and ascii_tba
		//and insert the values. 




		// console.log(this.tba[z]);
		// console.log(this.tba[z][alx]);

		//a dirty but simple solution. no idea if it's really the right thing
		//to be doing. 
		//alx++;

	}//end of for each loop

	this.adj_gen_area_loc(ba);

	//debugger;

	//console.log("POW WOW!!!!");



	// console.log("this.tba[0] is: ");
	// console.log(this.tba[0]);
	// console.log("-------");
	// console.log("this.tba[0][0] is: ");
	// console.log(this.tba[0][0]);
	// console.log("-------");
	// console.log("this.tba[0][0][2] is: ");
	// console.log(this.tba[0][0][2]);
	// console.log("-------");
	// console.log("this.tba[0][1][2] is: ");
	// console.log(this.tba[0][1][2]);
	// console.log("-------");
	// console.log("this.tba[0][2][2] is: ");
	// console.log(this.tba[0][2][2]);
	// console.log("-------");

	//print_3d_array(this.ascii_tba);//---------------------

	// console.log("this.ascii_tba[0] is: ");
	// console.log(this.ascii_tba[0]);

	// console.log("this.ascii_tba[0][0] is: ");
	// console.log(this.ascii_tba[0][0]);

	//debugger

};

/*
//WORKING!!!!!!!!!!!...kinda
Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){


	//number of layers being made 
	var layer_count = ba.length;

	// var alx = start_at_x + start_loc_x;


		// //make y dimension
		// this.tba[z][alx] = [];

		// //make y dimension
		// this.ascii_tba[z][alx] = [];


	//go through the tmp objects of ba (doing 1 layer at a time)
	//*Z* layer
	for(var tmp_obj of ba){

		//this represents how many blocks across on the graphic the
		//boundaries start (in this case 2)
		var start_loc_x = tmp_obj.start_loc[0];

		//this represents how many blocks down on the graphic the
		//boundaries start (in this case 2)
		var start_loc_y = tmp_obj.start_loc[1];	

		//which layer this is
		var z = tmp_obj.layer;	

		//make x dimension
		this.tba[z] = [];
		this.ascii_tba[z] = [];
	

		//the bottom of this tb. or the top of the one directly below.  
		var tb_loc_z = z * this.tb_h;

		//so start_at_x might be 0 (because we're starting at 0,0 for instance)
		//and then start_loc_x might be 2 (you move down 2) so you add them together,
		//and that's where the x array is for the dimension.

		//temporary terr box array. is array for temporarily building the row for
		//this.tba
		var tb_loc_x = (start_at_x + start_loc_x) * this.tb_w;

		//explained with tb_loc_x notes
		var tb_loc_y = (start_at_y + start_loc_y) * this.tb_l;

		//get layer
		var ts_layer = tmp_obj.ts_layer;

		//for alx
		for(var x = 0; x < ts_layer.length; x++){

			//locations in array 
			var alx = start_at_x + start_loc_x + x;
			var aly = start_at_y + start_loc_y; 

			//make y dimension
			// console.log(this.tba[0]);
			// console.log("!!z is: " + z);
			// console.log("!!x is: " + alx);
			this.tba[z][alx] = [];
			this.ascii_tba[z][alx] = [];

			//build tb's and insert into array 
			//for(var l = 0; l < ts_layer.length; l++){

				var tb_loc_x = (start_at_x + start_loc_x + x) * this.tb_w;

				var type_val = ts_layer[x];

				var tb = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);

				this.tba[z][alx][aly] = tb;
				this.ascii_tba[z][alx][aly] = type_val;

				// console.log("tb_loc_z is: " + tb_loc_z);
				// console.log("tb_loc_x is: " + tb_loc_x);
				// console.log("tb_loc_y is: " + tb_loc_y);
				// console.log("z is: " + z);
				// console.log("alx is: " + alx);
				// console.log("aly is: " + aly);
				// console.log("this.tba["+z+"]["+alx+"]["+aly+"] is: ");
				// console.log(this.tba[z][alx][aly]);
				// console.log("----");
				// console.log("2 is: ");
				// console.log(this.tba[0][0]);
				// console.log(this.tba[0][0][2]);

			//}

			// this.tba[z][alx] = temp_tba;
			// this.ascii_tba[z][alx] = ts_layer;



		}

		//console.log("=====");

		//make the second dimension (x) in tba and ascii_tba
		//and insert the values. 




		// console.log(this.tba[z]);
		// console.log(this.tba[z][alx]);

		//a dirty but simple solution. no idea if it's really the right thing
		//to be doing. 
		//alx++;

	}//end of for each loop

	this.adj_gen_area_loc(ba);

	//debugger;

	//console.log("POW WOW!!!!");



	// console.log("this.tba[0] is: ");
	// console.log(this.tba[0]);
	// console.log("-------");
	// console.log("this.tba[0][0] is: ");
	// console.log(this.tba[0][0]);
	// console.log("-------");
	// console.log("this.tba[0][0][2] is: ");
	// console.log(this.tba[0][0][2]);
	// console.log("-------");
	// console.log("this.tba[0][1][2] is: ");
	// console.log(this.tba[0][1][2]);
	// console.log("-------");
	// console.log("this.tba[0][2][2] is: ");
	// console.log(this.tba[0][2][2]);
	// console.log("-------");

	//print_3d_array(this.ascii_tba);//---------------------

	// console.log("this.ascii_tba[0] is: ");
	// console.log(this.ascii_tba[0]);

	// console.log("this.ascii_tba[0][0] is: ");
	// console.log(this.ascii_tba[0][0]);

	//debugger

};
*/

/*
Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){


	//number of layers being made 
	var layer_count = ba.length;

	var alx = null;


		// //make y dimension
		// this.tba[z][alx] = [];

		// //make y dimension
		// this.ascii_tba[z][alx] = [];


	//go through the tmp objects of ba (doing 1 layer at a time)
	for(var tmp_obj of ba){

		//this represents how many blocks across on the graphic the
		//boundaries start (in this case 2)
		var start_loc_x = tmp_obj.start_loc[0];

		if(alx == null){
			alx = start_at_x + start_loc_x;
		}

		//this represents how many blocks down on the graphic the
		//boundaries start (in this case 2)
		var start_loc_y = tmp_obj.start_loc[1];	

		//which layer this is
		var z = tmp_obj.layer;	

		//make x dimension for tba
		if(this.tba[z] == null){
			//console.log("1 getting into here?");
				this.tba[z] = [];
		}
		// else{
		// 	console.log("1 nope");
		// }

		//make x dimension for ascii tba
		if(this.ascii_tba[z] == null){
			//console.log("2 getting into here?");
				this.ascii_tba[z] = [];
		}		
		// else{
		// 	console.log("2 nope");
		// }
		//the bottom of this tb. or the top of the one directly below.  
		var tb_loc_z = z * this.tb_h;

		//so start_at_x might be 0 (because we're starting at 0,0 for instance)
		//and then start_loc_x might be 2 (you move down 2) so you add them together,
		//and that's where the x array is for the dimension.
		

		//temporary terr box array. is array for temporarily building the row for
		//this.tba
		var temp_tba = [];

		//explained with tb_loc_x notes
		var tb_loc_y = (start_at_y + start_loc_y) * this.tb_l;

		//get layer
		var ts_layer = tmp_obj.ts_layer;

		//build the row of tb's. 
		for(var x = 0; x < ts_layer.length; x++){

			//need to recalculate tb_loc_x and tb_loc_y


			//start_at_x: the number of tb's over (relative to the ts) this thing is. 
			//start_loc_x: how much further over (relative to the ts) this thing is.
			//x is which in the array we're at right now. without it, we're at the zero
			//spot
			var tb_loc_x = (start_at_x + start_loc_x + x) * this.tb_w;

			var type_val = ts_layer[x];

			// console.log("tb_loc_z is: " + tb_loc_z);
			// console.log("tb_loc_x is: " + tb_loc_x);
			// console.log("tb_loc_y is: " + tb_loc_y);
			// console.log("------");


			var tb = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);

			temp_tba.push(tb);

		}

		//console.log("=====");

		//make the second dimension (x) in tba and ascii_tba
		//and insert the values. 

		this.tba[z][alx] = temp_tba;
		this.ascii_tba[z][alx] = ts_layer;
		console.log("z is: " + z);
		console.log("alx is: " + alx);

		// console.log(this.tba[z]);
		// console.log(this.tba[z][alx]);

		//a dirty but simple solution. no idea if it's really the right thing
		//to be doing. 
		alx++;

	}//end of for each loop

	this.adj_gen_area_loc(ba);

	//debugger

	// console.log("this.tba[0] is: ");
	// console.log(this.tba[0]);
	// console.log("-------");
	// console.log("this.tba[0][0] is: ");
	// console.log(this.tba[0][0]);
	// console.log("-------");
	// console.log("this.tba[0][0][2] is: ");
	// console.log(this.tba[0][0][2]);
	// console.log("-------");
	// console.log("this.tba[0][1][2] is: ");
	// console.log(this.tba[0][1][2]);
	// console.log("-------");
	// console.log("this.tba[0][2][2] is: ");
	// console.log(this.tba[0][2][2]);
	// console.log("-------");

	//print_3d_array(this.ascii_tba);

};
*/

//var tb_loc_x = (start_at_x + x) * this.tb_w;

//the x for the tb where on the general canvas this is taking place
//var tb_loc_x = (start_at_x * this.tb_w) + (start_loc_x * this.tb_w);

//the y for the tb where on the general canvas this is taking place
// var tb_loc_y = (start_at_y * this.tb_l) + (start_loc_y * this.tb_l);

// Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){

// 	console.log("bonkers :-)");

// 	//go through the tmp objects of ba
// 	for(var tmp_obj of ba){


// 		//this represents how many blocks across on the graphic the
// 		//boundaries start (in this case 2)
// 		var start_loc_x = tmp_obj.start_loc[0];

// 		//this represents how many blocks down on the graphic the
// 		//boundaries start (in this case 2)
// 		var start_loc_y = tmp_obj.start_loc[1];

// 		//start at y is basically just the upper left hand corner y
// 		var tb_loc_y = (start_at_y * this.tb_l) + (start_loc_y * this.tb_l);

// 		// console.log("start_loc_y is")

// 		// console.log("num is: " + (start_loc_y + this.tb_l));

// 		var aly = start_at_y + start_loc_y;

// 		//get z layer 
// 		var z = tmp_obj.layer;

// 		var tb_loc_z = z * this.tb_h;

// 		//initiate x layers
// 		this.tba[z] = [];
// 		this.ascii_tba[z] = [];

// 		//get layer
// 		var ts_layer = tmp_obj.ts_layer;

// 		//console.log("ts_layer is: " + ts_layer);

// 		var temp_tba = [];

// 		//so start_at_x might be 0 (because we're starting at 0,0 for instance)
// 		//and then start_loc_x might be 2 (you move down 2) so you add them together,
// 		//and that's where the x array is for the dimension.
// 		var alx = start_at_x + start_loc_x;

// 		//build the row for that dimension 
// 		for(var x = 0; x < ts_layer.length; x++){

// 			var tb_loc_x = (start_at_x + x) * this.tb_w;

// 			var type_val = ts_layer[x];

// 			var tb = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);

// 			temp_tba.push(tb);

// 		}

// 		this.tba[z][alx] = temp_tba;

// 		this.ascii_tba[z][alx] = ts_layer;

// 		temp_tba = [];

// 		//alx = 0;

// 		console.log("alx is: " + alx);

// 		console.log("this.ascii_tba["+z+"]["+alx+"]["+aly+"] is: " + this.ascii_tba[z][alx][aly]);
// 		console.log("this.ascii_tba["+z+"]["+alx+"] is: [" + this.ascii_tba[z][alx] + "]");
// 		console.log(this.ascii_tba[z][alx]);
// 		console.log(this.tba[z][alx]);

// 		console.log("==============");

// 	}

// 	this.adj_gen_area_loc(ba);

// 	print_3d_array(this.ascii_tba);

// };


/*
Terrain_Square.prototype.set_tb_design_1d = function(start_at_x,start_at_y,ba){


	console.log("bonkers :-)");


	//array location y of tb (always the same because the y 
	//value is stationary here)
	//var aly = start_at_y + this.get_ba_max_layer_height(ba);

	//console.log("ba.start_loc is: " + ba.start_loc);

	// var aly = start_at_y + ba.start_loc[1];

	//terrain block location y (y location of a particular tb)
	//console.log("start_at_y is: " + start_at_y);

	// if(ba.length != 0){

	// 	var tb_loc_y = (start_at_y * this.tb_l) + ;
	// }
	

	//go through the tmp objects of ba
	for(var tmp_obj of ba){

		//this represents how many blocks down on the graphic the
		//boundaries start
		var start_loc_y = tmp_obj.start_loc[1];

		//start at y is basically just the upper left hand corner y
		var tb_loc_y = (start_at_y * this.tb_l) + (start_loc_y * this.tb_l);

		// console.log("start_loc_y is")

		// console.log("num is: " + (start_loc_y + this.tb_l));

		var aly = start_at_y + start_loc_y;

		//get z layer 
		var z = tmp_obj.layer;

		var tb_loc_z = z * this.tb_h;

		//initiate x layers
		this.tba[z] = [];
		this.ascii_tba[z] = [];

		//get layer
		var ts_layer = tmp_obj.ts_layer;

		//console.log("ts_layer is: " + ts_layer);


		//iterate through 1d array.
		for(var x = 0; x < ts_layer.length; x++){

			//terrain block location x (x location of a particular tb)
			var tb_loc_x = (start_at_x + x) * this.tb_w;

			var start_loc_x = tmp_obj.start_loc[0];

			//array location x
			var alx = (start_at_x + x) + start_loc_x;

			//initiate y layers
			this.ascii_tba[z][alx] = [];
			this.tba[z][alx] = [];

			// //initiate y layers
			// this.ascii_tba[z][alx] = [];
			// this.tba[z][alx] = [];

			//type value. 1, 0, etc. 
			var type_val = ts_layer[y];

			console.log("z is: " + z);
			console.log("alx is: " + alx);
			console.log("aly is: " + aly);
			console.log("val: " + type_val);
			console.log("---");

			// console.log("z is: " + z);
			// console.log("tb_loc_x is: " + tb_loc_x);
			// console.log("tb_loc_y is: " + tb_loc_y);
			// console.log("val: " + type_val);
			// console.log("---");


			this.tba[z][alx][aly] = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);
			this.ascii_tba[z][alx][aly] = type_val;
			//this.ascii_tba[z][aly][alx] = type_val;

			console.log("this.ascii_tba["+z+"]["+alx+"]["+aly+"] is: " + this.ascii_tba[z][alx][aly]);
			console.log("this.ascii_tba["+z+"]["+alx+"] is: [" + this.ascii_tba[z][alx] + "]");

		}

		console.log("==============");

	}

	// if(ba.length != 0){

	// 	//taking one of its layers at random
	// 	//get 0 of [0,2] and multi by 10 (aka 0)
	// 	var adj_x = (ba[0].start_loc[0] * this.tb_w);

	// 	//get 2 of [0,2] and multi by 10 (aka 20)
	// 	var adj_y = (ba[0].start_loc[1] * this.tb_l);

	// 	// console.log("adj_x is: " + adj_x);
	// 	// console.log("adj_y is: " + adj_y);

	// 	this.ulc_x += adj_x;
	// 	this.urc_x += adj_x;
	// 	this.ulc_y += adj_y;
	// 	this.llc_y += adj_y;

	// }
	//debugger

	this.adj_gen_area_loc(ba);
	
	// console.log("111this.ascii_tba[0][0] is: " + this.ascii_tba[0][0]);
	// console.log("111this.ascii_tba[2][0] is: " + this.ascii_tba[2][0]);
	// console.log("this.ascii_tba[2][0] is: " + this.ascii_tba[2][0][1]);
	// console.log("this.ascii_tba[2][0] is: " + this.ascii_tba[2][0][2]);

	print_3d_array(this.ascii_tba);
	//console.log(this.ascii_tba);
	//console.log("--------------");
	//console.log(this.ascii_tba[1]);
	//print_2d_array(this.ascii_tba[0]);

};
*/


///okay okay okay...I get this. 
//it will have a copy of a 3d array of tb's and ascci tb's. 
//(lol god dangit this complicates stuff. hopefully it'll pay off later on) 
//anyway, the arrays will go z,x,y
//once this is formated properly...it should be a bunch 
//easier to insert said terrain squares 3d values into the 
//general z,x,y ascii_tsa and tsa  which is really the final goal there. 
Terrain_Square.prototype.set_tb_design_2d = function(start_at_x,start_at_y,ba){

	//console.log("should be seeing this");

	//need to use starting location...but that's it! :-) 

	// var start_at_x = this.array_loc_x;
	// var start_at_y = this.array_loc_y;

	for(var tmp_obj of ba){

		var z = tmp_obj.layer;

		var tb_loc_z = z * this.tb_h;

		// console.log("--------------------");
		// console.log("z is: " + z);

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

				//array location y. is used (along with alx) to say where 
				//in the xy plane this terrain square is supposed to go. 
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

				this.tba[z][alx][aly] = new Terrain_Block(tb_loc_z,tb_loc_x,tb_loc_y,type_val);
				this.ascii_tba[z][alx][aly] = type_val;
			}

		}

	}

	this.adj_gen_area_loc(ba);

	//console.log(this.ascii_tba[0]);

	// console.log("-----");
	// print_2d_array_v2(this.ascii_tba[0]);
	// console.log("-----");

	//print_3d_array(this.ascii_tba);

}

//adjust general area location. that is to say, adjust the
//ulc_x and the like so that they reflect where the actual boundaries
//for the graphic are. 
Terrain_Square.prototype.adj_gen_area_loc = function(ba){

	if(ba.length != 0){

		//taking one of its layers at random
		//get 0 of [0,2] and multi by 10 (aka 0)
		var adj_x = (ba[0].start_loc[0] * this.tb_w);

		//get 2 of [0,2] and multi by 10 (aka 20)
		var adj_y = (ba[0].start_loc[1] * this.tb_l);

		// console.log("adj_x is: " + adj_x);
		// console.log("adj_y is: " + adj_y);

		this.ulc_x += adj_x;
		this.urc_x += adj_x;
		this.ulc_y += adj_y;
		this.llc_y += adj_y;

	}

}



//number of layers (in the 3d array) tall this terrain square is. 
Terrain_Square.prototype.get_layer_count = function(){
	return this.array_h;
};



Terrain_Square.prototype.draw_ssi = function(){

	//pw.print("zoomy");

	//for testing only
	//this.contains_mouse_check();

	// console.log("this.ssi.start_of_ssi_x is: " + this.ssi.start_of_ssi_x);
	// console.log("this.ssi.start_of_ssi_y is: " + this.ssi.start_of_ssi_y);
	// console.log("this.ssi.s_width is: " + this.ssi.s_width);
	// console.log("this.ssi.s_height is: " + this.ssi.s_height);
	// console.log("this.x is: " + this.x);
	// console.log("this.y is: " + this.y);
	// console.log("this.ssi.destination_width is: " + this.ssi.destination_width);
	// console.log("this.ssi.destination_height is: " + this.ssi.destination_height);
	// console.log(this.sprite_sheet);
	// debugger;


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

	//pw.print("getting here");

	this.draw_containing_tb();

};

//for debugging only
Terrain_Square.prototype.draw_sq_around_ts = function(){

	pw.print("meow");

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

	//pw.print("moo?");

	this.contains_mouse_check();

	if(this.contains_mouse){

		//pw.print("seeing it");

		var tmp_tb = this.get_containing_tb();

		if(tmp_tb != null){
			//pw.print("found a match");
			tmp_tb.draw_ssi();
		}
		// else{
		// 	pw.print("not finding a match");
		// }

	}
	// else{
	// 	pw.print("not seeing it")
	// }


};


//0,0,2
//0,1,2
//0,2,2
Terrain_Square.prototype.get_containing_tb = function(){


	// var loc_x = Math.floor(mx / this.tb_w)  - this.array_loc_x;
	// var loc_y = Math.floor(my / this.tb_l)  - this.array_loc_y;
	var loc_x = Math.floor(mx / this.tb_w);
	var loc_y = Math.floor(my / this.tb_l);

	// pw.print("this.curr_layer is: " + this.curr_layer);
	pw.print("loc_x is: " + loc_x);
	pw.print("loc_y is: " + loc_y);

	// pw.print("this.tba.length is: " + this.tba.length);
	// pw.print("this.tba[" + loc_x + "].length is: " + this.tba[loc_x].length);

	if(this.tba[this.curr_layer][loc_x] != null && this.tba[this.curr_layer][loc_x][loc_y] != null){
		//pw.print("exists");
		return this.tba[this.curr_layer][loc_x][loc_y];
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

	// pw.print("this.ulc_x is: " + this.ulc_x);
	// pw.print("this.urc_x is: " + this.urc_x);

	// pw.print("this.ulc_y is: " + this.ulc_y);
	// pw.print("this.llc_y is: " + this.llc_y);


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


//get x location of this terrain square's loc on 
Terrain_Square.prototype.get_x_loc_of_ts_on_tl_tb_array = function(x){

	var which_layer = this.curr_layer + this.base_layer;

	var layer = this.get_start_loc_for_layer(which_layer);

	var adj_x = layer[0] + x + this.array_loc_x;

	return adj_x;

}

Terrain_Square.prototype.get_y_loc_of_ts_on_tl_tb_array = function(y){

	var which_layer = this.curr_layer + this.base_layer;

	var layer = this.get_start_loc_for_layer(this.curr_layer);

	var adj_y = layer[1] + y + this.array_loc_y;

	return adj_y;

}

//30,31,32
//when accessing these values, the upper left hand corner is 0,0. you ignore
//the specific terrain square's location. this is to make debugging easier. 
Terrain_Square.prototype.get_ascii_terrain_block_type = function(z,adj_x,adj_y){

	// var adj_x = x + this.array_loc_x;
	// var adj_y = y + this.array_loc_y;

	

	//layer: the entire 2d array is not defined. some parts are and
	//some parts aren't. that's where layer comes in. to say
	//where the starter values are. 

	//this.array_loc_x/this.array_loc_x: they are to keep track
	//of how much the item has been moved up and down, back and
	//forth by. 

	//x/y: for iterating through all the locations

	//last bit needs to set exactly where 

	// var adj_x = layer[0] + x + this.array_loc_x;
	// var adj_y = layer[1] + y + this.array_loc_y;

	// console.log("z is: " + z);
	// console.log("adj_x is: " + adj_x);
	// console.log("adj_y is: " + adj_y);
	// console.log("val is: " + this.ascii_tba[z][adj_x][adj_y]);
	// console.log("----");

	// console.log("y is: " + y);
	// console.log("this.array_loc_y is: " + this.array_loc_y);
	// console.log("===========");

	// console.log("(should consistently be 2) adj_y is: " + adj_y);
	//console.log("----");


	//adj_y = 2;//temporary.


	// console.log("this.ascii_tba[adj_x][adj_y] is:" + this.ascii_tba[adj_x][adj_y]);

	// console.log("this.ascii_tba[0][adj_x][adj_y] is:" + this.ascii_tba[2][adj_x][adj_y]);
	//debugger;
	return this.ascii_tba[z][adj_x][adj_y];

	//return this.get_certain_actual_element(z,adj_x,adj_y);

};

Terrain_Square.prototype.get_start_loc_for_layer = function(z){

	console.log(this.ba);

	for(var obj of this.ba){

		if(obj.layer == z){
			return obj.start_loc;
		}
	}

	return null;
}


//not in use 
Terrain_Square.prototype.get_certain_actual_element = function(z,x,y){

	//two d array
	var tda = this.ascii_tba[z];

	var count_x = 0;
	
	for(var num1 in tda){

		var tmp_array = tda[num1];

		var count_y = 0;

		for(var num2 in tmp_array){

			if(count_x == x && count_y == y){
				return tmp_array[num2];
			}

			count_y++;
		}

		count_x++;
	}

};

	//////////////////////////////////////

	//var x_start = -1;

	// while(x_start < x){

	// 	if(tda[x_start] != null){

	// 		var y_start = -1;

	// 		while(y_start < y){

	// 			if(tda[x_start][y_start] != null){
	// 				y_start++;
	// 			}

	// 			if(y_start == y){
	// 				return tda[x_start][y_start];
	// 			}

	// 		}

	// 		x_start++;
	// 	}
	// }



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
/*

Terrain_Square.prototype.add_boundaries = function(ba){

	console.log("getting into here...AT ALL!?!?");

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

	// this.tb_w = Terrain_Block.w;//thickness
	// this.tb_l 

	//finally, set it's general area by...

	//pw.print("getting here?");
	console.log("getting here?");

	if(ba.length != 0){

		//taking one of its layers at random
		//get 0 of [0,2] and multi by 10 (aka 0)
		var adj_x = (ba[0].start_loc[0] * this.tb_w);

		//get 2 of [0,2] and multi by 10 (aka 20)
		var adj_y = (ba[0].start_loc[1] * this.tb_l);

		this.ulc_x += adj_x;
		//this.urc_x = this.x + this.w;
		this.ulc_y += adj_y
		//this.llc_y = this.y + this.l;

	}

};
*/

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


-----------------------------------------------------
get the squares to be set properly. 

after that, go to terrain layer, get it to recognize that you're
on the first layer. so that bottom row turns red and everything else


----

got the ulc_x and stuff where I think I want them. 

now I need to make sure that the tb's are being placed where I want them
to be (where they should be).

note that they should all be in the same row...but with different z values.

----

I will now null out the rock and put down grass. (check)

grass has no boundaries (check)

once that is working, go onto terrain layer. (check)

test it with just grass. (current)

then test it with just a rock 

then a layer of grass with a rock ontop. 

then after that need to go onto area holder. 

need the grass and rock to be set in the same initial location. 
with rock ontop of grass. 

first layer should look like this: 

000
000
111

second layer 

nnn
nnn
111

third layer

nnn
nnn
111 

*/


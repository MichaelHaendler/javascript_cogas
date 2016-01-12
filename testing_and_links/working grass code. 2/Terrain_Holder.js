

//var something_by_something = 20;
//var width_of_square = 20;
//var height_of_square = 20;


// function Terrain_Holder(width,height){

//wos == width of squares
//hos == height of squares
//nos == number of squares

//(wos,hos,c_w,c_h);
function Terrain_Holder(wos,hos,nos){

	// console.log("canvas_width is: " + canvas_width);
	// console.log("canvas_height is: " + canvas_height);

	this.wos = wos;
	this.hos = hos;

	//canvas width
	this.c_w = this.wos * nos;
	//canvas height
	this.c_h = this.hos * nos;

	this.nos = nos;

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


	var tmp_array = [];

	for(var y = 0; y < this.nos; y++){

		tmp_array[y] = null;

	}

	//console.log("tmp_array.length is:" + tmp_array.length);


	//fill it in so that all of those locations exist. 
	for(var x = 0; x < this.nos; x++){

		this.tss[x] = tmp_array.slice(0);

		this.ascii_tss[x] = tmp_array.slice(0);
	}


	// console.log(this.b_size);
	// console.log(this.tss);

	//3)now there is a "null" in place for every single square. 

};



Terrain_Holder.prototype.add_square = function(x,y,type,which_sprite_array,name_of_sprite_sheet){

	//var name_of_sprite_sheet = "ground_and_mark_path_images_set_1";

	//var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,0,name_of_sprite_sheet);

	//console.log("2which_sprite_array is: " + which_sprite_array);
	// console.log("this.wos is: " + this.wos);
	// console.log("this.hos is: " + this.hos);

	//console.log("entering here");
	var tmp_ts = new Terrain_Square(x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

	//console.log(this.tss);

	this.tss[x][y] = tmp_ts;

	this.ascii_tss[x][y] = type;

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

	// this.tss[0][0].contains_mouse = true;

	// this.tss[0][0].draw_ssi();

	
	if(this.contains){
		if(this.tss[this.contains_x][this.contains_y] != null){
			this.tss[this.contains_x][this.contains_y].contains_mouse = true;
		}
	}


	for(var x = 0; x < this.c_w; x++){
		for(var y = 0; y < this.c_h; y++){

			if(this.tss[x][y] != null){
				this.tss[x][y].draw_ssi();
			}
			
		}
	}

	if(this.contains){
		if(this.tss[this.contains_x][this.contains_y] != null){
			this.tss[this.contains_x][this.contains_y].contains_mouse = false;
		}
	}
	

};

Terrain_Holder.prototype.print_2d_array = function(){

	var tmp_string = '\n' + "[" + '\n';

	// console.log("this.tss.length is: " + this.tss.length);
	// console.log("this.tss[0].length is: " + this.tss[0].length);
	// console.log("this.ascii_tss.length is: " + this.ascii_tss.length);
	// console.log("this.ascii_tss[0].length is: " + this.ascii_tss[0].length);

	for(var x = 0; x < this.nos; x++){


		tmp_string += "[";

		for(var y = 0; y < this.nos; y++){

			//check 1
			var c1 = (y == this.ascii_tss[x].length -1) ? "" : ",";

			var symbol = (this.ascii_tss[y][x] == null) ? 'n' : this.ascii_tss[y][x];

			tmp_string += symbol + c1;

			//tmp_string += this.ascii_tss[y][x] + c1;

		}

		//check 2
		var c2 = (x == this.ascii_tss.length -1) ? "]" : "],";

		tmp_string += c2 + '\n';
		
	}

	tmp_string += "];";

	console.log(tmp_string);


};




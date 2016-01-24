
/*
okay okay okay...I think I've got it. 

a terrain_block is a 1 or a 0 (or some number like it). and just
has a getter. 

a terrain_square is made up of terrain_blocks. each terrain_square
now also has to define which parts of its image is walkable (0) and
which parts aren't (1)

and terrain holder is made up of these new terrain squares 

and area builder possibly has new shit to deal with as well. 

*/

//very important note: each block is to be 10 by 10. 

Terrain_Block.w = 10;
Terrain_Block.h = 10;

//dont need these values per instance...so made them static
Terrain_Block.cannot_walk = 1;
Terrain_Block.can_walk = 0;

function Terrain_Block(x,y,block_type,ss,ssi){

	this.color = "blue";

	//is a number. 0 means you can walk on it. 1 means
	//you cant. 
	this.type = block_type;

	if(this.type == Terrain_Block.cannot_walk){
		//console.log("not walk here");
		this.color = "red";
	}
	// else{
	// 	console.log("type is: " + this.type);
	// }

	//x and y should be both location in array AND location on screen (i think?)
	this.x = x;
	this.y = y;



	//hard coded because all terrain blocks are supposed to be the exact
	//same width and height. 
	this.w = Terrain_Block.w;
	this.h = Terrain_Block.h;

	// this.w = 10;
	// this.h = 10;

	//so that these 4 values dont need to be calculated over and over again. 
	this.ulc_x = this.x;
	this.urc_x = this.x + this.w;
	this.ulc_y = this.y;
	this.llc_y = this.y + this.h;

	this.image_chunk_x = null;

	this.image_chunk_y = null;

	// will probably be done along the lines of: 
	//var blah = new Terrain_Block(x,y,block_type,new SSI(...));
	this.ssi = ssi;

	this.sprite_sheet = ss;



};

Terrain_Block.prototype.set_block_type = function(num){

	this.type = num;

	if(this.type == Terrain_Block.cannot_walk){
		this.color = "red";
	}

	if(this.type == Terrain_Block.can_walk){
		this.color = "blue";
	}

};

Terrain_Block.prototype.get_block_type = function(){

	return this.type;

};

//not even a single still image. just a square. :-P 
Terrain_Block.prototype.draw_ssi = function(){
	


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

	if(this.contains_mouse()){

		ctx.lineWidth= "1";
		ctx.strokeStyle = this.color;
		ctx.rect(this.x,this.y,this.w,this.h);
		ctx.stroke();

	}


};


Terrain_Block.prototype.contains_mouse = function(){

	var contains_x = (mx >= this.ulc_x && mx <= this.urc_x);

	if(contains_x){

		var contains_y = (my >= this.ulc_y && my <= this.llc_y);

		if(contains_y){
			return true;
		}
		else{
			return false;
		}

	}
	else{
		return false;
	}

};


Terrain_Block.prototype.test = function(){

	console.log("this is working?");
};

Terrain_Block.prototype.set_image_xy_chunks = function(x,y){

	this.image_chunk_x = x;
	this.image_chunk_y = y;
};

Terrain_Block.prototype.get_image_chunk_x = function(){

	return this.image_chunk_x;
};

Terrain_Block.prototype.get_image_chunk_y = function(){

	return this.image_chunk_y;
};

Terrain_Block.prototype.get_image_chunk_w = function(){

	return Terrain_Block.w;
};

Terrain_Block.prototype.get_image_chunk_h = function(){

	return Terrain_Block.h;
};

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

function Terrain_Block(block_type){

	//is a number. 0 means you can walk on it. 1 means
	//you cant. 
	this.block_type = block_type;

};

Terrain_Block.prototype.get_block_type = function(){

	return this.block_type;

};
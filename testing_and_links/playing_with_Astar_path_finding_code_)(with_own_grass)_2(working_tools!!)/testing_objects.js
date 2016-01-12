
//width of square
var wos = 20;

//height of square
var hos = 20;

//number of squares (same in both directions)
var nos = 30;

var th = new Terrain_Holder(wos,hos,nos);

var name_of_sprite_sheet = "grass_and_rocks_canvas";

var grass_sprite = [0,0,32,32];

var rock_sprite = [32,0,32,32];

var type0=0;//walked on
var type1=1;//cant be walked on

function fill_th_instance_with_stuff(){

	

	//note: will be using something like this in the final code. 
	//that is, using code to manually assemble the area. am doing this
	//until I have a gui for building an area. 
	
	var type = 0;//walked on.
	//var type1 = 0;//not walked on

	for(var x = 0; x < nos; x++){
		for(var y = 0; y < nos; y++){
			th.add_square(x,y,type0,grass_sprite,name_of_sprite_sheet);
			//th.add_square(x,y,type0,rock_sprite,name_of_sprite_sheet);
		}
	}

	//console.log("///////////////////////////////////////////////////////////////////////////////");

	//add rocks
	for(var i = 5; i < 10; i++){
		th.add_square(9,i,type1,rock_sprite,name_of_sprite_sheet);
	}

};

fill_th_instance_with_stuff();

//100,140 start
//240,120 end



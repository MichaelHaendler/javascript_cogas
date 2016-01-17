
/*
var mike = new Person();

// var init_loc_on_screen = [230,50];
//var width_and_height_of_image_on_screen = [40,40];



//var init_loc_on_screen = [27,29];

var init_loc_on_screen = [80,28];
var image_name = "health_icon_1";
var image_dimensions = [10,11,110,109];


// gen_obj = new Gen_Obj(init_loc_on_screen,
// 						  width_and_height_of_image_on_screen,
// 						  image_name,
// 						  image_dimensions);



gen_obj = new Gen_Obj(init_loc_on_screen,
						  image_name,
						  image_dimensions);

// console.log("Gen_Obj.h is: " + Gen_Obj.h);

var box = new Stuff_Box();
box.x = 230;
box.y = 10;

var up_button = new Gen_Button(300,50);
up_button.set_sheet("button_set_1");

var up_reg_x = 515;
var up_reg_y = 117;
var up_reg_w = 64;
var up_reg_h = 64;
var up_reg_dw = up_reg_w;
var up_reg_dh = up_reg_h;

up_button.set_reg_image(up_reg_x,up_reg_y,up_reg_w,up_reg_h,up_reg_dw,up_reg_dh);

up_button.set_small_buttons_x_and_y();

var up_clicked_x = 583;
var up_clicked_y = 125;
var up_clicked_w = 49;
var up_clicked_h = 55;
var up_clicked_dw = up_clicked_w;
var up_clicked_dh = up_clicked_h;

up_button.set_clicked_image(up_clicked_x,up_clicked_y,up_clicked_w,up_clicked_h,up_clicked_dw,up_clicked_dh);


//var inv_rect = new Inventory_Rectangle(10,15,15);

// $('<canvas id="BLAHEY">').appendTo('#top');
// $('#BLAHEY')[0].width = 50;
// $('#BLAHEY')[0].height = 50;

// var c2 = document.getElementById("test_canvas2");

// // $('<canvas id="ZOOMY"></canvas>').appendTo('#top').width(50).height(60);
// $('<canvas id="ZOOMY"></canvas>').appendTo('#test_canvas');
// // var tmp = $('#ZOOMY');
// // tmp[0].width = 50;
// // tmp[0].height = 60;

// console.log("c2 is: ");
// console.log(c2);
// console.log("tmp is:");
// //console.log(tmp.get(0));



function testing_box(x,y){

	this.set_initial_values = false;

	this.loc = [x,y];

	this.finished = false;

};

//item ulc into sb via sb's lrc 
testing_box.prototype.test1 = function(to_get_to){

	pw.AddToList("box.ulc is: " + box.ulc());
	pw.AddToList("box.lrc is: " + box.lrc());

	if(!this.finished){

		if(!this.set_initial_values){
			gen_obj.x = start_loc[0];
			gen_obj.y = start_loc[1];
			this.set_initial_values = true;
		}
		
		if(gen_obj.x != this.loc[0] && gen_obj.y != this.loc[1]){
			gen_obj.x = gen_obj.x - 1;
			gen_obj.y = gen_obj.y - 1;
			//console.log("gen_obj.x is: " + gen_obj.x);
			// var val = box.percentage_filled_by_item(gen_obj);
			// pw.AddToList("val is: " + val);

		}
		else{
			this.finished = true;
		}

	}


};

//for case 11
testing_box.prototype.test2 = function(to_get_to){

	if(!this.finished){

		if(!this.set_initial_values){
			gen_obj.x = start_loc[0];
			gen_obj.y = start_loc[1];
			this.set_initial_values = true;
		}
		
		if(gen_obj.y != this.loc[1]){
			//gen_obj.x = gen_obj.x - 1;
			gen_obj.y = gen_obj.y - 1;
			//console.log("gen_obj.x is: " + gen_obj.x);
			// var val = box.percentage_filled_by_item(gen_obj);
			// pw.AddToList("val is: " + val);

		}
		else{
			this.finished = true;
		}

	}



};

//var zoom = 1;

//var testing_thing = new testing_box(start_loc = [65,65]);

// testing_thing.test1(to_get_to = [35,35]);

//.25
//(30 * 30) / (60 * 60)

//.42
//(39 * 39) / (60 * 60)


// var inv_rec = new Inventory_Rectangle(10,0,0);

*/

// var init_loc_on_screen = [488,54];
var init_loc_on_screen = [270,30];
var image_name = "health_icon_1";
var image_dimensions = [10,11,110,109];
// gen_obj = new Gen_Obj(init_loc_on_screen,
// 						  image_name,
// 						  image_dimensions);



//gen_obj.name = "blah1";

var init_loc_on_screen1 = [270,90];
var obj1 = new Gen_Obj(init_loc_on_screen1,
						  image_name,
						  image_dimensions);
obj1.name = "mark";

var init_loc_on_screen2 = [270,150];
var obj2 = new Gen_Obj(init_loc_on_screen2,
						  image_name,
						  image_dimensions);

obj2.name = "john";



//var mike = new Gen_Character();

var mike = new Person();


var GID = new Ground_Item_Displayer();


//console.log("adding items a lot??");
GID.add_item(obj1);
GID.add_item(obj2);


//test terrain square
var test_ts = null;

var x = 0;
var y = 0;
var wos = 30;
var hos = 30;
var type0 = 0;
var rock_sprite = [32,0,32,32];
var name_of_sprite_sheet = "grass_and_rocks_canvas";
// var ba = [[0,0],[1,1]];
//var ba = [[0,0]];
var ba = [[0,2],[1,2],[2,2]];

test_ts = new Terrain_Square(x,y,wos,hos,type0,rock_sprite,name_of_sprite_sheet);

test_ts.add_boundaries(ba);

//test_ts.print_2d_array();

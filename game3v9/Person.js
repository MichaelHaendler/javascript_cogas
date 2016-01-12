

function Person(){

	//graphic of person
	this.gop = new Gen_Character();

	//menu (holds items as well)
	this.menu = new Menu();

	this.menu.set_perp_wh_vals(this.gop.get_wah());

	var w_and_h = this.gop.get_wah();

	this.menu.set_perp_wh_vals(w_and_h);

	//each person should have a name. 
	this.name = "default_name";

	//things like scientist. solider. engineer. characters might have mutliple type.
	//or maybe not. maybe I wont wind up using this at all. (shrugs)
	this.char_type = "default_type";

	// each person should have a face graphic
	//this.face_picture = new SSI();

	//attributes (not yet implemented)
	this.attr = new Attr();
};

Person.prototype.run = function(){

	this.gop.run(g_direction,g_moved);

	var x_and_y = this.gop.get_x_and_y();

	this.menu.set_perp_xy_vals(x_and_y);

	this.menu.update(mx,my,mlc,gen_obj);

	this.menu.draw_ssi();
};

/*
Person.prototype.draw_ssi = function(){

	this.gop.draw_ssi();

	this.menu.draw_ssi();
};

*/

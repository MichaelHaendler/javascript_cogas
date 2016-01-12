

var mike = new Person();

var init_loc_on_screen = [100,50];
var width_and_height_of_image_on_screen = [40,40];
var image_name = "health_icon_1";
var image_dimensions = [10,11,110,109];


// gen_obj = new Gen_Obj(init_loc_on_screen,
// 						  width_and_height_of_image_on_screen,
// 						  image_name,
// 						  image_dimensions);

gen_obj = new Gen_Obj(init_loc_on_screen,
						  image_name,
						  image_dimensions);

console.log("Gen_Obj.h is: " + Gen_Obj.h);

var box = new Stuff_Box();

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


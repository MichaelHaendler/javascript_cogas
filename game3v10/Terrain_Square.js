
//stuff for drawing squares:
//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_rect2

//info about transparency: 
//http://www.w3schools.com/tags/canvas_globalalpha.asp

// (x,y,this.wos,this.hos,type,which_sprite_array,name_of_sprite_sheet);

//more colored square stuff
//http://www.w3schools.com/tags/canvas_rect.asp

function Terrain_Square(x,y,w,h,type,which_sprite_array,name_of_sprite_sheet){

	this.x = x * w;
	this.y = y * h; 
	this.w = w;
	this.h = h;

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

};


Terrain_Square.prototype.draw_ssi = function(){




	// sx is: 0
	// sy is 0
	// swidth is: 32
	// sheight is: 32	
	// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

	// pw.print("this.ssi.start_of_ssi_x is: " + this.ssi.start_of_ssi_x);
	// pw.print("this.ssi.start_of_ssi_y is: " + this.ssi.start_of_ssi_y);
	// pw.print("this.ssi.s_width is: " + this.ssi.s_width);
	// pw.print("this.ssi.s_height is: " + this.ssi.s_height);
	// pw.print("this.x is: " + this.x);
	// pw.print("this.y is: " + this.y);
	// pw.print("this.ssi.destination_width is: " + this.ssi.destination_width);
	// pw.print("this.ssi.destination_height is: " + this.ssi.destination_height);
	// pw.print("-----------------");


	// this.ssi.graphic_print_all_values();

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



	if(this.contains_mouse){

		// pw.print("square x is: " + this.x);
		// pw.print("square y is: " + this.y);

		pw.print("square x is: " + (this.x / this.w));
		pw.print("square y is: " + (this.y / this.h));
		//pw.print("getting here");

		//var line_width = 3;

		ctx.lineWidth= "1";
		//ctx.strokeStyle="yellow";
		ctx.strokeStyle= this.color;
		//ctx.rect(5,5,290,140); 
		ctx.rect(this.x,this.y,this.w,this.h);
		ctx.stroke();
		//ctx.strokeStyle="white";

	}

	// this.zoom = document.getElementById(name_of_sprite_sheet);

	// ctx.drawImage(this.zoom,0,0);

};

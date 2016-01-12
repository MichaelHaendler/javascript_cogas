

// var c = document.getElementById("myCanvas"); // c == canvas
// var ctx = c.getContext("2d");

//var pw = new display_phrases_list(400,20);

var printed = false;
var seen = false;
var four = 0;

var mainloop = function (){

	myCanvas.width = myCanvas.width;

	ctx.fillStyle="pink";
	ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	set_user_inputs();

	pw.print("mx is: " + mx);
	pw.print("my is: " + my);

	// sq1();
	// sq2();
	// sq3();
	// sq4();
	// v_sq();
	// //h_sq();
	// extra_v_sq1();
	// extra_h_sq1();
	// extra_h_sq2();
	// extra_h_sq3();


	show();

	// if(seen == false){
	// 	width_and_height_of_symbol();
	// 	seen = true;
	// }

	// if(four != 4){
	// 	//left_side_X();
	// 	right_side_X();
	// 	four++;
	// }

	//bottom_Y();

	pw.displayList();

	// if(printed == false){
	// 	// var imgd = ctx.getImageData(0,0, c.width,c.height);
	// 	var imgd = ctx.getImageData(1,1,1,1);
	// 	var pix = imgd.data;
	// 	console.log(pix);
	// 	printed = true;
	// };
};//end of mainloop

/*
going down: 

i1 + (h * i2)

going up: 

(i1 + h) - (w * i2)

going right: 

(i1 * w) + i2

going left: 

(i1 * w) + (w * i2)
*/


var seen = false;

function blah(){

	var imgd = ctx.getImageData(0,0, c.width,c.height);
	var pix_array = imgd.data;

	//console.log(pix_array);

	//y
	for(var i1 = 0; i1 < c.height; i1++){

		// //x
		for(var i2 = 0; i2 < c.width; i2++){

			var pix_loc = 4 * ((i1 * c.width) + i2);

		// if(seen == false){
		// 	console.log("pix_array[pix_loc] is: " + pix_array[pix_loc]);

		// 	if(pix_array[pix_loc + 2] == 255){
		// 		console.log("does equal 255!");
		// 	}
		// 	else{
		// 		console.log("does not equal 255");
		// 	}

		// 	seen = true;
		// }

		//console.log("pix_loc is: " + pix_loc);

			//first, tallest black pixel that we've found. 
			if(pix_array[pix_loc] == 255 && 
			   pix_array[pix_loc + 1] == 255 &&
			   pix_array[pix_loc + 2] == 255){

				console.log("x loc is: " + i2);
				return true;
			}
		}

	}

	if(seen == false){
		console.log("eek! error! Didn't see any black unfortunately.");
		seen = true;
	}

	//ctx.putImageData(imgd, 0, 0); // at coords 0,0

};


function blah2(){

	var imgd = ctx.getImageData(0,0, c.width,c.height);
	//var pix_array = imgd.data;

	for(var x = 0; x < c.width; x++){
	//for(var x = 0; x < 5; x++){
		// for(var y = 0; y < ctx.height; y++){
		for(var y = 0; y < 5; y++){
			imgd = setPixel(imgd,x,y);
		}
	}

	ctx.putImageData(imgd, 0, 0);
};

function setPixel(imageData, x, y) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = 128;
    imageData.data[index+1] = 128;
    imageData.data[index+2] = 128;
    imageData.data[index+3] = 255;

    return imageData;
};

// 0 to 73039

// aka

// 166 * 110 * 4

// aka 73040

//gray
//128, 128, 128

//simply want the first black pixel that it comes across. tallest
//should be seen first (should be taller than everything else)
function top_Y(tmp_c){

	var tmp_ctx = tmp_c.getContext('2d');

	var imgd = tmp_ctx.getImageData(0,0, tmp_c.width,tmp_c.height);
	//var pix_array = imgd.data;

	for(var y = 0; y < tmp_c.height; y++){
		for(var x = 0; x < tmp_c.width; x++){

			var index = (x + y * imgd.width) * 4;

			if(imgd.data[index+0] == 0 &&
				imgd.data[index+1] == 0 &&
				imgd.data[index+2] == 0){

				// if(seen == false){
				// 	console.log("22top_Y is: " + y);
				// 	seen = true;
				// }

				return y;
			}
		}
	}


	// if(seen == false){
	// 	console.log("eek! error! Didn't see any black unfortunately.");
	// 	seen = true;
	// }
};

//starts at the bottom but is otherwise the same idea as the top. 
//the lowest pixel in this case should be seen first. 
function bottom_Y(tmp_c){

	var tmp_ctx = tmp_c.getContext('2d');

	var imgd = tmp_ctx.getImageData(0,0, tmp_c.width,tmp_c.height);
	//var pix_array = imgd.data;

	for(var y = tmp_c.height - 1; y >= 0 ; y--){
		for(var x = 0; x < tmp_c.width; x++){
	
			var index = (x + y * imgd.width) * 4;

			if(imgd.data[index+0] == 0 &&
				imgd.data[index+1] == 0 &&
				imgd.data[index+2] == 0){
				

				// if(seen == false){
				// 	console.log("bottom_Y is: " + y);
				// 	seen = true;
				// }

				return y;
			}
		}
	}


	// if(seen == false){
	// 	console.log("eek! error! Didn't see any black unfortunately.");
	// 	seen = true;
	// }
};

//is not necessarily first. the pixel that sticks to the left
//side the most 
function left_side_X(tmp_c){

	var tmp_ctx = tmp_c.getContext('2d');

	var imgd = tmp_ctx.getImageData(0,0, c.width,c.height);
	//var pix_array = imgd.data;

	//furthest right hand side value (makes the coding a little easier)
	var x_val = tmp_c.width; 

	for(var y = 0; y < tmp_c.height; y++){
		for(var x = 0; x < tmp_c.width; x++){

			var index = (x + y * imgd.width) * 4;

			if(imgd.data[index+0] == 0 &&
				imgd.data[index+1] == 0 &&
				imgd.data[index+2] == 0){

				if(x < x_val){
					x_val = x;
					//console.log("(left_side_X) x_val is: " + x_val);

				}
			}
		}
	} 

	//console.log("!!!!left_side_X is: " + x_val);

	return x_val;

};

function right_side_X(tmp_c){

	var tmp_ctx = tmp_c.getContext('2d');

	var imgd = tmp_ctx.getImageData(0,0, tmp_c.width,tmp_c.height);
	//var pix_array = imgd.data;

	//furthest left hand side value (makes the coding a little easier)
	var x_val = 0; 

	for(var y = 0; y < tmp_c.height; y++){

		for(var x = tmp_c.width - 1; x >= 0; x--){

			var index = (x + y * imgd.width) * 4;

			if(imgd.data[index+0] == 0 &&
				imgd.data[index+1] == 0 &&
				imgd.data[index+2] == 0){

				if(x > x_val){
					x_val = x;
					//console.log("(right_side_X) x_val is: " + x_val);

				}
			}
		}
	} 

	//console.log("!!!!!right_side_X is: " + x_val);

	return x_val;



};

function width_and_height_of_symbol(size,font,tmp_char){

	//make a canvas
	 var tmp_c = document.createElement('canvas');
	 tmp_c.width = 100;
	 tmp_c.height = 100;

	//make it so that you can draw on it 
	var tmp_ctx = tmp_c.getContext('2d');

	//fill it in by...

	//referring to its entire self as a square
	tmp_ctx.rect(0,0, tmp_c.width, tmp_c.height);

	////set its fill color to some color
	tmp_ctx.fillStyle="red";

	//and then fill it in. 
	tmp_ctx.fill();

	tmp_ctx.fillStyle = "black";

	//tmp_ctx.font = "25px Arial";
	tmp_ctx.font = size + "px " + font;

	//arbirarily drew it 20 over and 20 down to try and ensure that
	//it completely fits on the canvas. 
	tmp_ctx.fillText(tmp_char,20,40);


	//right side x
	var rsx = right_side_X(tmp_c);

	//left side x
	var lsx = left_side_X(tmp_c);

	var tY = top_Y(tmp_c);

	var bY = bottom_Y(tmp_c);

	var width = rsx - lsx;

	var height = bY - tY;

 // 	console.log("lsx is: " + lsx);
	// console.log("rsx is: " + rsx);
	// console.log("tY is: " + tY);
	// console.log("bY is: " + bY);
	// console.log("width is: " + width);
	// console.log("height is: " + height);


	return [width,height];
};


function calc_sizes(size,font,char_array){

	var resulting_map = [];
	//var resulting_map = new Map();

	if(char_array == null){

		char_array = [];

		var first_visible_symbol = 33;
		var last_visible_symbol = 125;

		for(var i = first_visible_symbol; i <= last_visible_symbol; i++){
			var tmp_char =  String.fromCharCode(i); 
			char_array.push(tmp_char);
		}

	}
	//else, there's already a set of characters in it. 

	//iterate through the characters, performing the size operation on them,
	//and then put the results into resulting_map
	for(var i = 0; i < char_array.length; i++){

		var tmp_char = char_array[i];

		//console.log("tmp_char is: " + tmp_char);

		//width and height array (first value is the width. second is the height. )
		var WaHA = width_and_height_of_symbol(size,font,tmp_char);

		//console.log("WaHA is: " + WaHA);

		resulting_map[tmp_char] = WaHA;
		//resulting_map.set(tmp_char,WaHA);


	}	

	//print results
	print_method(resulting_map);

};

function print_method(resulting_map){

	//console.log('var sizes_array = [');

	var length = Object.keys(resulting_map).length;
	var count = 0;
	var resulting_string = '\n' + '\n' + '\n' + "var sizes_array = [" + '\n';

	//console.log("length is: " + length);

	for(var letter in resulting_map){
		//console.log("resulting_map[" + letter + "] is: " + resulting_map[letter]);

		if(count < 92){
			//console.log("'" + letter + "' : [" + resulting_map[letter] + "],");
			resulting_string += "'" + letter + "' : [" + resulting_map[letter] + "]," + '\n';
			count++;
		} 
		else{
			//console.log("'" + letter + "' : [" + resulting_map[letter] + "]");
			resulting_string += "'" + letter + "' : [" + resulting_map[letter] + "]" + '\n';
		}
		//console.log("count is: " + count);
		
	}

	//console.log('];');

	resulting_string += "];";

	console.log(resulting_string);

};


calc_sizes(25,"Arial");
//calc_sizes(25,"Arial",['W']);


function show(){

	 var tmp_c = document.createElement('canvas');
	 tmp_c.width = 100;
	 tmp_c.height = 100;

	var tmp_char = 'W';

	var tmp_ctx = tmp_c.getContext('2d');

	//fill it in by...

	//referring to its entire self as a square
	tmp_ctx.rect(0,0, tmp_c.width, tmp_c.height);

	////set its fill color to some color
	tmp_ctx.fillStyle="red";

	//and then fill it in. 
	tmp_ctx.fill();

	tmp_ctx.fillStyle = "black";

	tmp_ctx.font = "25px Arial";
	//tmp_ctx.font = size + "px " + font;

	//arbirarily drew it 20 over and 20 down to try and ensure that
	//it completely fits on the canvas. 
	tmp_ctx.fillText(tmp_char,20,40);

	ctx.drawImage(tmp_c,0,0);

};

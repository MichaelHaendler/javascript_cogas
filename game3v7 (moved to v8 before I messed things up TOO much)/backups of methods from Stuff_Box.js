

//http://stackoverflow.com/questions/1480133/how-can-i-get-an-objects-absolute-position-on-the-page-in-javascript



// //duplicate of contains_item. duplicated just in case you wind up
// //wanting to make changes to contains_item later down the road. 
// Stuff_Box.prototype.percentage_filled_by_item = function(item){

// 	if(item != null){

// 		var total = (this.x + this.w) * (this.y + this.h);


// 		//upper left hand corner
// 		var x = item.x;

// 		var y = item.y;

// 		if(this.contains_point(x,y)){
// 			//this.debugging_percentage_filled_by_item(item);
// 			//return this.percentage_calculator_helper(item,x,y,total);

// 			// var diff_x = this.w - item.x;
			
// 			// var diff_y = this.h - item.y;
			
// 			// var final_val = (diff_x * diff_y) / total;

// 			//return final_val;

// 			return (x * y) / total;
// 		}


// 		//upper right hand corner
// 		var x = item.x + item.w;

// 		var y = item.y;

// 		if(this.contains_point(x,y)){
// 			//this.debugging_percentage_filled_by_item(x,y);
// 			return this.percentage_calculator_helper(item,x,y,total);
// 		}

// 		//lower left hand corner 
// 		var x = item.x;

// 		var y = item.y + item.h;

// 		if(this.contains_point(x,y)){
// 			//this.debugging_percentage_filled_by_item(x,y);
// 			return this.percentage_calculator_helper(item,x,y,total);
// 		}

// 		//lower right hand corner
// 		var x = item.x + item.w;

// 		var y = item.y + item.h;

// 		if(this.contains_point(x,y)){
// 			//this.debugging_percentage_filled_by_item(x,y);
// 			return this.percentage_calculator_helper(item,x,y,total);
// 		}

// 		//console.log("getting here for some crazy reason?");

// 		return false;

// 	}


// 	return false; //not in there and/or something went wrong. 


// 	// return 0; //if there is too little of the item in the box to be noticed
// };

//duplicate of contains_item. duplicated just in case you wind up
//wanting to make changes to contains_item later down the road. 
Stuff_Box.prototype.percentage_filled_by_item222 = function(item){

	if(item != null){

		//if ANY of the 4 points  are in the square...

		//1
		if(
			//1
			this.contains_point(x = item.x,
								y = item.y) ||

			//2
			this.contains_point(x = item.x + item.w,
								y = item.y) ||

			//3
			this.contains_point(x = item.x,
								y = item.y + item.h) ||

			//4
			this.contains_point(x = item.x + item.w,
								y = item.y + item.h)
			){


			//if too wide AND too tall (meaning it's width AND it's height goes
			//out of bounds relative to the stuff_box). 
			//NOTE: need to be first, the 2 directly below will get set off instead).
			if(((item.x + item.w > this.x + this.w) || (item.x > this.x)) && 
			   ((item.y + item.h > this.y + this.h) || (item.y > this.y)){

				var temp_w = (this.x + this.w) - item.x;

				var temp_h = (this.y + this.h) - item.y;

				return (temp_w * temp_h) / total;


			}


			//if the top of the item is in, but not the bottom 
			if((item.y > this.y && item.y <= this.y + this.h ) &&
				(item.y + item.h > this.y + this.h)){

				//ex: y is at 20 (we'll say x is 20 and y is 20)
				//this.h (and this.w) is 30 (making it go from the 20,20 to 50,50) 
				//if the item is at 40,40, and goes to, say, 80,80...we only want it
				//to inclue the amount that goes from 40,40 to 50,50. SO:
				//this.y is 20
				//this.h is 30
				//item.y is, say, 40, and we know we just want it to go to the end
				//of the stuff_box itself. SO! (20 + 30) - 40. 
				var temp_h = (this.y + this.h) - item.y;

				return (item.w * temp_h) / total;

			}

			//if the bottom of the item is in, but not the top 
			if(item.y < this.y &&
				(item.y + item.h <= this.y + this.h && item.y + item.h >= this.y)){

				//the formula has to be this way because "this.y" I think will always
				//be less than "(item.y + item.h)"
				var temp_h = (item.y + item.h) - this.y

				return (item.w * temp_h) / total;

			}

			//if the item goes out of bounds (relative to stuff_box) width wise
			if((item.x + item.w > this.x + this.w) || (item.x > this.x)){

				var temp_w = (this.x + this.w) - item.x;

				return (temp_w * item.h) / total;

			}
			

			
		}

		return false;

	}


	return false; //not in there and/or something went wrong. 


	// return 0; //if there is too little of the item in the box to be noticed
};



Stuff_Box.prototype.contains_a_quarter_or_more = function(new_item){

	//array exists basically to shorten the code (so that I
	//wouldn't need 8 if statements)
	var array = [];

	//note: the name attribute each one has is really just for debugging
	//purposes. 

	//upper left square
	var sq1 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq1",
		sect: "upper left quarter"
	};

	array.push(sq1);

	//lower left square
	var sq2 = {
		x: new_item.x,
		y: new_item.y + new_item.h/2,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq2",
		sect: "lower left quarter"
	};

	array.push(sq2);

	//upper right square
	var sq3 = {
		x: new_item.x + new_item.w/2,
		y: new_item.y,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq3",
		sect: "upper right quarter"
	};

	array.push(sq3);

	//lower right square
	var sq4 = {
		x: new_item.x + new_item.w/2,
		y: new_item.y + new_item.h/2,
		w: new_item.w/2,
		h: new_item.h/2,
		name: "sq4",
		sect: "lower right corner"
	};

	array.push(sq4);

	//----------------------------------------
	//below are to be thought of as rectangles found within the square. 

	//left side row/rectangle/quarter
	var sq5 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w/4,
		h: new_item.h,
		name: "sq5",
		sec: "left side rect"
	};	

	array.push(sq5);

	//(far) right side row/rectangle/quarter 
	var sq6 = {
		x: new_item.x + ((new_item.w/4) * 3),
		y: new_item.y,
		w: new_item.w/4,
		h: new_item.h,
		name: "sq6",
		sect: "right side rect"
	};

	array.push(sq6);

	//top row/rectangle/quarter. 
	var sq7 = {
		x: new_item.x,
		y: new_item.y,
		w: new_item.w,
		h: new_item.h/4,
		name: "sq7",
		sect: "top rect"
	};	

	array.push(sq7);

	//bottom row/rectangle/quarter. 
	var sq8 = {
		x: new_item.x,
		y: new_item.y + ((new_item.h/4) * 3),
		w: new_item.w,
		h: new_item.h/4,
		name: "sq8",
		sect: "bottom rect"
	};	

	array.push(sq8);

	//idea: make the 4 types as whole square, and just check em one by one
	//in another method called something like "contains_whole_thing" if none
	//of those return true, just return false. ;-)  

	if(this.contains_whole_thing(sq1)){
		//console.log("sq1 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq2)){
		//console.log("sq2 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq3)){
		//console.log("sq3 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq4)){
		//console.log("sq4 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq5)){
		//console.log("sq5 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq6)){
		//console.log("sq6 returning true");
		return true;
	}

	if(this.contains_whole_thing(sq7)){
		//console.log("sq7 returning true");
		return true;
	}
	if(this.contains_whole_thing(sq8)){
		//console.log("sq8 returning true");
		return true;
	}

	//once above code is working...delete it, and use this instead: 
	// for(var i = 0; i < array.length; i++){
	// 	var tmp_sq = array[i];
	// 	if(this.contains_whole_thing(tmp_sq)){
	// 		//console.log(tmp_sq.name + " is returning true");
	// 		return true;
	// 	}
	// }

	//console.log("returning false");

	return false; 


};

Stuff_Box.prototype.contains_whole_thing = function(sq) {

	// console.log(sq.name);
	// console.log(sq.sect);

	//if the x is less than 
	if(((sq.x > this.x) && (sq.x < this.x + this.w)) && 
		((sq.x + sq.w < this.x + this.w) && (sq.x + sq.w > this.x)) &&
		((sq.y > this.y) && (sq.y < this.y + this.h)) && 
		((sq.y + sq.h > this.y) && (sq.y + sq.h < this.y + this.h))){
		return true;
	}
	return false;

};


Stuff_Box.prototype.debugging_percentage_filled_by_item = function(item){

	var diff_x = item.w + (this.x - item.x);
	var diff_y = item.h + (this.y - item.y);


	var total = (this.x + this.w) * (this.y + this.h);

	var final_val = (diff_x * diff_y) / total;

	////////////////////////////////////////////

	console.log("/////////////////////////////////////");

	console.log("for diff_x: ");
	console.log("item.w is: " + item.w);
	console.log("this.x is: " + this.x);
	console.log("item.x is: " + item.x);
	console.log("formula for diff_x is: item.w + (this.x - item.x)");
	console.log("diff_x formula (w/ numbers) is: " + item.w + " + (" + this.x + " - " + item.x + ")");	
	console.log("so diff_x is: " + diff_x);

	console.log("for diff_y: ");
	console.log("item.h is: " + item.h);
	console.log("this.y is: " + this.y);
	console.log("item.y is: " + item.y);
	console.log("formula for diff_y is: item.h + (this.y - item.y)");
	console.log("diff_y formula (w/ numbers) is: " + item.h + " + (" + this.y + " - " + item.y + ")");
	console.log("so diff_y is: " + diff_y);

	console.log("for total: ");
	console.log("this.x is: " + this.x);
	console.log("this.w is: " + this.w);
	console.log("this.y is: " + this.y);
	console.log("this.h is: " + this.h);
	console.log("total formual is: (this.x + this.w) * (this.y + this.h)");
	console.log("total formula (w/ numbers) is: (" + this.x + " + " + this.w + ") * (" + this.y + " + " + this.h + ")");
	console.log("so total is: " + total);

	console.log("for final_val: ");
	console.log("diff_x is: " + diff_x);
	console.log("diff_y is: " + diff_y);
	console.log("total is: " + total);
	console.log("final_val formula is: (diff_x * diff_y) / total");
	console.log("final_val formula (w/ numbers) is: (" + diff_x + " * " + diff_y + ") / " + total);
	console.log("aka: " + diff_x * diff_y + " / " + total);

	console.log("final_val is: " + final_val);

	console.log("----------------------");

};



Stuff_Box.prototype.percentage_filled_by_item = function(item){

	//upper left corner
	var ulc = this.contains_point(x = item.x,y = item.y);
	//upper right corner
	var urc = this.contains_point(x = item.x + item.w, y = item.y);
	//lower left corner
	var llc = this.contains_point(x = item.x,y = item.y + item.h);
	//lower right corner
	var lrc = this.contains_point(x = item.x + item.w, y = item.y + item.h);

	var total = this.w * this.h;


	//case 1:
	if(ulc && !llc && !urc && !lrc){
		console.log("case 1");

		var width = (this.x + this.w) - item.x;
		var height = (this.y + this.h) - item.y;

		console.log("start is: " + 0);
		console.log("end is: " + this.w);
		console.log("item start is: " + 0);
		console.log("item end is: " + item.w);

		// console.log("(this.y + this.h) is: " + (this.y + this.h));
		// console.log("item.y is: " + item.y);
		// console.log("height is: " + height);


		console.log("total is: " + total);
		
		var final_val = ((width * height) / total) * 100;

		console.log("----final_val is: " + final_val);

		return (width * height) / total;

	}

	// //case 1:
	// //sb == stuff box
	// //(ulc of item entered sb via llc)
	// if(ulc && !llc && !urc && !lrc){
	// 	console.log("case 1");
	// 	//calc and return case 1

	// 	//have the width and height end where the sb ends. 
	// 	var width = (this.x + this.w) - item.x;
	// 	var height = (this.y + this.h) - item.y;

	// 	console.log("total is: " + total);
	// 	console.log("width is: " + width);
	// 	console.log("height is: " + height);

	// 	return (width * height) / total;

	// }

	//case 2
	//both ulc and llc are inside of the sb.
	if(ulc && llc && !urc && !lrc){
		console.log("case 2");

		var width = (this.x + this.w) - item.x;

		return (width * item.h) / total;

	}

	//case 3
	//urc (via llc of sb) inside of the sb.
	if(!ulc && !llc && urc && !lrc){
		console.log("case 3");

		var width = (item.x + item.w) - this.x;
		var height = this.h - item.y; 

		return (width * height) / total;

	} 

	//case4 
	//urc and lrc are inside of sb 
	if(!ulc && !llc && urc && lrc){
		console.log("case 4");

		var width = (item.x + item.w) - this.x;

		return (width * item.h) / total;

	}

	//case5
	//lrc is inside sb via sb's ulc
	if(!ulc && !llc && !urc && lrc){
		console.log("case 5");

		var width = (item.x + item.w) - this.x;

		var height = (item.y + item.h) - this.y

		return (width * height) / total;

	}

	//case6
	//both urc and lrc are inside of sb
	//code covered by case 4

	//case7
	//lrc is inside sb via sb's urc
	if(!ulc && !llc && !urc && lrc){
		console.log("case 7");

		var width = item.x - this.x;
		var height = (item.y + item.h) - this.y;

		return (width * height) / total;

	}	

	//case8
	//lrc is inside sb via sb's urc
	//code covered by case 2.

	//case 9
	//whole square inside
	if(ulc && llc && urc && lrc){
		console.log("case 9");

		var final_val = (item.w + item.h) / total;

		console.log("item.w is: " + item.w);
		console.log("item.h is: " + item.h);
		console.log("total is: " + total);
		console.log("!!final_val is: " + final_val);

		return (item.w * item.h) / total;
	}

	//case 10
	//llc and lrc inside sb via top of sb
	if(!ulc && llc && !urc && lrc){
		console.log("case 10");

		var height = (item.y + item.h) - this.y;

		return (item.w * height) / total;
	}

	//case 11
	//ulc and lrc inside sb via bottom of sb
	if(ulc && !llc && urc && !lrc){
		console.log("case 11");

		var height = (this.y + this.h) - item.y;

		return (item.w * height) / total; 
	}	

	return false;

};


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
//below is a good version of the percentage method. ;-)

Stuff_Box.prototype.percentage_filled_by_item = function(item){

	//upper left corner
	var ulc = this.contains_point(x = item.x,y = item.y);
	//upper right corner
	var urc = this.contains_point(x = item.x + item.w, y = item.y);
	//lower left corner
	var llc = this.contains_point(x = item.x,y = item.y + item.h);
	//lower right corner
	var lrc = this.contains_point(x = item.x + item.w, y = item.y + item.h);

	var total = this.w * this.h;


	//case 1:
	//sb == stuff box
	//(ulc of item entered sb via llc)
	if(ulc && !llc && !urc && !lrc){
		//console.log("case 1");
		//calc and return case 1

		//have the width and height end where the sb ends. 
		var width = (this.x + this.w) - item.x;
		var height = (this.y + this.h) - item.y;

		// console.log("total is: " + total);
		// console.log("width is: " + width);
		// console.log("height is: " + height);

		return (width * height) / total;

	}

	//case 2
	//urc (via llc of sb) inside of the sb.
	if(!ulc && !llc && urc && !lrc){
		//console.log("case 2");

		var width = (item.x + item.w) - this.x;
		var height = this.h - item.y; 

		return (width * height) / total;

	} 

	//case 3
	//llc (via urc of sb) inside of the sb.
	if(!ulc && llc && !urc && !lrc){
		//console.log("case 3");

		var width = (this.x + this.w) - (item.x + item.w);
		var height = (item.y + item.h) - (this.y - this.h); 

		return (width * height) / total;

	} 

	//case4
	//lrc (via urc of sb) inside of the sb.
	if(!ulc && !llc && !urc && lrc){
		//console.log("case 4");

		var width = (item.x + item.w) - this.x;

		var height = (item.y + item.h) - this.y

		return (width * height) / total;
	}

	//111111111111111111111111111111111111111


	//case5
	//urc and lrc are inside of sb 
	//top of item in sb 
	if(ulc && !llc && urc && !lrc){
		//console.log("case 5");

		var height = (this.y + this.h) - item.y;

		//pw.AddToList("height is: " + height);

		return (item.w * height) / total; 
	}	



	//case6
	//llc and lrc inside sb via top of sb
	//bottom of item in sb 
	if(!ulc && llc && !urc && lrc){
		//console.log("case 6");

		var height = (item.y + item.h) - this.y;

		return (item.w * height) / total;
	}

	
	//case 7
	//both ulc and llc are inside of the sb.
	//left side of item is in sb 
	if(ulc && llc && !urc && !lrc){
		//console.log("case 7");

		var width = (this.x + this.w) - item.x;

		return (width * item.h) / total;

	}

	//case 8
	//right side of item is in sb 
	if(!ulc && !llc && urc && lrc){
		//console.log("case 8");

		var width = (item.x + item.w) - this.x;

		return (width * item.h) / total;

	}

	//333333333333333333333333333333333333333333333333333


	//case 9 (done!)
	//whole square inside
	if(ulc && llc && urc && lrc){
		//console.log("case 9");

		// console.log("item.w is: " + item.w);
		// console.log("item.h is: " + item.h);
		// console.log("total is: " + total);

		return (item.w * item.h) / total;
	}

	return false;

};






















//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_rect

function Stuff_Box(x,y,w,h,color){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;


};

Stuff_Box.prototype.draw = function(){
	//ctx.rect(this.x, this.y, this.w, this.h);

	//ctx.fillStyle = "#FF0000";
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.w, this.h);
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
	//sb == stuff box
	//(ulc of item entered sb via llc)
	if(ulc && !llc && !urc && !lrc){
		console.log("case 1");
		//calc and return case 1

		//have the width and height end where the sb ends. 
		var width = (this.x + this.w) - item.x;
		var height = (this.y + this.h) - item.y;

		console.log("total is: " + total);
		console.log("width is: " + width);
		console.log("height is: " + height);

		return (width * height) / total;

	}

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

	//case 9 (done!)
	//whole square inside
	if(ulc && llc && urc && lrc){
		console.log("case 9");

		console.log("item.w is: " + item.w);
		console.log("item.h is: " + item.h);
		console.log("total is: " + total);

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

		pw.AddToList("height is: " + height);

		return (item.w * height) / total; 
	}	

	return false;

};

Stuff_Box.prototype.contains_point = function(mouse_x,mouse_y) {

	//console.log('here');

	//if the upper left hand x coord is beyond the end of
	//the big square (x being it's starting place, w taking us to the end)
	//then there is no way we are inside 
    if (mouse_x > this.x + this.w) {

    	//console.log("returning false on: (mouse_x > this.x + this.w) ");
        return false;
    }

    //if the upper left hand y coord is lower then the bottom of the big square 
    //(aka the y plus the h, taking us to the bottom) then there is no way that 
    //it is within the square
    if (mouse_y > this.y + this.h) {
    	//console.log("returning false on: (mouse_y > this.y + this.h ");
        return false;
    }

    //if the end of our square (aka our x plus our w) is less than the starter X
    //for the big square, then there is no way we are inside. 
    if (mouse_x < this.x) {
    	//console.log("returning false on: (mouse_x < other.x)");
        return false;
    }

    //if out bottom (aka our y plus h) is less than the upper left hand corner
    //y of the big square, then there is no way that it is inside.  
    if (mouse_y < this.y) {
    	//console.log("returning false on: (mouse_y < other.y) ");
        return false;
    }

    //console.log("returning true!!");
    return true;
};


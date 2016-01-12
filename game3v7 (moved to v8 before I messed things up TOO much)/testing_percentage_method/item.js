

//http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_rect

function Item(x,y,w,h,color){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;


};

Item.prototype.draw = function(){
	//ctx.rect(this.x, this.y, this.w, this.h);

	//ctx.fillStyle = "#FF0000";
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};










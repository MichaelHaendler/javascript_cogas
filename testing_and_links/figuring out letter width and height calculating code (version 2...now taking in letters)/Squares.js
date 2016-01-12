


function sq1(){

	var x = 0;
	var y = 0;
	var color = "red";
	standard_code_segment(x,y,color);

};	 

function sq2(){
 
	var x = 50;
	var y = 0;
	var color = "green";
    standard_code_segment(x,y,color);

};

function sq3(){ 

	var x = 0;
	var y = 50;
	var color = "yellow";
    standard_code_segment(x,y,color);

};

function sq4(){

	var x = 50;
	var y = 50;
	var color = "blue"
	standard_code_segment(x,y,color);

};

function extra_v_sq1(){

	var w = 5;
	var h = 20; 
	var x = 30;
	var y = 20;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};

function extra_h_sq1(){

	var w = 50;
	var h = 10; 
	var x = 35;
	var y = 80;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};

function extra_h_sq2(){

	var w = 50;
	var h = 10; 
	var x = 25;
	var y = 70;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};

function extra_h_sq3(){

	var w = 50;
	var h = 10; 
	var x = 15;
	var y = 60;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};

function v_sq(){

	var w = 10;
	var h = 50; 
	var x = 20;
	var y = 30;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};

function h_sq(){

	var w = 50;
	var h = 10; 
	var x = 35;
	var y = 80;
	var color = "black";
	standard_code_segment(x,y,color,w,h);

};


function standard_code_segment(x,y,color,w,h){

	var tmp_c = document.createElement('canvas');
	tmp_c.width = (w == null) ? 50 : w;
	tmp_c.height = (h == null) ? 50 : h;
	var tmp_ctx = tmp_c.getContext('2d');
	tmp_ctx.rect(0,0,tmp_c.width,tmp_c.height);

	tmp_ctx.fillStyle=color;

	tmp_ctx.fill();

	ctx.drawImage(tmp_c,x,y);

	//return ctx;

};


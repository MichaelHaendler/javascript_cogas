

//test square 1
//urcX is: 120
//120 - 50 is 70
var stuff_box = new Stuff_Box(20,20,100,100,"blue");

var item = new Item(150,30,50,50,"red");


var mainloop = function (){


	myCanvas.width = myCanvas.width;

	ctx.fillStyle="pink";
	ctx.fillRect(0,0,myCanvas.width,myCanvas.height);

	pw.AddToList("mx is: " + mx);
	pw.AddToList("my is: " + my);
	pw.AddToList("mlc is: " + mlc);	

	set_user_inputs();//get keyboard and mouse input from user

	stuff_box.draw();

	item.draw();


	case10_test();





	pw.displayList();
	
};//end of mainloop

//case 9 (done!)
//whole square inside
function case9_test(){

	item.x = 50;

	var num = stuff_box.percentage_filled_by_item(item);

	pw.AddToList("num is: " + num);	


};


//case 10
//llc and lrc inside sb via top of sb
// stuff_box = new Stuff_Box(20,20,100,100,"blue);
function case10_test(){

	item.x = 30;
	item.y = 110;

	var num = stuff_box.percentage_filled_by_item(item);

	pw.AddToList("num is: " + num);	


};

//case 11
//ulc and lrc inside sb via bottom of sb
// stuff_box = new Stuff_Box(20,20,100,100,"blue");

function case11_test(){

	item.x = 50;
	item.x = 50;


	var num = stuff_box.percentage_filled_by_item(item);

	pw.AddToList("num is: " + num);	


};
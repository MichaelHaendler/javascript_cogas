


function set_user_inputs(){

	//c.addEventListener("mousemove", getLoc, false);
	c.addEventListener("mousedown", on_mouse_down, false);
	c.addEventListener("mouseup", on_mouse_up, false);

	//q: why was 'keyboard(e)' bad, but 'keyboard' okay?
	//$(document).keypress(keyboard);
	
	$(document).keydown(keyboard);
	$(document).keyup(clear_g_moved);
	$(document).mousemove(getLoc);
	//g_moved = false;

};//end of set_user_inputs

function getLoc(event)
{
	
	mx = event.clientX;
	my = event.clientY;
	
}


// function getLoc(event)
// {
// 	var that = this;
	
// 	//c is the global variable c, aka the canvas. 
// 	var mousy = getMousePos(c, event);
	
// 	mx = mousy[0];
// 	my = mousy[1];
	
// }

// function getMousePos(canvas, event) {
// 	var rect = canvas.getBoundingClientRect();
// 	return [event.clientX - rect.left , event.clientY - rect.top];
// };

// // function testing(event){
// function testing(event){

// 	// pw.AddToList("event.clientX is: " + event.clientX);
// 	// pw.AddToList("event.clientX is: " + event.clientY);

// };


function on_mouse_down(event){

	if(event.button === 0){
		mlc = true;
	}
	//right
	else if(event.button === 2){
		mrc = true;
	}

}

function on_mouse_up(event){

	if(event.button === 0){
		mlc = false;
	}
	//right
	if(event.button === 2){
		mrc = false;
	}

}

function mouse_values(){
	pw.AddToList("(user_input.js) mx is: " + mx);
	pw.AddToList("(user_input.js) my is: " + my);
	pw.AddToList("(user_input.js) mrc is: " + mrc);
	pw.AddToList("(user_input.js) mlc is: " + mlc);
	pw.AddToList("(user_input.js) ms is: " + ms);
}


  //http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/

  //http://www.asciitable.com/

function keyboard(event){

	//pw.AddToList("KEYBOARD");

	// console.log("event.keyCode is: " + event.keyCode);

	//generally good to have. plus, can use it for stuff like typing to other players.
	g_key = event.keyCode; 


	direction(g_key);


	movement(g_key);

};

function clear_g_moved(){
	g_moved = false;

}


/*
basically, if key is the up, down, left right keys, set as moved. Otherwise, set
as false (ala not moved). Would have kept the 'a,s,w,d' setup...but I will do that 
later once I have worked with scope of mouse, and typing input
*/
function movement(input){
	if(g_key == 37 || g_key == 38 || g_key == 39 || g_key == 40){
		g_moved = true;
	}
	// else{
	// 	g_moved = false;
	// }

}


//0 left
//1 up
//2 right
//3 down
function direction(input){


  switch (input) {

    case 37: // Left
      g_direction = 1;
      //g_direction = 0;
    break;

    case 38: // Up
      // console.log("W");
      g_direction = 3;
      //g_direction = 1;
    break;

    case 39: // Right
      // console.log("D");
      g_direction = 2;
    break;

    case 40: // Down
      // console.log("S");
      g_direction = 0;
      //g_direction = 3;
    break;
  }


};

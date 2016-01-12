//this exist because things like canvas will often have to be called by the various classes. 

//...also, the current state of the canvas will have to be shared at times. 

//I feel that by making at least the canvas global, that it'll simplify both the sharing AND the
//modifying of the current canvas easier. 

var c = document.getElementById("myCanvas"); // c == canvas
var ctx = c.getContext("2d");//ctx == context (aka the current version of the canvas...I think)kk

//mouse x and mouse y
var mx = -10;
var my = -10;

var old_mx = -10;
var old_my = -10;

//mouse right click and mouse left click
var mrc = false;
var mlc = false;

//mouse scroll (not sure about this one)
var ms = -1;

var g_key = -1; //key that was last hit. 

var g_direction = 0;//go up, down, left, right. 

var g_moved = false;//whether or not you moved. 

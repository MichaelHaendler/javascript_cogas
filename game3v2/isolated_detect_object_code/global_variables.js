//this exist because things like canvas will often have to be called by the various classes. 

//...also, the current state of the canvas will have to be shared at times. 

//I feel that by making at least the canvas global, that it'll simplify both the sharing AND the
//modifying of the current canvas easier. 

var c = document.getElementById("myCanvas"); // c == canvas
var ctx = c.getContext("2d");//ctx == context (aka the current version of the canvas...I think)

//mouse x and mouse y
var mx = -10;
var my = -10;

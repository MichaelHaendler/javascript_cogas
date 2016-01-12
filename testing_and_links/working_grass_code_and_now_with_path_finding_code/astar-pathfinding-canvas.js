

//console.log("zonkees");

createWorld();


//100,140 start
//240,120 end
// fill the world with walls
function createWorld()
{

	pathStart = [4,2];
	pathEnd = [9,2];

	console.log("pathStart is: " + pathStart);
	console.log("pathEnd is: " + pathEnd);
	//console.log('Creating world...');
	//console.log("howdy. :-)");
	

	//fill_th_instance_with_stuff();

	// calculate initial possible path
	// note: unlikely but possible to never find one...
	currentPath = [];
	while (currentPath.length == 0)
	{

		//console.log("got into here?")
		// pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
		// pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];

		// pathStart = [6,6];
		// pathEnd = [12,6];

		// console.log("pathStart is: " + pathStart);
		// console.log("pathEnd is: " + pathEnd);

		world = th.get_ascii_map();
		//world = th.get_array();

		if (world[pathStart[0]][pathStart[1]] != 0 || world[pathEnd[0]][pathEnd[1]] != 0){break;}

		console.log("getting here?")

		currentPath = findPath(world,pathStart,pathEnd);
		console.log("how about here?");
		this.write_current_path(currentPath);
		ascii_map_show_path(world,currentPath,pathStart,pathEnd);
		//console.log(currentPath);
		//break;
	}
	redraw();
	//console.log("finishing redraw?");

}

function write_current_path(currentPath){

	console.log("current path is: ");

	console.log("[");

	for(var i = 0; i < currentPath.length; i++){

		var tmp_array = currentPath[i];

		var check = (i == currentPath.length -1) ? "]" : "],";

		console.log("[" + tmp_array + check);

	}

	console.log("];");

};

function ascii_map_show_path(world,currentPath,pathStart,pathEnd){

	//console.log("here 0");

	var path_symbol = 3;
	var start_symbol = 2;
	var end_symbol = 4;

	//console.log(currentPath);

	//fill it in with path 
	for(var i = 0; i < currentPath.length; i++){
		var tmp_array = currentPath[i];
		var tmp_x = tmp_array[0];
		var tmp_y = tmp_array[1];
		world[tmp_x][tmp_y] = path_symbol;

	}

	//mark start and end special 
	world[pathStart[0]][pathStart[1]] = start_symbol;
	world[pathEnd[0]][pathEnd[1]] = end_symbol;

	var tmp_string = '\n' + "[" + '\n';

	for(var x = 0; x < world.length; x++){


		tmp_string += "[";

		for(var y = 0; y < world[x].length; y++){

			//check 1
			var c1 = (y == world[x].length -1) ? "" : ",";

			var symbol = (world[y][x] == null) ? 'n' : world[y][x];

			//tmp_string += world[y][x] + c1;

			tmp_string += symbol + c1;

		}

		//check 2
		var c2 = (x == world.length -1) ? "]" : "],";

		tmp_string += c2 + '\n';
		
	}

	tmp_string += "];";

	console.log(tmp_string);

};


// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd)
{
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy is you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	var maxWalkableTileNum = 0;

	// keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
	// it must have equal height and width. If your game world is rectangular, 
	// just fill the array with dummy values to pad the empty space.
	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){}; // empty

	// diagonals allowed but no sqeezing through cracks:
	// var distanceFunction = DiagonalDistance;
	// var findNeighbours = DiagonalNeighbours;

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal)
	{	// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{

		console.log("BEGIN CALCULATING PATH!");


		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{

				console.log("1 iteration: " + i + " | Open[i].f was " + Open[i].f);

				if(Open[i].f < max)
				{
					console.log("got in");
					console.log("Open[i] location is: " + [Open[i].x,Open[i].y]);
					console.log("Open[i].f ("+ Open[i].f +") < max (" + max +")");
					//console.log("max was: " + max);

					max = Open[i].f;
					min = i;

					console.log("max is now: " + max);
					console.log("min is now: " + min);

				}
			}

			console.log("out of for loop. now splicing Open.");

			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];

			console.log("myNode (the one selected) is: ");
			print_myNode(myNode);

			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{

				console.log("this myNode was...A DESTINATION!!!!! WOOHOO!!");

				myPath = Closed[Closed.push(myNode) - 1];

				console.log("first myPath is: ");
				print_myNode(myPath);

				do
				{

					console.log("myPath NOW is: ");
					print_myNode(myPath);

					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);

				// clear the working arrays
				AStar = Closed = Open = [];
				
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{

				console.log("not a destination node");

				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);

				console.log("neighbors around myNode are:");
				print_myNeighbors(myNeighbours);

				// test each one that hasn't been tried already
				//iterating through recently found nodes, assigning them their
				//g and f values, and then putting them into Open in order to 
				//possibly test them and find a path to the end point. Note that
				//not all of them will be tested. The ones that end up still on
				//the stack would probably be tested when/if they are possibly a 
				//better route. 
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{

					console.log("2 iteration: " + i);

					myPath = Node(myNode, myNeighbours[i]);

					//console.log("newly selected yPath location is: " + [myPath.x,myPath.y]);
					console.log("myPath is: ");
					print_myNode(myPath);

					if (!AStar[myPath.value])
					{

						console.log("AStar[myPath.value] had been false. (haven't see this)");
						// console.log("AStar[myPath.value] value is: " + AStar[myPath.value]);
						// console.log("!AStar[myPath.value] value is: " + (!AStar[myPath.value]));

						//distance function results
						var dfr1 = distanceFunction(myNeighbours[i], myNode);

						// estimated cost of this particular route so far
						myPath.g = myNode.g + dfr1;

						console.log("myNode loc is: " + [myNode.x,myNode.y]);

						console.log("myNeighbours[i] loc is: " + [myNeighbours[i].x,myNeighbours[i].y]);

						// console.log("myNode.g is: " + myNode.g);

						// console.log("dfr1 is: " + dfr1);

						console.log("myPath.g (myNode.g + dfr1) is now: " + myPath.g);

						var dfr2 = distanceFunction(myNeighbours[i], mypathEnd);

						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + dfr2;

						console.log("dfr2 is: " + dfr2);

						console.log("myPath.f (myPath.g + dfr2) is now: " + myPath.f);

						console.log("inserting myPath node into Open, and (possibly later on) will check all nodes around it.");
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
					else{
						console.log("AStar[myPath.value] was in fact true. Meaning we've been here before.");
						console.log("AStar[myPath.value] value was: " + AStar[myPath.value]);
					}

					console.log("////");
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}

			console.log("Open.length is: " + Open.length);
			console.log("Open currently contains the following nodes: ");
			print_myNodes(Open);
			console.log("-------------------------------------------------");
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

}; // end of findPath() function


// Parent:Parent,
// // array index of this Node in the world linear array
// value:Point.x + (Point.y * worldWidth),
// // the location coordinates of this Node
// x:Point.x,
// y:Point.y,
// // the heuristic estimated cost
// // of an entire path using this node
// f:0,
// // the distanceFunction cost to get
// // from the starting point to this node
// g:0

function print_myNodes(myNodes){

	console.log("start of print_myNodes");

	var length = myNodes.length;

	for(var i = 0; i < length; i++){
		var tmp_node = myNodes[i];
		print_myNode(tmp_node);
	}

	console.log("end of print_myNodes");

}

function print_myNode(myNode){

	console.log("node: " + [myNode.x,myNode.y]);

	// if(myNode.x == 8 && myNode.y ==6){

	// 	var test1 = myNode.parent instanceof Object;
	// 	var test2 = myNode.parent == null;

	// 	var blah = myNode.parent;

	// 	console.log("test1 is: " + test1);
	// 	console.log("test2 is: " + test2);
	// 	//console.log("myNode.parent.x is: " + blah.x);
	// 	debugger;

	// }

	if(myNode.Parent instanceof Object){
		console.log("parent is: " + [myNode.Parent.x,myNode.Parent.y]);
		//debugger;
	}
	else{
		console.log("parent is null");
	}

	console.log("f is: " + myNode.f);
	console.log("g is: " + myNode.g);

};

function print_myNeighbors(neighbor_results){

	console.log("myNeighbours.length is: " + neighbor_results.length);

	var length = neighbor_results.length;

	for(var i = 0; i < length; i++){
		var tmp_hash = neighbor_results[i];

		console.log("neighbor: " + [tmp_hash.x,tmp_hash.y]);
	}

	//console.log("end of print_myNeighbors");

};



function redraw()
{
	//if (!spritesheetLoaded) return;

	//pw.print("should be seeing this...but I bet that I'm not");

	spritesheet = document.getElementById("grass_and_rocks_canvas");

	//console.log('redrawing...');

	var spriteNum = 0;

	// clear the screen
	// ctx.fillStyle = '#000000';
	// ctx.fillRect(0, 0, canvas.width, canvas.height);

	var worldWidth = th.get_worldWidth();

	var worldHeight = th.get_worldHeight();

	var tileWidth = th.get_tileWidth();

	var tileHeight = th.get_tileHeight();

	for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < th.get_worldHeight; y++)
		{

			// choose a sprite to draw
			switch(world[x][y])
			{
			case 1:
				spriteNum = 1;
				break;
			default:
				spriteNum = 0;
				break;
			}

			// draw it
			// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(spritesheet,
			spriteNum*tileWidth, 0,
			tileWidth, tileHeight,
			x*tileWidth, y*tileHeight,
			tileWidth, tileHeight);

		}
	}

	// draw the path
	//console.log('Current path length: '+currentPath.length);
	for (rp=0; rp<currentPath.length; rp++)
	{
		switch(rp)
		{
		case 0:
			spriteNum = 2; // start
			break;
		case currentPath.length-1:
			spriteNum = 3; // end
			break;
		default:
			spriteNum = 4; // path node
			break;
		}

		ctx.drawImage(spritesheet,
		spriteNum*tileWidth, 0,
		tileWidth, tileHeight,
		currentPath[rp][0]*tileWidth,
		currentPath[rp][1]*tileHeight,
		tileWidth, tileHeight);
	}		
};
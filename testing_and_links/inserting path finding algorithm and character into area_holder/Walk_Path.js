
//only reason I am making this a class is because
//having it as a class will make it easier to deal with
//when you have the char_loc, but not the new_loc
function Walk_Path(){

	//x,y,z value
	this.char_loc = [];

	//new loc for character. x,y,z values
	//note: need z due to different layers
	this.new_loc = [];

}

Walk_Path.prototype.set_char_loc = function(char_loc){

	this.char_loc = char_loc;

};

//dont need because as soon as it's clicked the character
//should walk there. 
// Walk_Path.prototype.set_new_loc = function(new_loc){

// 	this.new_loc = new_loc;

// };

Walk_Path.prototype.get_path = function(new_loc,char_base,td_ascii_map){

	//needs to have x,y, and z values. 
	if(this.char_loc.length != 3 || this.new_loc.length != 3){
		return [];
	}
	else{
		return this.calculate_path(new_loc,char_base,td_ascii_map);
	}
}

//stick to something simple...then later move on to making it work with
//the proper shortest path code, and then from there, making said shortest
//path code work with the 3d area. 

//new_loc is where we're going
//char_base is the base of the person in question (included since they might vary)
//td_ascii_map is there because we need a map of the area in question
Walk_Path.prototype.calculate_path = function(new_loc,char_base,td_ascii_map){

	//var path = []
	// var new_z = new_loc[0];
	// var new_x = new_loc[1];
	// var new_y = new_loc[2];

	var two_d_map = td_ascii_map[0];

	var start_path = [char_base[1],char_base[2]];

	var end_path = [new_loc[1],new_loc[2]];

	if (two_d_map[start_path[0]][start_path[1]] != 0 || 
		two_d_map[end_path[0]][end_path[1]] != 0){
		break;
	}
	else{
		return findPath(two_d_map,start_path,end_path);
	}


	

};

// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd){

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

		//console.log("BEGIN CALCULATING PATH!");


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

			//console.log("out of for loop. now splicing Open.");

			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];

			//console.log("myNode (the one selected) is: ");
			//print_myNode(myNode);

			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{

				//console.log("this myNode was...A DESTINATION!!!!! WOOHOO!!");

				myPath = Closed[Closed.push(myNode) - 1];

				// console.log("first myPath is: ");
				// print_myNode(myPath);

				do
				{

					// console.log("myPath NOW is: ");
					// print_myNode(myPath);

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

				//console.log("not a destination node");

				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);

				// console.log("neighbors around myNode are:");
				// print_myNeighbors(myNeighbours);

				// test each one that hasn't been tried already
				//iterating through recently found nodes, assigning them their
				//g and f values, and then putting them into Open in order to 
				//possibly test them and find a path to the end point. Note that
				//not all of them will be tested. The ones that end up still on
				//the stack would probably be tested when/if they are possibly a 
				//better route. 
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{

					//console.log("2 iteration: " + i);

					myPath = Node(myNode, myNeighbours[i]);

					//console.log("newly selected yPath location is: " + [myPath.x,myPath.y]);
					// console.log("myPath is: ");
					// print_myNode(myPath);

					if (!AStar[myPath.value])
					{

						//console.log("AStar[myPath.value] had been false. (haven't see this)");
						// console.log("AStar[myPath.value] value is: " + AStar[myPath.value]);
						// console.log("!AStar[myPath.value] value is: " + (!AStar[myPath.value]));

						//distance function results
						var dfr1 = distanceFunction(myNeighbours[i], myNode);

						// estimated cost of this particular route so far
						myPath.g = myNode.g + dfr1;

						//console.log("myNode loc is: " + [myNode.x,myNode.y]);

						//console.log("myNeighbours[i] loc is: " + [myNeighbours[i].x,myNeighbours[i].y]);

						// console.log("myNode.g is: " + myNode.g);

						// console.log("dfr1 is: " + dfr1);

						//console.log("myPath.g (myNode.g + dfr1) is now: " + myPath.g);

						var dfr2 = distanceFunction(myNeighbours[i], mypathEnd);

						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + dfr2;

						//console.log("dfr2 is: " + dfr2);

						//console.log("myPath.f (myPath.g + dfr2) is now: " + myPath.f);

						//console.log("inserting myPath node into Open, and (possibly later on) will check all nodes around it.");
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
					// else{
					// 	console.log("AStar[myPath.value] was in fact true. Meaning we've been here before.");
					// 	console.log("AStar[myPath.value] value was: " + AStar[myPath.value]);
					// }

					// console.log("////");
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}

			// console.log("Open.length is: " + Open.length);
			// console.log("Open currently contains the following nodes: ");
			// print_myNodes(Open);
			// console.log("-------------------------------------------------");
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

}; // end of findPath() function

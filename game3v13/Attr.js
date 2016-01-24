
//http://stackoverflow.com/questions/4246980/how-to-create-a-simple-map-using-javascript-jquery

function Attr(){

	this.map = {};
	this.map['health'] = 0;
	this.map['big_guns'] = 0;
	this.map['small_guns'] = 0;
	this.map['melee_combat'] = 0;
	this.map['lock_picking'] = 0;
	this.map['stealth'] = 0;
	this.map['repair'] = 0;
	this.map['genetic_research'] = 0;


};

Attr.prototype.increment_stat = function(name,amount){

	if(this.map[name] != null){

		var add_to = (amount != null) ? amount : 1;

		//make it so that 100 is the max amount for any stat. 
		if(this.map[name] + add_to > 100){
			this.map[name] = 100; 
		}
		else{
			this.map[name] += add_to;
		}

	}

};

Attr.prototype.decrement_stat = function(name,amount){

	if(this.map[name] != null){

		var sub_from = (amount != null) ? amount : 1;

		if(this.map[name] - sub_from < 0){
			this.map[name] = 0; 
		}
		else{
			this.map[name] -= sub_from;
		}

	}

};

//probably not needed, but I added it for kicks and giggles anyway. 
Attr.prototype.add_attr = function(name,amount){

	var set_amount = (amount != null) ? amount : 0;

	this.map[name] = set_amount;

};




// var map = new Object(); // or var map = {};
// map[myKey1] = myObj1;
// map[myKey2] = myObj2;

// function get(k) {
//     return map[k];
// }


function Area_Holder(){

	//z (aka up and down) dimension. for holding all of the
	//terrain layers
	this.z = [];

};

Area_Holder.prototype.create_layer = function(){


};

//inserts layers that weren't (or couldn't be) properly filled in. 
Area_Holder.prototype.fill_in_layers = function(){


};


/*
how will this work? 

you will need to go through Area_Holder to build everything. 

so a person adds nothing more than a layer with grass and a rock. 

the rock in this particular case is 3 layers tall. 

//there will also be a person. 

the person is 4 layers tall.

the user would add that first layer, then the rock. all at the same layer 

(note: would be good if I could add the rock before or after I add the grass, 
and, due to the rock being higher, that it shows up above the grass. maybe I will
just make a method called something like 'base layer' for the gass, and then add
everything else afterwards with some other method)

needs to be a variable in ts called something like z_count which is the hight
(in layers) of that particular thing. 

so the grass would all have z_count of 0 (no height)

the rock would have a z_count of 3

the person would have a z_count of 4. 

the method fill_in_layers() would be called after the content creator created
everything. 

actually, no. 

inserts rock 

rock is given z_count of 3 

all 3 layers are made right then. with the proper 1s put into place. 

same with character. character is inserted. all 4 layers then need to be there. 
if rock was already inserted, then only add 1 additional layer. 

----------------------

need to implement walking so that the character is always in 1 tb (or w/e)

need to use print_2d_array to make sure that the terrain layer is being made properly. 

need to also ...(sighs) a lot of stuff

that direct check to see if there is a line of sight 


*/


function XO_Game(){

	this.board = [
	[null,null,null],
	[null,null,null],
	[null,null,null]
	];

	this.x = 'X';
	this.o = 'O';

	this.us = this.o;

	this.my_hash_table = [];

};

XO_Game.prototype.input = function(x,y,letter){

	this.board[x][y] = letter;
};

XO_Game.prototype.next_move = function(){

	var lose_across = two_across(this.x);
	var lose_diag = two_across(this.x);

	var win_across = two_across(this.o);
	var win_diag = two_across(this.o);

	//if there are currently two ways for the user to win..
	if(lose_across && lose_diag){

		next_move_helper_1()

	}
	//if there's one way for the user to win
	else if (lose_across || lose_diag){

	}
	//if there's no way for the user to win. 
	else{

	}



};

XO_Game.prototype.next_move_helper_1 = function(){

	//if computer can win across
	if(win_across){

	}
	//if computer can win diagonally
	else if(win_diag){

	}
	//if computer cant win at all 
	else{

	}

};


XO_Game.prototype.get_next_move = function(current_move){


};

XO_Game.prototype.build_all_possibilities = function(){

	var board = [
	['-','-','-'],
	['-','-','-'],
	['-','-','-']
	];

	var hash_table = [];

	var start_letter = 'X';

	var start_loc_x = 0;
	var start_loc_y = 0;

	var count = 0;

	this.my_hash_table = tree_run(board,hash_table,start_letter,count);



};

XO_Game.prototype.tree_run = function(board,hash_table,letter,count){

	var switch_letter = (letter == 'X') ? 'O' : 'X';

	for(var x = 0; x < 3; x++){

		for(var x = 0; x < 3; x++){

			board[x][y] = switch_letter;

			var tmp_string = board.to_string();

			hash_table[tmp_string] = 

			board[x][y] = '-';
		
		}	
	}


	return tree_run(board,hash_table,switch_letter,count++);

};


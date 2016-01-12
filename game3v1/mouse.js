

      function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };

		$( document ).on( "mousemove", function( event ) {

			
		  $( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
		});
      }



      function set_user_inputs(){

      	//http://api.jquery.com/event.pagex/
      	$( document ).on( "mousemove", function( event ) {


      	}

      }


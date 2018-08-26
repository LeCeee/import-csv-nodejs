$(function(){
   
    /** Click on Fetch data and display in HTML table **/

    $("#fetchdata").on('click', function(){

        $.get( "/fetchdata", function( data ) {

            var inputs = data['data'];

            $("#trdata").html('');

            $("#message").hide();

            var string = '';

            $.each(inputs, function(index, input ) {

                string += '<tr><td>'+(index+1)+'</td><td>'+input['_id']+'</td><td>'+input['result']+'</td></tr>';

            });

            $("#trdata").html(string);

        });
    });
 
    /** Import data after click on a button */

    $("#importdata").on('click', function(){

        $.get( "/import", function( data ) {

            $("#message").show().html(data['success']);

        });

    });

});
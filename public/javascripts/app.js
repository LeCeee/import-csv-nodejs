$(function(){
   
    /** Click on Fetch data and display in HTML table **/

    $("#fetchdata").on('click', function(){

        $.get( "/fetchdata", function( data ) {

            var inputs = data['data'];

            $("#trdata").html('');

            $("#message").hide();

            var string = '';

            $.each(inputs, function(index, input ) {

                string += '<tr><td>'+(index+1)+'</td><td>'+input['_id']+'</td><td>'+input['trans_id']+'</td><td>'+input['TransactionTime']+'</td><td>'+input['Class']+'</td><td>'+input['MerchantCategoryCode']+'</td><td>'+input['Transactionstatus']+'</td><td>'+input['TransactionPlace']+'</td><td>'+input['TransactionType']+'</td><td>'+input['customeridentification']+'</td><td>'+input['BANK']+'</td></tr>';
//                                                                          trans_id,Class,MerchantCategoryCode,TransactionTime,Transactionstatus,TransactionPlace,TransactionType,customeridentification,BANK

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
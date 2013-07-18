(function extract() {
    var extract = {};
    var error = false;

    //$('.expression-input').keyup(function(i, h) {

    extract.onKeyup = function(i,h){
        {
            try {
                console.log(i.target.value);
                var regexp = new RegExp('(' + i.target.value + ')', 'g');
            }
            catch (e) {

                if (!error) {
                    $(i.target).removeClass('valid-entry').addClass('invalid-entry');
                    error = true;
                }

                return;
            }
            finally {}
        }

        if (error) {
            $(i.target).removeClass('valid-entry').addClass('valid-entry');
            error = false;
        }

        $('.unstructured-line').html(function(i, e) {

            var match = true;
            while (match && (match = regexp.exec($('<div>' + e + '</div>').text()))) {

                if (match[0] === '') {
                    match = null;
                }
            }
        });

        $('.unstructured-line').html(function(i, e) {
            return $('<div>' + e + '</div>').text().replace(regexp, '<selection>$1</selection>');
        });
    }; 
    
    extract.onRun = function() {  
     
        if ($('#regexp').hasClass("valid-entry")) {
            
            //  $('#run').addClass("loading");
            //  $('#run').text('');
              $('#regexp').attr('readonly', true);
              console.log($('#regexp').val());
              if ($('#regexp').val() == '\\w+:(\\w+)') alert('Counting the different activity sequences');
              else alert('this demonstration only works for the regular expression \\w+:(\\w+)');
            
            $('#result').removeClass('hidden');

           // $('#run').removeClass("loading");
           // $('#run').text('Run');
            $('#regexp').attr('readonly', false);
              /* not for production purposes
              $.post("structure/run", { regexp: $('#regexp').val() })
                    .done(function(data) { alert(data) })
                    .fail(function(data) { alert("Error") })
                    .always(function() {
                        $('#run').removeClass("loading");
                        $('#run').text('Run');
                        $('#regexp').attr('readonly', false);
                    });
              */
        }
        else alert($('#regexp').val() + ' is no valid regular expression !');;
      
    };
    
    
    $(document).on("keyup", "#regexp", extract.onKeyup); 
    $(document).on("click", "#run", extract.onRun);
    

    
    window.setTimeout(function(){
        $('#regexp').val('\\w').keyup();
         window.setTimeout(function(){
             $('#regexp').val('\\w+').keyup();            
             window.setTimeout(function(){
                $('#regexp').val('\\w+:').keyup();
                    window.setTimeout(function(){
                        $('#regexp').val('\\w+:(\\w)').keyup();
                        window.setTimeout(function(){
                            $('#regexp').val('\\w+:(\\w+)').keyup();     
                        },500)
                },500)
            },500)
         },500)
    },500)
         /*       .val('\\w+').keyup().delay(10000)
                .val('\\w+:').keyup().delay(10000)
                .val('\\w+:(\\w)').keyup().delay(10000)
                .val('\\w+:(\\w+)').keyup().delay(10000); */
 //   $('#regexp')
//    $('#regexp').val('\\w+');
//    $('#regexp').keyup();
//    $('#regexp')
//    $('#regexp').keyup();
//    $('#regexp').val('\\w+:(\\w)');
//    $('#regexp').keyup();
//    $('#regexp').val('\\w+:(\\w+)');
//    $('#regexp').keyup();
   // });
    return extract;
})();
function structure() {
    var structure = {};
    var error = false;

    //$('.expression-input').keyup(function(i, h) {
    
    structure.onKeyup = function(i,h){
        {
            try {
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
    
   // });
    return structure;
}
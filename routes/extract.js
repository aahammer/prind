/*
 * GET home page.
 */


exports.extract = function(req, res) {

    if (req.params.task == 'run') {
     /*   console.log("hollo");
        var net = require('net');
        var HOST = '127.6.236.129';
        var PORT = 17000;

        var client = new net.Socket();
        client.connect(PORT, HOST, function() {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            client.write('Hello sucker');
        });

        client.on('data', function(data) {
            console.log('DATA: ' + data);
            res.send(data);
            client.destroy();
        });

        client.on('close', function() {
            console.log('Connection closed');
        });
        */
    
    }
    else {
      res.render('extract/'+req.params.topic, { page:'extract', topic:req.params.topic, title: 'PRINDS Extract' , subtitle: 'Collect process data from a unstructured source'});  
    }
};
 
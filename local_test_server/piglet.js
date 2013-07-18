var net = require('net');
var spawn = require('child_process').spawn

var HOST = process.env.IP;
var PORT = 17000;

function command(folder){
var ls    = spawn('ls', [folder]);
    ls.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });
    
    ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    
    ls.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });
}

net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        
        command(data);
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
       
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

 console.log('Server listening on ' + HOST +':'+ PORT);
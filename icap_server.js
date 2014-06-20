/*-----------------------------------------------------------------------------
 **
 ** - icapjs -
 **
 ** Copyright 2014 by 
 ** SwordLord - the coding crew - http://www.swordlord.com
 ** and contributing authors
 **
 ** This program is free software; you can redistribute it and/or modify it
 ** under the terms of the GNU General Public License as published by the Free
 ** Software Foundation, either version 3 of the License, or (at your option)
 ** any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 ** more details.
 **
 ** You should have received a copy of the GNU General Public License along
 ** with this program. If not, see <http://www.gnu.org/licenses/>.
 **
 **-----------------------------------------------------------------------------
 **
 ** Original Authors:
 ** LordEidi@swordlord.com
 **
 ** $Id:
 **
-----------------------------------------------------------------------------*/

var net = require('net');

var log4js = require('log4js');
var logger = log4js.getLogger();

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('attacks.log'), 'attacks');

// Callback method executed when a new TCP socket is opened.
function newSocket(socket) 
{
    	// We have a connection - a socket object is assigned to the connection automatically
    	console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
    
    	// Add a 'data' event handler to this instance of socket
    	socket.on('data', function(data) 
	{        
	        console.log('ADDRESS ' + socket.remoteAddress);

		data = data.toString();

		var logger = log4js.getLogger('attacks');

		if(data.lastIndexOf('OPTIONS', 0) === 0)
		{
			console.log('OPTIONS');
	                logger.info(data);
			handleOptions(data, socket);
		}
		else if(data.lastIndexOf('REQMOD', 0) === 0)
                {
                        console.log('REQMOD');
	                logger.info(data);
			handleReqmod(data, socket);
                }
		else if(data.lastIndexOf('RESPMOD', 0) === 0)
                {
                        console.log('RESPMOD');
	                logger.info(data);
			handleRespmod(data, socket);
                }
		else
                {
			console.log('DATASTREAM');
			logger.info(data);
                }
    	});
    
 	// Add a 'close' event handler to this instance of socket
    	socket.on('close', function(data) 
	{
        	console.log('CLOSED CONNECTION');
   	});
}

function handleOptions(data, socket)
{
	var moment = require('moment');
	var logger = log4js.getLogger('attacks');

	// Write the data back to the socket, the client will receive it as data from the server
        socket.write('ICAP/1.0 200 OK\r\n');
	logger.info('ICAP/1.0 200 OK');

        var date = moment().subtract('h', 1).format('ddd, DD MMM gggg  HH:mm:ss') + ' GMT';
        socket.write('Date: ' + date + '\r\n');
        //console.log(date); // Mon, 10 Jan 2000  09:55:21 GMT

        socket.write('Encapsulated: null-body=0\r\n');
        socket.write('ISTag: "\"001-000-000001\""\r\n');
        socket.write('Max-Connections: 1000\r\n');
        socket.write('Methods: REQMOD, RESPMOD, OPTIONS\r\n');
        socket.write('Options-TTL: 300\r\n');
        socket.write('Allow: 204\r\n');
        // MAY BE SENT: request["Preview"] = "30"
        socket.write('Service: Attack Services\r\n');
        socket.write('Service-ID: Attack Services\r\n');
        // MAY BE SENT request["Transfer-Preview"] = "*"
        socket.write('\r\n');
        socket.write('\r\n');
}

function handleReqmod(data, socket)
{
	var moment = require('moment');

	// Write the data back to the socket, the client will receive it as data from the server
        socket.write('ICAP/1.0 204 No Content\r\n');
        logger.info('ICAP/1.0 204 No Content');

        var date = moment().subtract('h', 1).format('ddd, DD MMM gggg  HH:mm:ss') + ' GMT';
        socket.write('Date: ' + date + '\r\n');
        //console.log(date); // Mon, 10 Jan 2000  09:55:21 GMT

        socket.write('Encapsulated: null-body=0\r\n');
        socket.write('ISTag: "\"001-000-000001\""\r\n');
        socket.write('Connection: close\r\n');
        socket.write('Server: Attack Services\r\n');
        socket.write('\r\n');
        socket.write('\r\n');
}

function handleRespmod(data, socket)
{
        var moment = require('moment');

        // Write the data back to the socket, the client will receive it as data from the server
        socket.write('ICAP/1.0 204 No Content\r\n');
        logger.info('ICAP/1.0 204 No Content');

        var date = moment().subtract('h', 1).format('ddd, DD MMM gggg  HH:mm:ss') + ' GMT';
        socket.write('Date: ' + date + '\r\n');
        //console.log(date); // Mon, 10 Jan 2000  09:55:21 GMT

        socket.write('Encapsulated: null-body=0\r\n');
        socket.write('ISTag: "\"001-000-000001\""\r\n');
        socket.write('Connection: close\r\n');
        socket.write('Server: Attack Services\r\n');
        socket.write('\r\n');
        socket.write('\r\n');
}

// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log("uncaught: " + err);
});
 
// Listen on port 1344
console.log('ICAP service running on port 1344');
server.listen(1344);

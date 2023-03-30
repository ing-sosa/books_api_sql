var db_gateway = require('./db_gateway.js');
var http_requests = require('./http_requests.js');
var books = require('./books.js');
var authors = require('./authors.js');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	var dg = new db_gateway();
	var httpRequest = new http_requests(req);
	var book = new books(dg);
	var author = new authors(dg);
	var payload = '';
	req.on('data', function (data) {
		payload += data;
	});

	req.on('end', function () {
		function callBack(err, result) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			var response = {};
			if (err) {
				response['error'] = err.message;
			} else {
				response['data'] = result;
			}
			res.write(JSON.stringify(response, null, 4));
			res.end();
		}

		resourceId = httpRequest.resourceId;

		const endpoint = req.url.split('/')[1];
		if (endpoint === 'books')
			switch (req.method) {
				case 'POST':
					jsonData = JSON.parse(payload);
					book.insertRecord(jsonData, callBack);
					break;

				case 'PUT':
					jsonData = JSON.parse(payload);
					book.updateRecord(resourceId, jsonData, callBack);
					break;

				case 'DELETE':
					book.deleteRecord(resourceId, callBack);
					break;

				case 'GET':
					book.getRecords(resourceId, callBack);
					break;
			}
		else if (endpoint === 'authors')
			switch (req.method) {
				case 'POST':
					jsonData = JSON.parse(payload);
					author.insertRecord(jsonData, callBack);
					break;

				case 'PUT':
					jsonData = JSON.parse(payload);
					author.updateRecord(resourceId, jsonData, callBack);
					break;

				case 'DELETE':
					author.deleteRecord(resourceId, callBack);
					break;

				case 'GET':
					author.getRecords(resourceId, callBack);
					break;
			}
		else {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			var response = {};
			response['url'] = req.url;
			response['error'] = 'Endpoint not found';
			res.write(JSON.stringify(response, null, 4));
			res.end();
		}
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

const http = require('http');
const PORT = process.env.PORT || 3000;

/**
 * Прозрачная гифка 1px на 1px
 */
const imgBuffer = new Buffer(
	'47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b',
	'hex'
);

let text = 'First row.';

const server = http.createServer((req, res) => {
	const urlPath = req.url.substr(1, 9);
	// console.log(`urlPath = ${urlPath}`);

	if (urlPath === 'image.gif') {
		text += `\n ${new Date()}: request was done with url ${req.url}`;
		res.writeHead(200, {'Content-Type': 'image/gif'});
		res.end(imgBuffer, 'binary');
	}
	res.end(text);
});

server.listen(PORT, err => {
  if (err) {
    console.log(err.message);
  }
});

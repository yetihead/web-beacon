const http = require('http');
const PORT = process.env.PORT || 3000;
const fs = require('fs');

const fileName = 'logs.txt';

/**
 * Прозрачная гифка 1px на 1px
 */
const imgBuffer = new Buffer(
	'47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b',
	'hex'
);

const server = http.createServer((req, res) => {
	let text = fs.readFileSync(fileName);

	const urlPath = req.url.substr(1, 9);
	// console.log(`urlPath = ${urlPath}`);

	if (urlPath === 'image.gif') {
		let {cookie} = req.headers;

		text += `\n ${new Date()}: request was done with url ${req.url}`
			+ `\n coolies = ${cookie || 'none'} \n`;
		res.writeHead(200, {'Content-Type': 'image/gif'});
		res.end(imgBuffer, 'binary');
		fs.writeFileSync(fileName, text);
		return;
	}

	if (req.url === '/clean') {
		fs.writeFileSync(fileName, '\n');
	}

	res.end(text);
});

server.listen(PORT, err => {
  if (err) {
    console.log(err.message);
  }
});

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

/**
 * Прозрачная гифка 1px на 1px
 */
const imgBuffer = new Buffer(
	'47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b',
	'hex'
);

const fileName = 'requests.log';

const server = http.createServer((req, res) => {
	const file = fs.readFileSync(fileName, 'utf-8');
	if (req.url === '/image.gif') {
		return fs.writeFile(fileName, `${file} \n ${new Date()}: request was done`, () => {
			res.writeHead(200, {'Content-Type': 'image/gif'});
			res.end(imgBuffer, 'binary');
		});
	}
	res.end(file);
});

server.listen(PORT, err => {
  if (err) {
    console.log(err.message);
  }
});

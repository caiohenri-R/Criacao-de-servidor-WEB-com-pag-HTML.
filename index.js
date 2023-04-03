const http = require('http');
const fs = require('fs');
const readLine = require('readline');
const porta = 443;

const servidor = http.createServer((req, res) => {
  fs.readFile('pagina.html', (err, arquivo) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Erro interno do servidor');
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(arquivo);
    const txt = 'arquivo.txt';
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.';
    fs.appendFile(txt, lorem, (err) => {
      if (err) throw err;
      console.log('Arquivo criado');
    });
    readFileByLine('texte.txt');
    res.end();
  });
});

async function readFileByLine(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    console.log(line);
  }
}

servidor.listen(porta, () => { console.log('Servidor Rodando'); });

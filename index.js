import http from 'http';

const job = {
    "title": "Software Engineer",
    "company": "Tech Guys",
    "source": "Indeed",
    "stage": "Applied"
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(res.getHeaders());
        res.end(JSON.stringify(job));
    }
});

server.listen(8080);
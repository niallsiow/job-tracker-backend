import http from 'http';

const jobs = [
    {
        "title": "Software Engineer",
        "company": "Tech Guys",
        "source": "Indeed",
        "stage": "Applied"
    },
    {
        "title": "Software Developer",
        "company": "Computer People",
        "source": "Recruiter C",
        "stage": "Interview 1"
    }
]

const server = http.createServer((req, res) => {
    if (req.method === 'GET'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(res.getHeaders());
        res.end(JSON.stringify(jobs));
    }
    else if (req.method === 'POST'){
        console.log('Received a post request');
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(body);
            let title = body.split("=")[1];
            title = title.replace("+", " ");
            console.log(title);
            const newJob = {
                "title": title,
                "company": "Placeholder Company",
                "source": "Placeholder Source",
                "stage": "Placeholder Stage"
            };

            jobs.push(newJob);

            res.statusCode = 201;
            res.write(JSON.stringify(newJob));
            res.end();
        });

    }
});

server.listen(8080);
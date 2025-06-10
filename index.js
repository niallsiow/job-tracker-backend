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

const createJob = (req, res) => {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(body);
        const job = JSON.parse(body);
        const title = job.title;
        console.log(title);
        const newJob = {
            "title": title,
            "company": "Placeholder Company",
            "source": "Placeholder Source",
            "stage": "Placeholder Stage"
        };

        jobs.push(newJob);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.statusCode = 201;
        res.write(JSON.stringify(newJob));
        res.end();
    });
};

const invalidPostURL = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET'){
        if(req.url === '/jobs'){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log(res.getHeaders());
            res.end(JSON.stringify(jobs));
        }
    }
    else if (req.method === 'POST'){
        console.log('Received a post request');

        if (req.url === '/jobs/create'){
            createJob(req, res);
        }
        else {
            invalidPostURL(req, res);
        }
    }
});

server.listen(8080);
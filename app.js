const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type','text/html');
    //on the main page, the user is shown an input element
    //(1) the user submits the form
    if(url === '/') {
        res.write('<html>'+
            '<head><title>My first Node JS App!!</title></head>'+
            //(2) by submitting the form, the user is being sent to [web host adress]/message
            //and has submitted a post request to the server
            '<body><form action="/message" method="POST"><input type="text" name="myMessage"></input><button>Send</button></form></body>'+
        '</html>');
        return res.end();
    }

    //(3) this is the second time this funciton is run and since the user submitted a form (post request)
    //and is now on [web host adress]/message all this code runs
    if(url === '/message' && method === 'POST') {
        //creates a local file
        fs.writeFileSync('message.txt',"DUMMY");
        //status code 302 is a redirection
        res.statusCode = 302;
        //this is where it redirects to. The slash is just the homepage
        res.setHeader('Location','/');
        return res.end(); //function ends
    }

    res.write('<html>'+
            '<head><title>My first Node JS App!!</title></head>'+
            '<body><p>This is the message page.</p></body>'+
        '</html>');
    return res.end();

});

server.listen(3000);





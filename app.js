const https = require('https')
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))
var options = {
    'method':'GET',
    'url':'https://api.covid19api.com/',
    'headers':{

    }
};
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.get("/",function(req,res){
    res.render("index");
    const url = 'https://api.covid19api.com/summary';
    https.get(url,function(response){
        console.log(response.statusCode);
        var datas = [];
        response.on("data",function(data){
            datas.push(data)
            //const covidData = JSON.parse(data);
            //console.log(covidData[0]);
        })
        response.on("end",function(data){
            var body = Buffer.concat(datas);
            //console.log(body.toString());
            
        })
        response.on("error",function(error){
            console.error(error);
        })
    })
    
    res.send('Server is up and running')
    res.end();

})
// https://api.covid19api.com/live/country/south-africa/status/confirmed


app.post("/",function(req,res){
    let city = req.body.num1;
    let url = `https://api.covid19api.com/total/country/${city}/status/confirmed`;
    console.log(url);
    https.get(url,function(response){
        console.log(response.statusCode);
        var datas = [];
        response.on("data",function(data){
            datas.push(data)
            //const covidData = JSON.parse(data);
            //console.log(covidData[0]);
        })
        response.on("end",function(data){
            let body = Buffer.concat(datas);
            console.log(body.toString());
            //res.render('index',{body: body.toString()});
            
        })
        response.on("error",function(error){
            console.error(error);
        })
    })
    res.end();
})

app.listen(3000,function(){
    console.log('Server is running on 3000')
})

// var https = require('https');
// var fs = require('fs');

// var options = {
//   'method': 'GET',
//   'hostname': 'api.covid19api.com',
//   'path': '/'+'',
//   'headers': {
//   },
//   'maxRedirects': 20
// };

// var req = https.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function (chunk) {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });

//   res.on("error", function (error) {
//     console.error(error);
//   });
// });

// req.end();
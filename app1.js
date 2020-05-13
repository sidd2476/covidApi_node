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
    const url = ' https://api.covid19api.com/total/country/south-africa/status/confirmed';
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
            //res.render('index',{body: body});
        })
        response.on("error",function(error){
            console.error(error);
        })
    })
    
    //res.send('Server is up and running')
    res.end();

})
app.post("/",function(req,res){
    let city = req.body.num1
    let url = `https://api.covid19api.com/total/country/${city}/status/confirmed`;
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
            res.write(body);
            res.send()
        })
        response.on("error",function(error){
            console.error(error);
        })
    })
})
app.listen(3000,function(){
    console.log("efge revgrefve")
})
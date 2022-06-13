
const express=require("express");
const fs=require("fs");
const { parse } = require("path");

const app =express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.end("News App Working");
});

const PORT=process.env.PORT || 8080;

app.get("/news/get",(req,res)=>{
    res.setHeader("content-type","application/json");
    fs.readFile("./db.json","utf-8",(err,data)=>{
        res.end(data);
    });
});

app.post("/news/new",(req,res)=>{
    fs.readFile("./db.json",{encoding:"utf-8"},(err,data)=>{
         const parsed=JSON.parse(data);
         parsed.list=[...parsed.list,req.body];
     fs.writeFile("./db.json",JSON.stringify(parsed),{encoding:"utf-8"},()=>{
         res.status(201).send("News Created");
     });
  });
});

app.get("/title",(req,res)=>{
    const {q}=req.query;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        const parsed=JSON.parse(data);
        parsed.list=parsed.list.filter((el)=> el.title === q);
         return res.send(data);
    });
});

app.get("/author",(req,res)=>{
    const {authors}=req.query;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        const parsed=JSON.parse(data);
        parsed.list.author==authors;
         return res.send(data);
    });
});

app.get("/date",(req,res)=>{
    const {dates}=req.query;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        const parsed=JSON.parse(data);
        parsed.list.date==dates;
         return res.send(data);
    });
});


app.get("/location",(req,res)=>{
    const {locations}=req.query;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        const parsed=JSON.parse(data);
        parsed.list.location==locations;
         return res.send(data);
    });
});
app.get("/tag",(req,res)=>{
    const {tags}=req.query;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        const parsed=JSON.parse(data);
        parsed.list.tag==tags;
         return res.send(data);
    });
});



app.listen(PORT,()=>{
    console.log("server is started http://localhost:8080/");
});

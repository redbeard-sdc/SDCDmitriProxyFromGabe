const express = require("express");
const app = express();
const port = process.env.PORT || 3111;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.all("/", (req, res) => {
  console.log("hi");
  proxy.web(req, res, {
    target: "http://localhost:3100"
  });
});


// app.all("/api/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-18-222-0-232.us-east-2.compute.amazonaws.com/"
//   });
// });

// app.all("/location/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-54-215-233-5.us-west-1.compute.amazonaws.com/"
//   });
// });

// app.all("/prices/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-52-14-136-160.us-east-2.compute.amazonaws.com/"
//   });
// });

// app.all("/hotels/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-18-188-161-215.us-east-2.compute.amazonaws.com/"
//   });
// });

// app.all("/header/*", (req, res) => {
//   proxy.web(req, res, {
//     target: "http://ec2-3-17-179-159.us-east-2.compute.amazonaws.com/"
//   });
// });

app.listen(port, () => console.log(`Proxy server running on port ${port}`));

// app.get('/create',(req,res) => {
  
// });

// app.get('/read',(req,res) => {
  
// });

// app.get('/update',(req,res) => {
  
// });

// app.get('/delete',(req,res) => {
  
// });

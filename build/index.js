"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var PORT = 8000;
app.use(cors_1.default());
// allows to parse json
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.status(200).send("Hello World!");
});
//---------------------------------------------------------------------
app.post('/api/v1/parse', function (req, res) {
    var str = req.body.data;
    var firstName = str.split('').slice(0, 8).join('');
    var lastName = str.split('').slice(8, 18).join('');
    var clientId = str.split('').slice(18, 24).join('');
    var parse = {
        firstName: firstName,
        lastName: lastName,
        clientId: clientId
    };
    res.status(200).json({ statusCode: 200, data: parse });
});
app.post('/api/v2/parse', function (req, res) {
    var str = req.body.data;
    var personInfo = str.split('0').join(' ').split(" ").filter(function (x) { return x; });
    console.log(personInfo);
    var parse = {
        firstName: personInfo[0],
        lastName: personInfo[1],
        clientId: personInfo[2].substring(0, 3) + "-" + personInfo[2].substring(3)
    };
    res.status(200).send({ data: parse });
});
app.listen(PORT, function () {
    console.log('GET:  http://localhost:' + PORT);
    console.log('POST: http://localhost:8000/api/v1/parse');
    console.log('POST: http://localhost:8000/api/v2/parse');
});

import express, { Request, Response } from "express";
import cors from "cors";
const app = express()
const PORT = 8000;

app.use(cors());
// allows to parse json
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
})

//--------------------------IsClient Interface------------------------
interface IsClient {
  firstName: string
  lastName: string
  clientId: string
}
//---------------------------------------------------------------------
app.post('/api/v1/parse', (req: Request, res: Response) => {
  const str = req.body.data
  const firstName = str.split('').slice(0,8).join('')
  const lastName = str.split('').slice(8,18).join('')
  const clientId = str.split('').slice(18,24).join('')
    const parse: IsClient = {
      firstName,
      lastName,
      clientId
    }
   res.status(200).json({statusCode:200, data:parse });
 })

 
app.post('/api/v2/parse', (req: Request, res: Response) => {
    const str = req.body.data
    const personInfo = str.split('0').join(' ').split(" ").filter((x: string) => x);

    console.log(personInfo )
     const parse: IsClient = {
       firstName:personInfo[0],
       lastName:personInfo[1],
       clientId:personInfo[2].substring(0, 3) + "-" + personInfo[2].substring(3)
     }
    res.status(200).send({data: parse});
  })

app.listen(PORT,()=>{
  console.log('GET:  http://localhost:'+PORT)
  console.log('POST: http://localhost:8000/api/v1/parse')
  console.log('POST: http://localhost:8000/api/v2/parse')
})


const jwt = require("jsonwebtoken");

const secrect = "111";


const today = new Date();
const expirationDate = new Date(today);
expirationDate.setDate(today.getDate() -10);

console.log(expirationDate.getTime());
let res = jwt.sign(
    {
        id:"1",
        email:"email",
        name:'zs',
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    secrect
)

console.log(res)

try {
    let rr = jwt.verify(res, secrect);
} catch (error) {
    console.log(22222, error);
    
}

// jsonWebToken.encode(secrect,{name:"zs",age:29},(err,data)=>{
//     console.log(err,data);

//     jsonWebToken.decode(secrect,data,(err,ee)=>{
//         console.log(ee)
//     })

// })
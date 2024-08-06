const express = require('express'); //importing express
const app = express()//create an instance of express
const port = 3000
       // 1stroute
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//2nd route-you can create multiple routes like this
app.get('/login',(req,res)=>{
   res.send('login')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

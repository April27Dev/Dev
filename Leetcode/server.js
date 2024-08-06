const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser'); // Middleware to parse JSON

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
const{email,password}=req.body;
const userexists=USERS.some(user=>user.email===email);
  if(userexists){
    return res.status(400).send('User with this email already exists');
  }
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  USERS.push({email,password});
  // return back 200 status code to the client
  res.status(200).send('User created successfully');
  });


app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email,password}=req.body;
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user=USERS.some(user=>user.email===email && user.password===password)
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  if(user){
    const token=Math.random().toString(36).substr(2);
    return res.status(200).json({message:'Logged in successfully',token});
  //can't send simply send because then only first argument would be considered
      }
  // If the password is not the same, return back 401 status code to the client
  else{
    res.status(401).send('Invalid credentials');
  }
})


app.get('/questions', function(req, res) {
  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
})
//current list of drawings you’ve done, without making any changes.
app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
 res.json(SUBMISSION);
});


//This is about taking new ideas, deciding if you want to keep them, and then updating your notebook with the results.
app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
  const{problem,solution}=req.body;
  const accepted=Math.random()<0.5;
 // Store the submission in the SUBMISSION array above
  const sub={problem,solution,accepted};
  SUBMISSION.push(sub);
  // Return a response with the submission status
  res.status(200).json({message:'Submissed received',sub});
  });


// Create a route that lets an admin add a new problem
 app.post('/addProblem',(req,res)=>{
//ensure person posting is a admin
   const isAdmin = req.headers.authorization === 'admin-token'; //just an example
   if(!isAdmin) return res.status(403).send('Forbidden: Admin access required');
   // Add logic to to get the question 
   const {title,description,testCases}=req.body;
   // Add the new problem to the QUESTIONS array above
   const newProblem={title,description,testCases};
   // Validate input
   if (!title || !description || !testCases) {
     return res.status(400).send('Bad Request: Missing required fields');
   }
   QUESTIONS.push(newProblem);
   // Return back 200 status code to the client
   res.status(200).send('Problem added successfully');
 })

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})

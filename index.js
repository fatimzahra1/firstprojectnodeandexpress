const express = require ('express');
const Joi = require('joi');
const path = require ('path');
const app = express();
const port = 2345;
app.use(express.json());



// define the array of players
const players = [
    {id:1 , name:'Jason'} ,
    {id:2 , name:'Stewart'} ,
    {id:3 , name:'Rawan'} ,
    {id:4 , name:'Johann'} ,
    {id:5 , name:'Ludde'} ,
];
//get all the players

app.get('/api/players',  (req, res) =>{

    res.send(players);
    
  });
//get one player by it's id

app.get('/api/players/:id',  (req, res) =>{

    const player = players.find(p => p.id==parseInt(req.params.id)) ;
    if(!player)  res.status(404).send (`the Player with the id, ${req.params.id} wasnt found`);
   res.send(player);
    
  });
// create one player 
app.post('/api/players', (req, res)=>{

   // validate of the name written by the client
    const schema = Joi.object ({
        name: Joi.string().min(3).required()
    });
    const validation= schema.validate(req.body);

     if(validation.error) {
         res.status(400).send(validation.error);
         return;
     }
     // create a new player
    const player = {
        id: players.length + 1 ,
        name : req.body.name
    };
    // push the player to the players table
    players.push(player);
    res.send(player);

    })

  
// lestning to the port
app.listen(port, ()=>{
    console.log('letsning here');
});
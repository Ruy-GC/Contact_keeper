//create express server
const express = require('express');
const connectDB = require('./config/db');

//initialize express
const app = express();

//connect database
connectDB();

//Init middleware
app.use(express.json({extended:false})); //allows to accept request body data 

//main route
app.get('/',(req,res) => res.json({msg: 'Welcome to the Contactkeeper API...'}));

//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))



//dev port for the app to listen, looks for 'PORT' env variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
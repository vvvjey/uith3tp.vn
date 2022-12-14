const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routes');
const mongoose = require('mongoose')
require('dotenv').config()


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.use(methodOverride('_method'));
// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({ defaultLayout: 'main' ,
  extname:'.hbs',
  helpers: {
    sum: (a,b) => a+b},
  }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));



// Connect db
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Databased Connected')
})
 
route(app); 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
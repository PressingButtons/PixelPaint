import express from 'express';
import body_parser from 'body-parser';
import routing from './routing.js';
import exphbs from 'express-handlebars';
//global vars
const PORT = process.env.PORT || 3000;
const app = express();
//view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.disable('view cache'); //non production(?)
//other middlewares
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
//static routes
app.use('/jquery', express.static('./node_modules/jquery/dist/jquery.js'));
app.use('/public', express.static('./public'));
//
routing(app);
//methods
const onServerListen = err => {
  if(err) throw err;
  console.log(`Server initialized. Listening on port:${PORT}.`);
}
//execution
app.listen(PORT, onServerListen);

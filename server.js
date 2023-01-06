const path = require('path');
const express =  require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); // orm db connection

const app = express();
const PORT = process.env.PORT || 3001;

// tells the server to use the handlebars template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express | middleware | faciliates front & backend data communication; setting the public folder contents to static allows views to load frontend javascript & css.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on database and server connection
// - force: true | DROP DATABASE IF EXISTS tech_blog_db;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// ** pause | server set up **
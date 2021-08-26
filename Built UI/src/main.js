const express = require('express')
const path = require('path');
const app = express()
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const port = 3000
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'))
app.set('views', path.join(__dirname, 'resource/views'));

app.engine('hbs', handlebars({
      extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
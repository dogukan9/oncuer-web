const express = require('express');

const app = express();
const db = require('./models/connectDb');
const PORT = process.env.PORT || 5000;
db();

//for usingbody parser
app.use(express.json({ express: false }));

app.use('/api/register', require('./routers/register'));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/movies', require('./routers/movies'));
app.use('/api/profile', require('./routers/profile'));
app.use('/api/stories', require('./routers/stories'));


app.listen(PORT, () => {
  console.log('Listenin server on Port:' + PORT);
});

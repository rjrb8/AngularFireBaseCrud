const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.set('port', process.env.PORT || 3000);

//Empezando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en puerto', app.get('port'));
 });
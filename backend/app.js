const express = require('express');
const bodyParser = require('body-parser');//gerir os dados
const mongoose = require('mongoose');//definir a conexao com mongodb
const cors = require('cors'); // Importe o pacote cors
//const sauceRoutes = require('./routes/saucesRouter');
const userRoutes = require('./routes/userRoutes');
const path = require('path');//definir le chemin para guardar as imgs ou ficheiros
const app = express();
const { body, validationResult } = require('express-validator');

//coneta a mongodb (meter o url)
mongoose.connect('mongodb+srv://betaviralhadas2:nHyC6HqAgjuGaGiC@cluster0.joaakmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connexion reussie'))
    .catch(() => console.log('connexion echouee'));



/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/
//p se conetar ao back
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
};

app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());


//app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));//pa carregar as fotos

/*app.post('/signup', [
    // Validação de email
    body('email').isEmail().normalizeEmail(),
    // Validação de senha
    body('password').isLength({ min: 6 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Se os dados forem válidos, continue o processamento
  });*/

module.exports = app;
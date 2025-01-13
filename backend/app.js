const express = require('express');
const cors = require('cors');
const userRoutes = require('./routers/routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

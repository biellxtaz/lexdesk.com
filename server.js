require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',       require('./src/routes/auth.routes'));
app.use('/api/clientes',   require('./src/routes/clientes.routes'));
app.use('/api/casos',      require('./src/routes/casos.routes'));
app.use('/api/tarefas',    require('./src/routes/tarefas.routes'));
app.use('/api/eventos',    require('./src/routes/eventos.routes'));
app.use('/api/documentos', require('./src/routes/documentos.routes'));
app.use('/api/financeiro', require('./src/routes/financeiro.routes'));
app.use('/api/dashboard',  require('./src/routes/dashboard.routes'));
app.use('/api/assinaturas',require('./src/routes/assinaturas.routes'));
app.use('/api/chatbot',    require('./src/routes/chatbot.routes'));
app.use('/api/admin',      require('./src/routes/admin.routes'));
app.use('/api/cupons',     require('./src/routes/cupons.routes'));
app.use('/api/casos/:id/colaboradores', require('./src/routes/colaboradores.routes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'LexDesk API' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('LexDesk API rodando na porta ' + PORT));
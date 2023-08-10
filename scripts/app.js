const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('TOKEN DEPLOYER PLATFORM');
});

app.use(express.json());

app.use(cors({
  origin: '*'
}));

// Import route handlers
const deployRoutes = require('../routes/route');
const verifyRoutes = require('../routes/verifyroute');

// Register route handlers
app.use('/deploy', deployRoutes);
app.use('/verify', verifyRoutes);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
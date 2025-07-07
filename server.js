const express = require('express');
const { startGrpcServer } = require('./grpc-server');
const { callSayHello } = require('./grpc-client');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

// HTTP endpoint to call the gRPC service
app.get('/hello/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const message = await callSayHello(name);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to call gRPC service' });
  }
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  // Start the gRPC server when the Express server starts
  startGrpcServer();
});
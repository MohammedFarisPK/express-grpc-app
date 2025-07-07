const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the .proto file
const protoPath = path.join(__dirname, 'proto', 'hello.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// Create the gRPC client
const client = new helloProto.HelloService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Function to call the SayHello gRPC method
function callSayHello(name) {
  return new Promise((resolve, reject) => {
    client.sayHello({ name }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.message);
      }
    });
  });
}

module.exports = { callSayHello };
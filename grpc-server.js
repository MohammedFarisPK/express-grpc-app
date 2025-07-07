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

// Implement the SayHello function
function sayHello(call, callback) {
  const name = call.request.name || 'Guest';
  const message = `Hello, ${name}!`;
  callback(null, { message });
}

// Create and start the gRPC server
function startGrpcServer() {
  const server = new grpc.Server();
  server.addService(helloProto.HelloService.service, { sayHello });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
    //server.start();
  });
}

module.exports = { startGrpcServer };
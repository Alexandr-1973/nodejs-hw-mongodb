import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

// console.log(setupServer);
// initMongoConnection();

// setupServer;
const bootstrap = async () => {
  await initMongoConnection();
  setupServer;
};

bootstrap();

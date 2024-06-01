import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);

export const setupServer = express();



setupServer.use('*', (req, res, next) => {
	res.status(404).json({
	  message: 'Not found',
	});
  });

  setupServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
  });

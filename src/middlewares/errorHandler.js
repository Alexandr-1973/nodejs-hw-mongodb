import { HttpError } from 'http-errors';


export const errorHandler = (err, req, res, next) => {

	if (err instanceof HttpError) {
	  res.status(err.status).json({
		status: 404,
		message: err.message,
		data: {message: "Contact not found"},
	  });
	  next();
	}

	res.status(500).json({
	  status: 500,
	  message: 'Something went wrong',
	  data: err.message,
	});
  };

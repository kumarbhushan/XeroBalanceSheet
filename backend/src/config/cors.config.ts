const corsOptions:any = {
  origin: 'http://localhost:3001', // Allow frontend from port 3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
export default corsOptions

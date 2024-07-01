const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "http://localhost:5173"}))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB URI is not defined. Check your .env file.');
  process.exit(1);
}

connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
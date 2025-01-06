require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
app.use(morgan('dev'));
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

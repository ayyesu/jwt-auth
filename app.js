const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();

// Routes
app.use('/api', userRoutes);

const port = process.env.PORT || 8080;

const connection_string = process.env.MONGO_URI;
mongoose
    .connect(connection_string, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Mongodb connected...${mongoose.connection.host}`);
    })
    .catch((err) => {
        console.error('Error', err.message);
    });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

import express from 'express';

const app = express();

const PORT = 50000;

app.get('/', (_, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
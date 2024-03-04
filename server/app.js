const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Basic server setup')
})

app.listen(3005, () => {
    console.log('Server started on port 3005')
})

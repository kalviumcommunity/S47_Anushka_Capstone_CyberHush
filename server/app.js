const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Basic server setup')
})

app.listen(3005, () => {
    console.log('Server started on port 3005')
})

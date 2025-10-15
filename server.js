const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('../frontend'));

app.get('/generate_buildings', (req, res) => {
    const python = spawn('python', ['backend/game_logic.py']);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

app.listen(port, () => {
    console.log(`Cookie Clicker server running at http://localhost:${port}`);
});

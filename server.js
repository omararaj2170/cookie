const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

// Serve static files from the root
app.use(express.static('.'));

// Generate buildings using Python
app.get('/generate_buildings', (req, res) => {
    const python = spawn('python3', ['game_logic.py']);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
    python.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });
});

app.listen(port, () => {
    console.log(`Cookie Clicker server running at http://localhost:${port}`);
});

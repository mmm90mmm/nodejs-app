const express = require('express');
const si = require('systeminformation'); // systeminformation package for hardware data

const app = express();
const port = process.env.PORT || 3000;

app.get('/motherboard-info', async (req, res) => {
    try {
        const baseboard = await si.baseboard();
        res.json({
            manufacturer: baseboard.manufacturer,
            model: baseboard.model,
            serial: baseboard.serial
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve motherboard info.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


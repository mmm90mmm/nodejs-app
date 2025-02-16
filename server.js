// Import required modules
const express = require('express');
const si = require('systeminformation');  // systeminformation package for hardware data

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to get motherboard serial number
app.get('/motherboard-info', async (req, res) => {
    try {
        // Fetch motherboard info using systeminformation
        const baseboard = await si.baseboard();

        // Respond with motherboard serial number
        res.json({
            manufacturer: baseboard.manufacturer,
            model: baseboard.model,
            serial: baseboard.serial
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to retrieve motherboard info.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

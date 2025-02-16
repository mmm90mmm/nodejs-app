// api/motherboard-info.js

const si = require('systeminformation');  // systeminformation package for hardware data

module.exports = async (req, res) => {
    try {
        // Fetch motherboard info using systeminformation
        const baseboard = await si.baseboard();

        // Respond with motherboard serial number
        res.status(200).json({
            manufacturer: baseboard.manufacturer,
            model: baseboard.model,
            serial: baseboard.serial
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to retrieve motherboard info.' });
    }
};

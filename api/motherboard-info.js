const si = require('systeminformation');

module.exports = async (req, res) => {
    try {
        const baseboard = await si.baseboard();
        
        if (!baseboard.manufacturer || !baseboard.model || !baseboard.serial) {
            return res.status(404).json({ error: 'Motherboard information is unavailable.' });
        }

        res.status(200).json({
            manufacturer: baseboard.manufacturer,
            model: baseboard.model,
            serial: baseboard.serial
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve motherboard info. Please try again later.' });
    }
};

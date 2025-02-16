const { exec } = require('child_process');

module.exports = async (req, res) => {
    try {
        // Function to get motherboard serial number on different platforms
        function getMotherboardInfo(callback) {
            let command = '';

            switch (process.platform) {
                case 'win32':  // Windows
                    command = 'wmic baseboard get serialnumber';
                    break;
                case 'linux':  // Linux
                    command = 'sudo dmidecode -t baseboard | grep Serial';
                    break;
                case 'darwin':  // macOS
                    command = 'system_profiler SPHardwareDataType | grep "Serial Number"';
                    break;
                default:
                    return callback('Unsupported platform', null);
            }

            exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    return callback(error || stderr, null);
                }
                callback(null, stdout.trim());
            });
        }

        // Call function to get motherboard info
        getMotherboardInfo((error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to retrieve motherboard info.', details: error });
            }

            // Respond with motherboard serial number
            res.status(200).json({
                serial: result
            });
        });

    } catch (error) {
        // Handle any other errors
        res.status(500).json({ error: 'Failed to retrieve motherboard info.' });
    }
};

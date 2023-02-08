const loginUserServices = require('../services/loginUser.services');
const { NotFoundError } = require('../utils/errors');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginUserServices.loginUserFromDB(username, password);
        res.status(200).json({
            message: 'User Logged IN..',
            data: result
        });
    }
    catch (err) {
        if (err instanceof NotFoundError) {
            res.status(401).json({
                message: 'Password incorrect'
            });
        }
        res.status(500).json({ 
            message: 
            'Internal server error' 
        });
    }
};

module.exports = { handleLogin };
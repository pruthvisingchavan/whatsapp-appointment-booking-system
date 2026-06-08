module.exports = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;



        /*
        ==============================================
        CHECK AUTH HEADER
        ==============================================
        */

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                error: 'Authorization header missing.'
            });
        }



        /*
        ==============================================
        EXPECTED FORMAT:
        Bearer mysecretapikey
        ==============================================
        */

        const parts = authHeader.split(' ');



        if (parts.length !== 2 || parts[0] !== 'Bearer') {

            return res.status(401).json({

                success: false,

                error: 'Missing or malformed Authorization header.'
            });
        }



        const token = parts[1];



        /*
        ==============================================
        VALIDATE TOKEN
        ==============================================
        */

        if (token !== process.env.API_KEY) {

            return res.status(403).json({

                success: false,

                error: 'Invalid API key.'
            });
        }



        next();

    } catch (error) {

        console.error(

            'API Auth Middleware Error:',
            error.message
        );



        return res.status(500).json({

            success: false,

            error: 'Authentication failed.'
        });
    }
};
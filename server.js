const app = require("./app"),
    dotenv = require('dotenv'),
    server = require('./helper/language/server.json');

dotenv.config();

// ports
const PORT = process.env.PORT || 3000;


// create http server
app.listen(PORT, () => console.log(server.success.serverStarted + PORT));
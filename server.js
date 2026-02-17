const app = require("./app");
const connectToDB = require("./config/db");

require("dotenv").config()
const PORT = process.env.PORT || 5000;

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



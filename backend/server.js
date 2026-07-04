const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT || 3000;


app.get('/test', (req, res) => {
    res.send("test route");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
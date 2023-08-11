const express = require('express');
const { PORT } = require("./config/serverConfig.js");
const apiRoutes = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

const prepareAndStartServer = () => {
    app.listen( PORT, () => {
        console.log(`Server started on Port : ${PORT}`);
    });
}

prepareAndStartServer();
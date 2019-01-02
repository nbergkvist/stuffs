const express = require('express');
const app = express();
const staticFolder = process.env.STATIC_FOLDER || "dist";

const port = process.env.PORT ||
    process.env.NODE_PORT || 5000;

app.use(express.static(staticFolder));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
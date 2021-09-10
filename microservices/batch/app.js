const express = require("express");
const app = express();
const PORT = 3001;
const { mongodb, Product } = require("./model");
app.use(express.json());

// ROUTER BEGIN
app.get("/", (_, res) => {
    res.status(200).json({
        meta: {
            success: true,
            status: 200,
            description: "Server Batch running on :: " + PORT,
        },
        body: null,
    });
});

app.get("/batch", (req, res, next) => {
    Product.findAll()
        .then((data) => {
            res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    description: "Success get batch data",
                },
                body: {
                    product: data,
                },
            });
        })
        .catch(next);
});
// ROUTER END

// ERR HANDLER BEGIN
app.use((err, req, res, next) => {
    res.status(500).json({
        meta: {
            success: false,
            status: 500,
            description: "Internal Server Error",
        },
        body: {
            error: err,
        },
    });
});
// ERR HANDLER END

mongodb
    .run()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server Batch Run on :: " + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

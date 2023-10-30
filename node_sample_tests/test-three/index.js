const express = require('express');
const router = express.Router();
const dataset = require('./dataset/makeup_data.json');
const fs = require('fs');
var data = Array.from(dataset);

router.get("/all/make-up", async (req, res) => {

    setTimeout(() => {
        return res.json(data)
    }, 0);
});

router.get("/all/make-up/brands", async (req, res) => {
    let brands = [];
    for (let i = 0; i < data.length; i++) {
        brands.push(data[i].brand);
    }
    return res.json(brands);
})
router.get("/all/make-up/brand/name", async (req, res) => {
    const name = req.body.name;
    let brandsWithName = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].brand === null) continue;
        if (data[i].brand.includes(name)) {
            brandsWithName.push(data[i].brand);
        }
    }
    return res.json(brandsWithName);
});
router.get("/all/product-colors", async (req, res) => {
    for (let i = 0; i < data.length; i++) {

        if (data[i].product_colors === null) continue;
        fs.appendFileSync("prod_cols.json", JSON.stringify({
            "brand": data[i].brand,
            "product_colors": data[i].product_colors
        }))
    }
    return res.json("wrote file !");
})
module.exports = {
    router
}
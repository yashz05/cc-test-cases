const { default: axios } = require("axios");
const main = require("./node_sample_tests/test-one/index")
const test2 = require("./node_sample_tests/test-two/race_cond")
const statusMonitor = require('express-status-monitor');
const test3 = require("./node_sample_tests/test-three/index")
const test4 = require("./node_sample_tests/test-four/index")
const process = require('process');
const cputest = require("./others")
// express server 
// routes of test-3


const express = require('express');
const fs = require('fs');

const app = express();
app.use((req, res, next) => {
    const start = process.hrtime();
    cputest.startcpustat()
    res.on('finish', () => {
        const end = process.hrtime(start);
        const elapsedTimeInMs = (end[0] * 1e3 + end[1] * 1e-6);
        const bytesTransferred = res.get('Content-Length') || 0;
        // Calculate bandwidth in bytes per second (Bps)
        const bandwidth = (bytesTransferred / elapsedTimeInMs) * 1000; // Convert to Bps
        console.log(req.url);
        console.log(`Bandwidth used: ${bandwidth.toFixed(2)} Bps`);
        cputest.stopcpustat()
    });

    next();
});
app.use(statusMonitor());
app.use(express.json())
app.use('/test3', test3.router);
// app.use('/test4', test4.router);
const PORT = 8000;


// express server end 


// express server 4
const FormData = require('form-data');


const multer = require('multer');
const jimp = require('jimp');
const { log } = require("console");

let fileName = "";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './node_sample_tests/test-four/images/')
    },
    filename: function (req, file, cb) {
        const filterForImg = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ]
        const fileSplitName = file.originalname.split(".")[0];
        const ext = file.mimetype.split('/');
        fileName = Date.now() + '.' + ext[1];
        if (!filterForImg.includes(file.mimetype)) {
            cb(new Error("file type only img expected"), null)
        } else {
            cb(null, fileName)
        }

    },
}

)
const upload = multer({ storage: storage });
// express test 4 end

console.log("Running Test Cases ");
async function t() {

    console.log("TEST CASE 1 :  write odds and even in file ");
    cputest.startcpustat()
    await main.main()
    cputest.stopcpustat()


    console.log("TEST CASE 3 :  EXPRESS API  ");
    await app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
    console.log("TEST CASE 3.1 :  EXPRESS API -> return big json  ");
    var t31 = performance.now()
    const options = {
        method: 'GET',
        url: 'http://localhost:8000/test3/all/make-up',
        headers: { 'User-Agent': 'insomnia/8.3.0' }
    };
    await axios.request(options).then(function (response) {
        var te31 = performance.now()
        console.log(` TEST CASE 3.1 took  ${te31 - t31} milliseconds`)
    }).catch(function (error) {
        console.error(error);
    });

    console.log("TEST CASE 3.2 :  EXPRESS API -> return big json of brand names ");
    var t32 = performance.now()
    const options2 = {
        method: 'GET',
        url: 'http://localhost:8000/test3/all/make-up/brands',
        headers: { 'User-Agent': 'insomnia/8.3.0' }
    };
    await axios.request(options2).then(function (response) {
        var te32 = performance.now()
        console.log(` TEST CASE 3.2 took  ${te32 - t32} milliseconds`)
    }).catch(function (error) {
        console.error(error);
    });
    console.log("TEST CASE 3.3 :  EXPRESS API -> insert new brand names ");
    var t33 = performance.now()
    const options3 = {
        method: 'GET',
        url: 'http://localhost:8000/test3/all/make-up/brand/name',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
        data: { name: 'test' }
    };
    await axios.request(options3).then(function (response) {
        var te33 = performance.now()
        console.log(` TEST CASE 3.3 took  ${te33 - t33} milliseconds`)
    }).catch(function (error) {
        console.error(error);
    });
    console.log("TEST CASE 3.4 :  EXPRESS API -> write file on get call ");
    var t34 = performance.now()
    const options4 = {
        method: 'GET',
        url: 'http://localhost:8000/test3/all/product-colors',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
        data: { name: 'test' }
    };
    await axios.request(options4).then(function (response) {
        var te34 = performance.now()
        console.log(` TEST CASE 3.4 took  ${te34 - t34} milliseconds`)
    }).catch(function (error) {
        console.error(error);
    });

    // API OF 4th test 
    app.post("/img/upload", upload.single('picture'), async (req, res) => {
        jimp.read("./node_sample_tests/test-four/images/" + fileName, async (err, img, cb) => {
            if (err) return res.json(err.message);
            await img
                .resize(250, 250)
                .quality(20)
                .grayscale()
                .opacity(1)
                .fade(0.3)
                .write("./node_sample_tests/test-four/images/" + fileName)
        });
        setTimeout(() => {
            return res.json("done saving and applying !")
        }, 4500);

    })
    // API OF 4th test end 





    // test 4
    console.log("TEST CASE 4 :  EXPRESS API -> Image upload of 1.5 mb ");
    var t4 = performance.now()
    const filePath = './test.jpg';

    // Create a form data object
    const formData = new FormData();

    // Append the file to the form data
    formData.append('picture', fs.createReadStream(filePath));

    const options41 = {
        method: 'POST',
        url: 'http://localhost:8000/img/upload',
        headers: {
            ...formData.getHeaders(),
            // Add any other headers if needed
        },
        data: formData,
    };
    await axios.request(options41).then(function (response) {
        var te4 = performance.now()
        console.log(` TEST CASE 4 took  ${te4 - t4} milliseconds`)
    }).catch(function (error) {
        console.error(error);
    });


}

t()





// console.log("TEST CASE 3 :  Express API ");


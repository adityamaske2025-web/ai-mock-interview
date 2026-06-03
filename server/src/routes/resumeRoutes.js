const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
console.log("pdfParse =", pdfParse);

const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/upload",
    upload.single("resume"),
    async (req, res) => {
        try {

            const dataBuffer = fs.readFileSync(
                req.file.path
            );
            console.log("TYPE:", typeof pdfParse);
            console.log("ABOUT TO CALL PDFPARSE");
            const pdfData = await pdfParse(dataBuffer);
            

            res.json({
                success: true,
                text: pdfData.text,
            });

        } catch (error) {
            console.error("FULL ERROR:", error);

            res.status(500).json({
                success: false,
                error: error.stack,
            });
        }
    }
);

module.exports = router;
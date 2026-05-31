const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createInterview,
    getMyInterviews,
    getInterviewById,
    submitInterview,
    deleteInterview
} = require("../controllers/interviewController");

router.post(
    "/create",
    protect,
    createInterview
);


router.get(
    "/my-interviews",
    protect,
    getMyInterviews
);

router.get(
    "/:id",
    protect,
    getInterviewById
);

router.post(
    "/:id/submit",
    protect,
    submitInterview
);
router.delete(
    "/delete/:id",
    protect,
    deleteInterview
);
router.get("/test", (req, res) => {
    res.send("Interview route working");
});
module.exports = router;
console.log("Interview routes loaded");
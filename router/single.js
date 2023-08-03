const express = require( 'express' );
const router = express.Router();
const upload = require('../util/multer')

const {created, readall, readone, naming, updateone, deleteone} =require('../controller/multiple')

router.get("/", (req,res)=>{
    res.send("WELCOME TO THE LEAGUE API")
});

router.post("/create", upload.fields([{name: "Images", min: 2}]), created)
router.get("/getall", readall) 
router.get("/getone/:id", readone)
router.get("/byname", naming)
router.put("/update/:id", upload.fields([{name: "Images", min: 2}]), updateone)
router.delete("/delete/:id", deleteone)

module.exports = router;
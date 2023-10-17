const router = require("express").Router();
const Bid = require("../models/bidModal");
const authMiddleware = require("../middleware/authMiddleware");

//place a new bid
router.post("/place-new-bid", authMiddleware,async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    console.log(newBid)
    res.send({ success: true, message: "Bid placed successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

//get all bids
router.post("/get-all-bids", authMiddleware, async(req, res) => {
  try {
    const {product,userId} = req.body;
    let filters ={};
    if(product){
        filters.product = product;
    }
    if(userId){
        filters.seller = userId;
    }
    const bids = await Bid.find(filters )
    .populate('product')
    .populate('seller')
    .populate('buyer');
    res.send({ success: true, data: bids });

  } catch (error) {
    res.send({ success: false, message: error.message });
    console.log("eerrro",error)

  }
});

module.exports = router;

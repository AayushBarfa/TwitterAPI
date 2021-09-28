const express=require("express");
const controller=require("../controller/tweetController");           //reqire controller as all function created there
const router=express.Router();


router.post('/tweet/post',controller.add_tweet_post);               //route for adding the tweet

router.delete('/tweet/delete/:id',controller.delete_tweet)          //route for deleting the tweet 

router.get('/tweet/get/:id',controller.get_tweet)                   //route for getting the tweet from db    

module.exports = router;
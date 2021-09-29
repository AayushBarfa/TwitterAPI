const express=require("express");
const controller=require("../controller/activeUserController");
const router = express.Router();

router.use(express.urlencoded({extended: true}));

router.post(('/user/follow/:username'),controller.follow_post);          // post api for following another user

router.delete(('/user/unfollow/:username'),controller.unfollow_delete);  // delete api for unfollow req

module.exports=router;
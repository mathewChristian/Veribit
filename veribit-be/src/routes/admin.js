const express = require("express");
const passport = require("passport");
const router = express.Router();
const AdminController = require("../controllers/admin");
const passportCfg = require("../config/passport"); // eslint-disable-line

// get
router.get("/submission_list", AdminController.getSubmissionList);
router.get("/userdocuments", AdminController.getUserDocuments);
router.get("/verify/:ownerConfirmToken", AdminController.getVerifyOwner);

/*Wian Koch: 2019-08-01:*
router.get("/signin/moneybutton", passport.authenticate("oauth2", { scope: ["auth.user_identity:read users.profiles:read"] }));
router.get("/signin/moneybutton/callback", passport.authenticate("oauth2"), function (req, res) { res.redirect("/dashboard"); });
*/

// post
router.post("/signup", AdminController.postSignup);
router.post("/signin", AdminController.postLogin);

router.post("/approve_user", AdminController.postApproveUser);

router.post("/update/identity", AdminController.postUpdateIdentity);
router.post("/update/selfie", AdminController.postUpdateSelfie);

module.exports = router;

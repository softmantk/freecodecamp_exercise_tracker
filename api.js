const router = require("express").Router();
const mongoose = require("mongoose");
require("./models/User");
require("./models/Exercise");
const User = mongoose.model("User");
const Exercise = mongoose.model("Exercise");


router.route("/exercise/new-user")
    .post(async (req, res, next) => {
        try {

            const user = (await User.create(req.body)).toJSON();
            return res.json(user)
        } catch (e) {
            return next(e)
        }

    });

router.route("/exercise/users")
    .get(async (req, res, next) => {
        try {
            const users = await User.find();

            return res.json(users);
        } catch (e) {
            return next(e)
        }
    });
router.route("/exercise/add")
    .post(async (req, res, next) => {
        try {
            let {date,description,duration,userId}= req.body;
            if(!date){
                date = new Date()
            }
            const exercise = await Exercise.create({date,description,duration,userId});
            
            return res.json(exercise)
        } catch (e) {
            return next(e)
        }
    });
router.route("/exercise/log")
    .get(async (req, res, next) => {
        try {
            const {from, to, limit = 20, userId} = req.query;
            let query;
            if (!(from && to))
                return res.json({
                    errors: [{
                        message: "from and to or limit is required."
                    }],
                    success: false,
                });
            if (from && to) {
                query = {
                    from: {
                        $gte: from
                    },
                    to: {
                        $lte: to
                    }
                }
            }

            console.log(":req.query:", req.query);

            const logs = await Exercise.find({
                userId
            })
                .limit(limit)
                .skip(limit * (from));

            return res.json(logs)
        } catch (e) {
            return next(e)
        }
    });

module.exports = router;

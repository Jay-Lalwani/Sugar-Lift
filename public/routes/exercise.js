const express = require('express');
const router = express.Router()


router.get('/exercise', function(req,res){

    if ("cycling.x" in req.query){
        res.locals.exerciseType = 'aerobic'
        req.session.ex = 'Cycling'
    }
    else if ("swimming.x" in req.query){
        res.locals.exerciseType = 'aerobic'
        req.session.ex = 'Swimming'
    }
    else if ("sprinting.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
        req.session.ex = 'Sprinting'
    }
    else if ("jogging.x" in req.query){
        res.locals.exerciseType = 'aerobic'
        req.session.ex = 'Walking'
    }
    else if ("sports.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
        req.session.ex = 'Sports'
    }
    else if ("weightlifting.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
        req.session.ex = 'Weightlifting'
    }
    
        if(req.session.curr < 90)
        {
            message = "Have a 10-20 gram carbohydrate snack, delay exercise until BG > 90 mg/dL"
        }
        else if(req.session.curr <= 125){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Have a 10 gram carbohydrate snack and begin exercise, your blood glucose is slightly under the optimal range for this exercise"
            }
            else{
                message = "Begin exercise, your blood glucose is in the optimal range for this exercise"
            }
        }
        else if(req.session.curr <= 180){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Begin exercise, your blood glucose is in the optimal range for this exercise"
            }
            else{
                message = "Begin exercise, your blood glucose is in the optimal range for this exercise"
            }
        }
        else if(req.session.curr <= 270){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Begin exercise, your blood glucose is in the optimal range for this exercise"
            }
            else{
                message = "Begin exercise, be cautious of BG increase, your blood glucose is in the higher end of the optimal range for this exercise"
            }
        }
        else{
            if(res.locals.exerciseType == 'aerobic'){
                message = "Check keytones – If low, begin exercise and monitor BG; if moderate, keep exercise light and under 30 minutes; if high, avoid exercise and begin hyperglycemia protocol. Your blood glucose is quite high for this exercise"
            }
            else{
                message = "Check keytones, do not exercise. Your blood glucose is too high for this exercise"
            }
        }
    res.render("exercise", {"message": message});
})



module.exports = router;
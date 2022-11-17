const express = require('express');
const router = express.Router()


router.get('/exercise', function(req,res){
    
    if ("cycling.x" in req.query){
        res.locals.exerciseType = 'aerobic'
    }
    else if ("swimming.x" in req.query){
        res.locals.exerciseType = 'aerobic'
    }
    else if ("sprinting.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
    }
    else if ("jogging.x" in req.query){
        res.locals.exerciseType = 'aerobic'
    }
    else if ("sports.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
    }
    else if ("weightlifting.x" in req.query){
        res.locals.exerciseType = 'anaerobic'
    }
    
    console.log(req.session.bloodSugar);
        if(req.session.bloodSugar < 90)
        {
            message = "Have a 10-20 gram carbohydrate snack, delay exercise until BG > 90 mg/dL"
        }
        else if(req.session.bloodSugar <= 125){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Have a 10 gram carbohydrate snack and begin exercise"
            }
            else{
                message = "Begin exercise"
            }
        }
        else if(req.session.bloodSugar <= 180){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Begin exercise"
            }
            else{
                message = "Begin exercise"
            }
        }
        else if(req.session.bloodSugar <= 270){
            if(res.locals.exerciseType == 'aerobic'){
                message = "Begin exercise"
            }
            else{
                message = "Begin exercise, be cautious of BG increase"
            }
        }
        else{
            if(res.locals.exerciseType == 'aerobic'){
                message = "Check keytones – If low, begin exercise and monitor BG; if moderate, keep exercise light and under 30 minutes; if high, avoid exercise and begin hyperglycemia protocol"
            }
            else{
                message = "Check keytones, do not exercise"
            }
        }
    res.render("exercise", {"message": message});
})



module.exports = router;
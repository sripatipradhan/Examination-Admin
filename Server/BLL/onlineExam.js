const express = require('express');
const app = express();
const router = express.Router();
module.exports = router;
const OEDll = require('../DLL/onlineExamDLL');


const { addQuestionValidation } = require('../validation/valid');


router.post('/addQuestion', addQuestionValidation, function(req, res) {
    OEDll.addQuestion(req.body, function(result) {
        res.send(result);
    });
});

router.get('/getQuestionPaper/:subCode', function(req, res) {
    OEDll.getQuestionPaper(req.params, function(result) {
        res.send(result);
    });
});

router.post('/deleteQuestionPaper', function(req, res) {
    OEDll.deleteQuestionPaper(req.body, function(result) {
        res.send(result);
    });
});

router.put('/updateQuestion/:questionID', function(req, res) {
    OEDll.updateQuestion(req.params, req.body, function(result) {
        res.send(result);
    });
});
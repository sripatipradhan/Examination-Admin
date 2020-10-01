const mongo = require('mongodb');
var base32 = require('base32');
const { response } = require('express');
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const DB = "onlineExam";


exports.addQuestion = (data, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("Examination").findOne({ examCode: data.examCode }, function(err, result) {
            if (err) throw err;
            if (result.examCode == data.examCode) {
                dbo.collection("Subject").findOne({ subCode: data.subCode }, function(err, result) {
                    if (err) throw err;
                    if (data.subCode == result.subCode) {
                        dbo.collection("questionPaper").find({ subCode: data.subCode }).sort({ "questionID": -1 }).toArray(function(err, result) {
                            if (err) throw err;
                            let newquestionID;
                            if (result.length == 0) {
                                newquestionID = 1;
                            } else {
                                newquestionID = result[0].questionID + 1;
                            }
                            data.questionID = newquestionID
                            dbo.collection("questionPaper").insertOne(data, function(err, responsd) {
                                if (err) throw err;
                                let response = {
                                    message: "Questions added successfully"
                                }
                                callback(response);
                                db.close();

                            });
                        });
                    }
                });
            }
        });
    });
};

exports.getQuestionPaper = function(subCode, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("questionPaper").find({ subCode: subCode.subCode }).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.deleteQuestionPaper = function(data, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        console.log(data);
        // dbo.collection("questionPaper").Bulk.find({ subCode: data.subCode }).removeOne({ questionID: data.questionID }, function(err, result) {
        dbo.collection("questionPaper").deleteOne({ questionID: data.questionID }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Deleted successfully."
            }
            callback(response);
            db.close();
        });
    });
}

exports.updateQuestion = function(questionID, updateBody, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        console.log(questionID + 'hfhhhbb' + updateBody)
        dbo.collection("questionPaper").updateOne({ questionID: questionID }, { $set: updateBody }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Project details updated successfully."
            }
            callback(response);
            db.close();
        });
    });
}
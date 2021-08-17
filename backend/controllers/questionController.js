var QuestionModel = require('../models/questionModel.js');

/**
 * questionController.js
 *
 * @description :: Server-side logic for managing questions.
 */
module.exports = {

    /**
     * questionController.list()
     */
    list: function (req, res) {
        QuestionModel.find(function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question.',
                    error: err
                });
            }

            return res.json(questions);
        });
    },


    /**
     * questionController.getNewQuestions()
     */

    //retrieving 1 question from API and saving to MongoDB
    getNewQuestions: function(req, res){
        const fetch = require('node-fetch');

        var url = 'https://opentdb.com/api.php?amount=1';
        var question, correct_a, incorrect_a;
        var exists = false;

        fetch(url)
            .then(res => res.json())
                .then(data => {
                    res.send({ data }); 
                    var obj = JSON.parse(JSON.stringify({data}));

                    question = obj["data"]["results"][0]["question"];
                    correct_a = obj["data"]["results"][0]["correct_answer"]
                    incorrect_a = [
                        obj["data"]["results"][0]["incorrect_answers"][0],
                        obj["data"]["results"][0]["incorrect_answers"][1],
                        obj["data"]["results"][0]["incorrect_answers"][2]
                    ];

                    var question = new QuestionModel({
                        question : question,
                        correct : correct_a,
                        incorrect : [ 
                            incorrect_a[0], incorrect_a[1], incorrect_a[2]
                        ]
                    });
            
                    //Check if question exists in database
                    QuestionModel.findOne({question: question}, 
                    function(err,obj) {
                         if(obj){
                            console.log("Ne bo šlo");
                         }
                         else{
                            question.save(); 
                         }
                    });
        })       
    },


    /**
     * questionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        QuestionModel.findOne({_id: id}, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question.',
                    error: err
                });
            }

            if (!question) {
                return res.status(404).json({
                    message: 'No such question'
                });
            }

            return res.json(question);
        });
    },

    /**
     * questionController.create()
     */
    create: function (req, res) {
        var question = new QuestionModel({
			question : req.body.question,
			correct : req.body.correct,
			incorrect : req.body.incorrect
        });

        question.save(function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating question',
                    error: err
                });
            }

            return res.status(201).json(question);
        });
    },

    /**
     * questionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        QuestionModel.findOne({_id: id}, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question',
                    error: err
                });
            }

            if (!question) {
                return res.status(404).json({
                    message: 'No such question'
                });
            }

            question.question = req.body.question ? req.body.question : question.question;
			question.correct = req.body.correct ? req.body.correct : question.correct;
			question.incorrect = req.body.incorrect ? req.body.incorrect : question.incorrect;
			
            question.save(function (err, question) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating question.',
                        error: err
                    });
                }

                return res.json(question);
            });
        });
    },

    /**
     * questionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        QuestionModel.findByIdAndRemove(id, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the question.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

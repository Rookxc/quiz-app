var PlayModel = require('../models/playModel.js');

/**
 * playController.js
 *
 * @description :: Server-side logic for managing plays.
 */
module.exports = {

    /**
     * playController.list()
     */
    list: function (req, res) {
        PlayModel.find(function (err, plays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting play.',
                    error: err
                });
            }

            return res.json(plays);
        });
    },


    /**
    * playController.getten()
    */
    //Gets 10 random questions from database (http://localhost:3001/questions) + Start timer! TODO
    getten: function(req, res){
        const fetch = require('node-fetch');
        var url = 'http://localhost:3001/questions/'
        let startingTime = Date.now();
        var question, correct_a, incorrect_a;

        fetch(url)
            .then(res => res.json())
            .then(data =>{
                var obj = JSON.parse(JSON.stringify({data}));  
                
                //Generate random number between: 0 and data.length
                const min = 0;
                const max = data.length;            
                
                var tenQuestionArray = new Array(0);
                
                for(let i = 0; i < 10; i++){
                    const rnd = parseInt(min + Math.random() * (max - min));
                    question = obj["data"][rnd];
                    //console.log(question);
                    
                    tenQuestionArray.push(question);
                    //console.log(i + "aa" + JSON.stringify(tenQuestionArray[i]));
                }
                
                res.send({tenQuestionArray});
                //dostop do arraya :  tenQuestionArray[i].correct / .question / .incorrect
        })
    },

    /**
     * playController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PlayModel.findOne({_id: id}, function (err, play) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting play.',
                    error: err
                });
            }

            if (!play) {
                return res.status(404).json({
                    message: 'No such play'
                });
            }

            return res.json(play);
        });
    },

    /**
     * playController.create()
     */
    create: function (req, res) {
        var play = new PlayModel({
			userID : req.body.userID,
			score : req.body.score,
			startingTime : req.body.startingTime,
			endingTime : req.body.endingTime,
            correct:  req.body.correct,
            incorrect: req.body.incorrect
        });

        play.save(function (err, play) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating play',
                    error: err
                });
            }

            return res.status(201).json(play);
        });
    },

    /**
     * playController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PlayModel.findOne({_id: id}, function (err, play) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting play',
                    error: err
                });
            }

            if (!play) {
                return res.status(404).json({
                    message: 'No such play'
                });
            }

            play.userID = req.body.userID ? req.body.userID : play.userID;
			play.score = req.body.score ? req.body.score : play.score;
			play.startingTime = req.body.startingTime ? req.body.startingTime : play.startingTime;
			play.endingTime = req.body.endingTime ? req.body.endingTime : play.endingTime;
			
            play.save(function (err, play) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating play.',
                        error: err
                    });
                }

                return res.json(play);
            });
        });
    },

    /**
     * playController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PlayModel.findByIdAndRemove(id, function (err, play) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the play.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

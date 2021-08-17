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
    * playController.play()
    */
    //Pridobi 10 vprašanj (jih shran v nek array) + štarti čas + 
    play: function(req, res){
        //In miliseconds (/1000 => seconds)
        let startingTime = Date.now();
        
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
			endingTime : req.body.endingTime
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

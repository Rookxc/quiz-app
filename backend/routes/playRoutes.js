var express = require('express');
var router = express.Router();
var playController = require('../controllers/playController.js');

/*
 * GET
 */
router.get('/', playController.list);
router.get('/getten', playController.getten);
router.get('/calculate/:id', playController.calculate);
router.get('/getuser/:id', playController.getuser);

router.get('/score', playController.sortByScore);
router.get('/correct', playController.sortByCorrect);
router.get('/time', playController.sortByFastestTime);

router.get('/today', playController.sortByToday);
router.get('/thishour', playController.sortByThisHour);


/*
 * GET
 */
router.get('/:id', playController.show);

/*
 * POST
 */
router.post('/', playController.create);

/*
 * PUT
 */
router.put('/:id', playController.update);

/*
 * DELETE
 */
router.delete('/:id', playController.remove);

module.exports = router;

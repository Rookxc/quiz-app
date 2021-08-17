var express = require('express');
var router = express.Router();
var playController = require('../controllers/playController.js');

/*
 * GET
 */
router.get('/', playController.list);
router.get('/play', playController.play);
router.get('/getten', playController.getten);
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

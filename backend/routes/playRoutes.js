var express = require('express');
var router = express.Router();
var playController = require('../controllers/playController.js');

/*
 * GET
 */
router.get('/', playController.list);
router.get('/getten', playController.getten);
router.get('/calculate/:id', playController.calculate);
router.get('/getuser/:id', playController.getuser)
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

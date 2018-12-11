 /* jshint esversion: 6 */
const router = require('express').Router();
var thinking_controller = require('../controllers/thinking');

/* CRUD thinking APIs. */

router.post('/create', thinking_controller.thinking_create);

router.get('/:id', thinking_controller.thinking_get_by_user_date);

router.get('/', thinking_controller.thinking_get_all_thinkings);

// router.put('/:id', thinking_controller.thinking_update_by_user_date);

// router.delete('/:id', thinking_controller.thinking_delete_by_user_date);


module.exports = router;
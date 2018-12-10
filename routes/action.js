 /* jshint esversion: 6 */
const router = require('express').Router();
var action_controller = require('../controllers/action');

/* CRUD action APIs. */

router.post('/create', action_controller.action_create);

router.get('/:id', action_controller.action_get_by_user_date);

// router.get('/', action_controller.action_get_all_actions);

// router.put('/:id', action_controller.action_update_by_user_date);

// router.delete('/:id', action_controller.action_delete_by_user_date);


module.exports = router;
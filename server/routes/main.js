import { Router } from 'express';
import { IsAuth } from '../auth';
var router = Router();

/* GET home page. */
router.get('/', IsAuth, function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;

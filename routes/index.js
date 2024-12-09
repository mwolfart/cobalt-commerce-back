var express = require('express');
const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({ message: 'Service healthy' });
});

module.exports = router;

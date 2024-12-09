var express = require('express');
const router = express.Router();

router.get('/api/v1/products', (req, res) => {
  res.status(200).json([{ name: 'Eagle T-Shirt' }, { name: 'Lion T-Shirt' }]);
});

module.exports = router;

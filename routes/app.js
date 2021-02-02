const { Router } = require('express');
const router = Router();
const timestampToUtc = require('../utils/timestampToUtc');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/timestamp/1451001600000', (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
})

router.post('/api/timestamp/:date?', (req, res) => {
  const { date, unix } = req.body;
  if (date) {
    const timestamp = new Date(date).getTime();
    if (!timestamp) {
      res.json({ error : "Invalid Date" });
    } else {
      const utc = timestampToUtc(timestamp);
      res.json({ unix: timestamp, utc: utc });
    }
  } else if (date === '') {
    const timestamp = new Date().getTime();
    const utc = timestampToUtc(timestamp);
    res.json({ unix: timestamp, utc: utc });
  } else {
    const utc = timestampToUtc(+unix);
    res.json({ unix: +unix, utc: utc });
  }
})

module.exports = router;
const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, (err: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})


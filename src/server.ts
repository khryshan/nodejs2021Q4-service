
import { PORT, HOST }  from './common/config';
import app from './app';

app.listen(PORT, HOST, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  };
})


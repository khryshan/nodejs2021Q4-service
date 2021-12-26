
import { PORT }  from './common/config';
import app from './app';

app.listen(PORT, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  };
})



import { PORT, FASTIFY_HOST }  from './common/config';
import app from './app';

app.listen(PORT, FASTIFY_HOST, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  };
})


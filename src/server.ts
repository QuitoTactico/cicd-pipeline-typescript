import app from './app';

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});

const { readFile } = require('node:fs/promises');
const { join } = require('node:path');

module.exports = async function favicon(req, res) {
  const image = await readFile(join(process.cwd(), 'assets/brand/cbk-favicon-96.png'));
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(image);
};

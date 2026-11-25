const { readFile } = require('node:fs/promises');
const { join } = require('node:path');

module.exports = async function socialLogo(req, res) {
  const image = await readFile(join(process.cwd(), 'assets/brand/cbk-social-1200x630.jpg'));
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(image);
};

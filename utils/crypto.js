const crypto = require('crypto');

// Replace 'my-32-byte-secret-key' with your own secret key
const secretKey = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16); // Generate a new IV for each encryption

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const [ivHex, encryptedHex] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(ivHex, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedHex, 'hex')), decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };

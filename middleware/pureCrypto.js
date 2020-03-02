require('dotenv').config()
const crypto = require('crypto');

const key = crypto.scryptSync(process.env.CRYPTO_KEY, 'salt', Number(process.env.SALT_VALUE));
const iv = Buffer.alloc(16, 0)

const pureCrypto = (method, value) => {
	if (method == "encrypt") {
		let crypted = ''
		const cipher = crypto.createCipheriv(process.env.ALGO, key, iv)
		cipher.on('readable', () => {
			let chunk;
			while (null !== (chunk = cipher.read())) {
				crypted += chunk.toString('hex');
			}
		})
		cipher.write(value);
		cipher.end()
		return crypted
	} else if (method == "decrypt") {
		let decrypted = ''
		const decipher = crypto.createDecipheriv(process.env.ALGO, key, iv)
		decipher.on('readable', () => {
			let chunk;
			while (null !== (chunk = decipher.read())) {
				decrypted += chunk.toString('utf8');
			}
		})
		decipher.write(value, 'hex');
		decipher.end()
		return decrypted
	}
}

module.exports = { pureCrypto }

const encrypted = '96e4af8254c3eec0ef26b4ae86064c0a'

console.log(pureCrypto("encrypt", "test"))
console.log(pureCrypto("decrypt", encrypted))

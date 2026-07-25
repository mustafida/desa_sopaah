const crypto = require('crypto');
const mysql = require('mysql2/promise');

function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

async function main() {
    const newUsername = 'Sopaah072026';
    const newPassword = '072026Sopaah';
    const connection = await mysql.createConnection('mysql://root:@localhost:3306/sopaah_db');
    
    try {
        const hashed = hashPassword(newPassword);
        // We update the first user (id=1) or where username is 'admin' or 'Sopaah072026'
        await connection.query('UPDATE admin_users SET username = ?, password_hash = ? WHERE id = 1', [newUsername, hashed]);
        console.log(`\n✅ Username dan Password admin berhasil diubah!`);
        console.log(`👤 Username baru Anda: ${newUsername}`);
        console.log(`🔑 Password baru Anda: ${newPassword}`);
        console.log(`🔒 Hasil Hashing: ${hashed}\n`);
    } catch(e) {
        console.error(e);
    }
    
    await connection.end();
}
main();

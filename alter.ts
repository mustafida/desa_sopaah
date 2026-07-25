import { db } from './src/lib/server/db/index';
import { sql } from 'drizzle-orm';
async function main() {
    try {
        await db.execute(sql`ALTER TABLE pengaduan ADD COLUMN is_read BOOLEAN DEFAULT FALSE NOT NULL`);
        console.log('Added is_read');
    } catch (e) {
        console.log('is_read may already exist', e.message);
    }
    try {
        await db.execute(sql`ALTER TABLE pengaduan MODIFY COLUMN no_hp VARCHAR(20) NULL`);
        console.log('Modified no_hp');
    } catch (e) {
        console.log('no_hp may already be nullable', e.message);
    }
    process.exit(0);
}
main();

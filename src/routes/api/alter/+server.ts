import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        await db.execute(sql`ALTER TABLE pengaduan ADD COLUMN is_read BOOLEAN DEFAULT FALSE NOT NULL`);
    } catch(e) { console.log(e); }
    try {
        await db.execute(sql`ALTER TABLE pengaduan MODIFY COLUMN no_hp VARCHAR(20) NULL`);
    } catch(e) { console.log(e); }
    return json({ success: true });
}

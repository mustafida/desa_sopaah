import { db } from './db';
import { sessions, adminUsers } from './db/schema';
import { eq, lt } from 'drizzle-orm';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import type { Cookies } from '@sveltejs/kit';

const SESSION_COOKIE_NAME = 'session_id';
const SESSION_EXPIRY_DAYS = 7;

// --- Password Hashing ---

export function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
	const [salt, hash] = stored.split(':');
	const hashBuffer = Buffer.from(hash, 'hex');
	const derivedKey = scryptSync(password, salt, 64);
	return timingSafeEqual(hashBuffer, derivedKey);
}

// --- Session Management ---

function generateSessionId(): string {
	return randomBytes(32).toString('hex');
}

export async function createSession(userId: number, cookies: Cookies): Promise<string> {
	const sessionId = generateSessionId();
	const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

	await db.insert(sessions).values({
		id: sessionId,
		userId,
		expiresAt
	});

	cookies.set(SESSION_COOKIE_NAME, sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false, // set true in production with HTTPS
		maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60
	});

	return sessionId;
}

export async function validateSession(cookies: Cookies) {
	const sessionId = cookies.get(SESSION_COOKIE_NAME);
	if (!sessionId) return null;

	const result = await db
		.select({
			sessionId: sessions.id,
			userId: sessions.userId,
			expiresAt: sessions.expiresAt,
			username: adminUsers.username,
			namaLengkap: adminUsers.namaLengkap
		})
		.from(sessions)
		.innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
		.where(eq(sessions.id, sessionId))
		.limit(1);

	if (result.length === 0) return null;

	const session = result[0];

	// Check if session has expired
	if (new Date(session.expiresAt) < new Date()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		return null;
	}

	return {
		userId: session.userId,
		username: session.username,
		namaLengkap: session.namaLengkap
	};
}

export async function deleteSession(cookies: Cookies): Promise<void> {
	const sessionId = cookies.get(SESSION_COOKIE_NAME);
	if (sessionId) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
	}
}

// Cleanup expired sessions (optional, can be called periodically)
export async function cleanupExpiredSessions(): Promise<void> {
	await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

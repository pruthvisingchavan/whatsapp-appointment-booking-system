const logger = require('../utils/logger');

const sessions = new Map();
const TIMEOUT_MS = parseInt(process.env.SESSION_TIMEOUT_MS, 10) || 30 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  let cleared = 0;
  for (const [key, session] of sessions.entries()) {
    if (now - session.lastActivity > TIMEOUT_MS) {
      sessions.delete(key);
      cleared++;
    }
  }
  if (cleared > 0) logger.debug(`Session GC: cleared ${cleared} expired sessions.`);
}, 10 * 60 * 1000);

const sessionService = {
  get(phone) {
    const session = sessions.get(phone);
    if (!session) return null;
    if (Date.now() - session.lastActivity > TIMEOUT_MS) {
      sessions.delete(phone);
      return null;
    }
    return session;
  },

  create(phone) {
    const session = { step: 'IDLE', data: {}, pendingAction: null, pendingRefId: null, lastActivity: Date.now() };
    sessions.set(phone, session);
    return session;
  },

  update(phone, updates) {
    const session = sessions.get(phone);
    if (!session) return null;
    const updated = { ...session, ...updates, lastActivity: Date.now() };
    sessions.set(phone, updated);
    return updated;
  },

  destroy(phone) {
    sessions.delete(phone);
  },

  getOrCreate(phone) {
    return this.get(phone) || this.create(p
const moment = require('moment');

const DATE_FORMAT = 'DD-MM-YYYY';
const TIME_FORMAT = 'HH:mm';
const TIME_FORMAT_12 = 'hh:mm A';

function validateDate(dateStr) {
  if (!dateStr) return { valid: false, error: 'Date is required.' };

  const formats = [DATE_FORMAT, 'YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY'];
  let parsed = null;

  for (const fmt of formats) {
    const m = moment(dateStr, fmt, true);
    if (m.isValid()) { parsed = m; break; }
  }

  if (!parsed) {
    return { valid: false, error: `Invalid date. Please use DD-MM-YYYY format (e.g., 25-05-2025).` };
  }

  if (parsed.isBefore(moment().startOf('day'))) {
    return { valid: false, error: 'Appointment date cannot be in the past.' };
  }

  return { valid: true, normalized: parsed.format('YYYY-MM-DD'), display: parsed.format('dddd, DD MMMM YYYY') };
}

function validateTime(timeStr) {
  if (!timeStr) return { valid: false, error: 'Time is required.' };

  const m24 = moment(timeStr, TIME_FORMAT, true);
  const m12 = moment(timeStr, TIME_FORMAT_12, true);
  const m12_lower = moment(timeStr.toUpperCase(), TIME_FORMAT_12, true);

  const parsed = m24.isValid() ? m24 : m12.isValid() ? m12 : m12_lower.isValid() ? m12_lower : null;

  if (!parsed) {
    return { valid: false, error: `Invalid time. Please use HH:MM (e.g., 14:30) or 02:30 PM format.` };
  }

  return { valid: true, normalized: parsed.format(TIME_FORMAT), display: parsed.format(TIME_FORMAT_12) };
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
  const e164 = /^\+?[1-9]\d{7,14}$/;
  if (!e164.test(cleaned)) {
    return { valid: false, error: 'Invalid phone number format.' };
  }
  const normalized = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  return { valid: true, normalized };
}

function formatAppointmentTime(date, time) {
  return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').format('dddd, DD MMMM YYYY [at] hh:mm A');
}

module.exports = { validateDate, validateTime, validatePhone, formatAppointmentTime };
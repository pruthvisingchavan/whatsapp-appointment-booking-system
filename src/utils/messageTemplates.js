const TEMPLATES = {
  WELCOME: () =>
    `👋 *Welcome to our Appointment Booking Service!*\n\n` +
    `I'll help you book an appointment in just a few steps.\n\n` +
    `Let's start — *what is your full name?*`,

  ASK_PHONE: (name) =>
    `Nice to meet you, *${name}*! 😊\n\n` +
    `Please share your *WhatsApp mobile number* (with country code, e.g. +91XXXXXXXXXX):`,

  ASK_DATE: () =>
    `📅 *What date would you like the appointment?*\n\nPlease use *DD-MM-YYYY* format (e.g. 28-05-2025):`,

  ASK_TIME: (date) =>
    `⏰ You chose *${date}*.\n\n*What time works best for you?*\n\nUse *HH:MM* (24h) or *HH:MM AM/PM* format (e.g. 14:30 or 02:30 PM):`,

  ASK_SERVICE: () =>
    `💼 *What service do you require?*\n\nPlease type one of the following or describe your need:\n` +
    `• Consultation\n• Follow-up\n• General Checkup\n• Other (describe briefly)`,

  ASK_NOTES: () =>
    `📝 Any *additional notes or special requests?*\n\n_(Type *skip* if none)_`,

  CONFIRM_DETAILS: (data) =>
    `✅ *Please confirm your appointment details:*\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📱 *Mobile:* ${data.phone}\n` +
    `📅 *Date:* ${data.displayDate}\n` +
    `⏰ *Time:* ${data.displayTime}\n` +
    `💼 *Service:* ${data.service}\n` +
    `📝 *Notes:* ${data.notes || 'None'}\n\n` +
    `Reply *YES* to confirm or *NO* to start over.`,

  BOOKED: (data, refId) =>
    `🎉 *Appointment Confirmed!*\n\n` +
    `Your appointment has been successfully booked.\n\n` +
    `🔖 *Reference ID:* ${refId}\n` +
    `📅 *Date & Time:* ${data.displayDate} at ${data.displayTime}\n` +
    `💼 *Service:* ${data.service}\n\n` +
    `To *reschedule*, reply: RESCHEDULE ${refId}\n` +
    `To *cancel*, reply: CANCEL ${refId}\n\n` +
    `See you soon! 😊`,

  RESCHEDULE_PROMPT: (refId) =>
    `🔄 *Rescheduling Appointment ${refId}*\n\n` +
    `Please provide the new date (*DD-MM-YYYY*):`,

  RESCHEDULE_TIME: (date) =>
    `📅 New date: *${date}*\n\nWhat is the *new time?* (HH:MM or HH:MM AM/PM):`,

  RESCHEDULED: (data, refId) =>
    `✅ *Appointment Rescheduled!*\n\n` +
    `🔖 *Reference:* ${refId}\n` +
    `📅 *New Date & Time:* ${data.displayDate} at ${data.displayTime}\n\n` +
    `To cancel, reply: CANCEL ${refId}`,

  CANCEL_CONFIRM: (refId) =>
    `❓ Are you sure you want to *cancel* appointment *${refId}*?\n\nReply *YES* to confirm cancellation or *NO* to keep it.`,

  CANCELLED: (refId) =>
    `❌ *Appointment ${refId} has been cancelled.*\n\nTo book a new appointment, just say *Hi* or *Book*.`,

  NOT_FOUND: (refId) =>
    `⚠️ We could not find an appointment with reference *${refId}*.\n\nPlease check the ID and try again.`,

  DUPLICATE_SLOT: (date, time) =>
    `⚠️ Sorry, the slot *${date} at ${time}* is already booked.\n\nPlease choose a different date or time:`,

  INVALID_DATE: (error) =>
    `⚠️ *${error}*\n\nPlease try again (DD-MM-YYYY format):`,

  INVALID_TIME: (error) =>
    `⚠️ *${error}*\n\nPlease try again (e.g. 14:30 or 02:30 PM):`,

  ERROR: () =>
    `😕 Something went wrong on our end. Please try again in a moment.\n\nIf the issue persists, contact us directly.`,

  UNRECOGNIZED: () =>
    `🤔 I didn't understand that.\n\nTo book an appointment, type *Book* or *Hi*.\nTo reschedule: *RESCHEDULE <refId>*\nTo cancel: *CANCEL <refId>*`,
};

module.exports = TEMPLATES;
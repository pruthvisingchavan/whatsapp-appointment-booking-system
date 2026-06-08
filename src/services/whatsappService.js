const twilio = require('twilio');
const logger = require('../utils/logger');

class WhatsAppService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.from = process.env.TWILIO_WHATSAPP_NUMBER;
  }

  async sendMessage(to, body) {
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    try {
      const message = await this.client.messages.create({
        from: this.from,
        to: formattedTo,
        body,
      });
      logger.info(`WhatsApp message sent to ${formattedTo}. SID: ${message.sid}`);
      return { success: true, sid: message.sid };
    } catch (err) {
      logger.error(`Failed to send WhatsApp to ${formattedTo}: ${err.message}`);
      throw new Error(`WhatsApp send failed: ${err.message}`);
    }
  }

  validateWebhookSignature(req) {
    const twilioSignature = req.headers['x-twilio-signature'];
    if (!twilioSignature) return false;

    const url = `${process.env.BASE_URL}/webhook/whatsapp`;
    return twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN,
      twilioSignature,
      url,
      req.body
    );
  }
}

module.exports = new WhatsAppService();
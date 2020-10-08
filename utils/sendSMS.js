const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;

const client = require("twilio")(accountSid, authToken);

module.exports = {
  async sendOtpSms(number) {
    try {
      await client.verify.services.create({
        friendlyName: "Shaligram",
      });

      await client.verify
        .services(serviceId)
        .verifications.create({ to: number, channel: "sms" });
    } catch (err) {
      console.log(err);
    }
  },

  async verifyOtpSms(number, token) {
    try {
      const verification_check = await client.verify
        .services(serviceId)
        .verificationChecks.create({ to: number, code: token });
      console.log("verification check ids", verification_check);
      return verification_check.valid;
    } catch (err) {
      console.log(err);
    }
  },
};

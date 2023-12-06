const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

const getEmailTemplage = (header, body, button, footer) => {
  return `
    <html>
      <body>
        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
          <tbody>
            <tr align="center">
              <td>
                <table border="0" cellspacing="0" cellpadding="0" style="padding-bottom:20px;max-width:516px;min-width:220px">
                  <tbody>
                    <tr>
                      <td>
                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:32px 20px" align="center">
                          <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-size:24px;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                              ${header}
                          </div>
                          <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">
                              ${body}
                              <div style="padding-top:32px;text-align:center">
                                  <a href="${button.link}" style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:16px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline-block;padding:10px 24px;background-color:#8b5cf6;border-radius:5px;min-width:90px" target="_blank">${button.text}</a>
                              </div>
                          </div>
                          <div style="padding-top:20px;font-size:12px;line-height:16px;color:#5f6368;letter-spacing:0.3px;text-align:center">
                              ${footer}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.urls.ui}/auth/reset-password?token=${token}`;
  const htmlContent = getEmailTemplage(
    'Dear user',
    'To reset your password, click on this link.',
    { link: resetPasswordUrl, text: 'Reset Password' },
    'If you did not request any password resets, then ignore this email.'
  );
  await sendEmail(to, subject, '', htmlContent);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendCreatePasswordEmail = async (to, token) => {
  const subject = 'Create password';
  const resetPasswordUrl = `${config.urls.ui}/auth/reset-password?token=${token}`;
  const htmlContent = getEmailTemplage(
    'Dear user',
    'Necesitas crear un password',
    { link: resetPasswordUrl, text: 'Create password' },
    'If you did not request any password resets, then ignore this email.'
  );
  await sendEmail(to, subject, '', htmlContent);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `${config.urls.ui}/auth/verify-email?token=${token}`;
  const htmlContent = getEmailTemplage(
    'Dear user',
    ' To verify your email, click on this link:',
    { link: verificationEmailUrl, text: 'Verify Email' },
    'If you did not create an account, then ignore this email'
  );
  await sendEmail(to, subject, '', htmlContent);
};

module.exports = {
  transport,
  sendEmail,
  sendCreatePasswordEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};

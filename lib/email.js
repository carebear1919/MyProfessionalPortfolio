import nodemailer from 'nodemailer';

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '587',
  SMTP_USER,
  SMTP_PASS,
  CONTACT_EMAIL = 'jianhilario@gmail.com',
  DISABLE_EMAIL_SEND,
} = process.env;

function createTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function buildHtml({ name, email, subject, message }) {
  const subj = subject || '(no subject)';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="background-color:#141414;border-radius:8px;overflow:hidden;border:1px solid #2a2a2a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 32px 0 32px;">
                    <h1 style="margin:0;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b8b8b;font-family:inherit;">New Contact Message</h1>
                    <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0;">
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#6b6b6b;">Name</span>
                          <p style="margin:4px 0 0 0;font-size:15px;color:#e8e8e8;font-weight:400;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#6b6b6b;">Email</span>
                          <p style="margin:4px 0 0 0;font-size:15px;color:#e8e8e8;font-weight:400;"><a href="mailto:${email}" style="color:#90b0ff;text-decoration:none;">${email}</a></p>
                        </td>
                      </tr>
                      ${subject ? `<tr><td style="padding-bottom:16px;"><span style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#6b6b6b;">Subject</span><p style="margin:4px 0 0 0;font-size:15px;color:#e8e8e8;font-weight:400;">${subject}</p></td></tr>` : ''}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 32px 32px;">
                    <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 16px 0;">
                    <span style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#6b6b6b;">Message</span>
                    <p style="margin:8px 0 0 0;font-size:14px;line-height:1.7;color:#cfcfcf;font-weight:400;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:16px;text-align:center;">
              <span style="font-size:11px;color:#4a4a4a;font-weight:400;">Sent from your portfolio contact form</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactEmail({ name, email, subject, message }) {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP_USER and SMTP_PASS must be set');
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${subject || '(no subject)'}`,
    html: buildHtml({ name, email, subject, message }),
  };

  if (DISABLE_EMAIL_SEND === 'true' || DISABLE_EMAIL_SEND === '1') {
    console.log('[EMAIL DISABLED] Would have sent:', JSON.stringify(mailOptions, null, 2));
    return { sent: false, simulated: true };
  }

  const transporter = createTransporter();
  const info = await transporter.sendMail(mailOptions);
  console.log('[EMAIL SENT] Message ID:', info.messageId);
  return { sent: true, messageId: info.messageId };
}

export function validateContactBody(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push('Name is required');
  }
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push('A valid email is required');
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  return errors;
}

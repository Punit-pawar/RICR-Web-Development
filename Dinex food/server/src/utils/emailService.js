import sendEmail from "../config/email.js";

export const sendOTPEmail = async (to, otp) => {
  const subject = "OTP to reset your Cravings Password";

  const message = `
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="padding:20px; text-align:center; background-color:#0d6efd; border-radius:8px 8px 0 0;">
              <h2 style="margin:0; color:#ffffff;">One Time Password</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 15px;">
                Hello,
              </p>

              <p style="font-size:16px; margin:0 0 20px;">
                Use the following One-Time Password (OTP) to complete your verification:
              </p>

              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <span style="
                  display:inline-block;
                  padding:15px 30px;
                  font-size:28px;
                  letter-spacing:6px;
                  color:#0d6efd;
                  background-color:#f1f5ff;
                  border:1px dashed #0d6efd;
                  border-radius:6px;
                  font-weight:bold;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:14px; color:#666666; margin:0 0 10px;">
                This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
              </p>

              <p style="font-size:14px; color:#666666; margin:0;">
                If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:15px; text-align:center; background-color:#f8f9fa; border-radius:0 0 8px 8px;">
              <p style="font-size:12px; color:#999999; margin:0;">
                ©${new Date().getFullYear()} Cravings India Pvt. Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
    `;

  await sendEmail(to, subject, message);
};
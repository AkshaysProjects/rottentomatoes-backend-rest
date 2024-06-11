export const getVerificationEmailHtml = (
  name: string,
  verificationLink: string,
  resendLink: string
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      text-align: center;
    }
    h1 {
      color: #333333;
    }
    p {
      color: #666666;
      line-height: 1.5;
    }
    a {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      color: #ffffff;
      background-color: #FF4500; /* Red color */
      border-radius: 5px;
    }
    a:hover {
      background-color: #cc3700;
    }
    .gap {
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      color: #999999;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Email Verification</h1>
    <p>Hi ${name}, Thank you for registering. Please verify your email by clicking the button below:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p class="gap">This link is only valid for 10 minutes. If it has expired, please click the link below to resend the verification email:</p>
    <a href="${resendLink}">Resend Verification Email</a>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} RottenTomatoes. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

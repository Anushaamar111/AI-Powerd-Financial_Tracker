// filepath: c:\Users\anush\Desktop\mini_expense_tracker\client\src\utils\cookieUtils.js
export const getAccessToken = () => {
    const match = document.cookie.match(/(^| )access_token=([^;]+)/);
    return match ? match[2] : null;
  };
  
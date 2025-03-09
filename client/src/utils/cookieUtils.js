// filepath: c:\Users\anush\Desktop\mini_expense_tracker\client\src\utils\cookieUtils.js
export const getAccessToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
  };
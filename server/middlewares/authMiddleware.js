// filepath: c:\Users\anush\Desktop\mini_expense_tracker\server\middlewares\authMiddleware.js
import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Invalid or expired token" });

      req.user = decoded; // Attach the decoded token payload to req.user
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;

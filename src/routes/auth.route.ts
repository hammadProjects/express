import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import validateRequest from "../middlewares/validateRequest";
import * as authSchema from "../schemas/auth.schema";
import { limiter } from "../utils/rateLimiter";
import { isAuthenticated } from "../middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  limiter("Too many attempts to create an account. Please Try again later.")
  //   validateRequest(signUpSchema),
);

authRouter.post(
  "/sign-in",
  limiter("Too many attempts to login. Please try again later."),
  // validateRequest(signInSchema),
  authController.signIn
);

authRouter.post("/sign-out", authController.signOut);

// verify otp
authRouter.post(
  "/otp/verify",
  // validateRequest(verifyOTPSchema),
  authController.verifyOtp
);
authRouter.post(
  "/otp/resend",
  limiter("Too many OTP verification attempts. Please try again later."),
  // validateRequest(resendOTPSchema),
  authController.resendVerifyOtp
);

// reset password
authRouter.post(
  "/password/forgot",
  limiter("Too many forgot password attempts. Please try again later."),
  // validateRequest(forgetPasswordSchema),
  authController.forgotPassword
);
authRouter.post(
  "/password/reset/:token",
  //   validateRequest(resetPasswordSchema),
  authController.resetPassword
);

// validate token
authRouter.put(
  "/token/validate",
  isAuthenticated,
  authController.validateToken
);

export default authRouter;

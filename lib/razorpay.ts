import Razorpay from "razorpay"

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn(
    "Razorpay keys not set. Payment features will not work. " +
    "Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file."
  )
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
})

import Razorpay from "razorpay"

let _instance: Razorpay | null = null

function getKeys() {
  return {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  }
}

export function getRazorpay(): Razorpay {
  if (_instance) return _instance

  const { keyId, keySecret } = getKeys()

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay keys not configured. " +
        "Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment."
    )
  }

  _instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })

  return _instance
}

export function isRazorpayConfigured(): boolean {
  const { keyId, keySecret } = getKeys()
  return !!keyId && !!keySecret
}

// @deprecated — prefer getRazorpay() to avoid build-time crashes
export const razorpay = new Proxy({} as Razorpay, {
  get(_, prop) {
    const instance = getRazorpay()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (instance as any)[prop]
  },
})

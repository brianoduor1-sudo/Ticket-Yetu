// paymentService.js
// Simulated payment processing. Real gateway integration (M-Pesa Daraja API,
// Stripe) needs server-side logic and business credentials — explicitly
// out of scope per the project doc. This exists so the checkout UX,
// booking flow, and error handling can all be built and demoed now,
// with a real gateway swapped in behind these same function signatures later.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function reference(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export const paymentService = {
  // outcome: 'success' | 'decline' — lets the UI deliberately test both
  // paths rather than relying on random chance during development/demo.
  async payWithMpesa({ phone, amount, outcome = 'success' }) {
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      return { success: false, error: 'Enter a valid M-Pesa phone number.' };
    }

    // Simulates the STK push round-trip: push sent, user enters PIN on phone.
    await delay(2200);

    if (outcome === 'decline') {
      return { success: false, error: 'Payment was declined or cancelled on your phone.' };
    }

    return {
      success: true,
      method: 'mpesa',
      reference: reference('MPESA'),
      amount,
    };
  },

  async payWithCard({ cardNumber, expiry, cvc, amount, outcome = 'success' }) {
    const digits = (cardNumber || '').replace(/\s/g, '');
    if (digits.length < 12 || !expiry || !cvc) {
      return { success: false, error: 'Check your card details and try again.' };
    }

    await delay(1600);

    if (outcome === 'decline') {
      return { success: false, error: 'Card declined by issuing bank.' };
    }

    return {
      success: true,
      method: 'card',
      reference: reference('CARD'),
      amount,
    };
  },
};

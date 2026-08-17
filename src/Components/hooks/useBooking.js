import { useState } from 'react';
import { bookingService } from '../services/bookingService';
import { useEvents } from './useEvents';
import { useNotifications } from './useNotifications';

// Flow: 'details' -> (free? straight to booking) or (paid? 'checkout' -> booking)
export function useBooking(event) {
  const { refresh } = useEvents();
  const { refresh: refreshNotifications } = useNotifications();
  const [quantity, setQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [step, setStep] = useState('details'); // 'details' | 'checkout'
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success, booking?, error? }

  const available = event ? bookingService.getAvailability(event) : 0;
  const totalPrice = event ? event.price * quantity : 0;

  function proceed() {
    if (!event) return;
    if (event.price === 0) {
      finalize({ paymentMethod: 'free', paymentReference: null });
    } else {
      setStep('checkout');
    }
  }

  function finalize({ paymentMethod, paymentReference }) {
    setSubmitting(true);
    const outcome = bookingService.create({
      eventId: event.id,
      quantity,
      attendeeName,
      attendeeEmail,
      paymentMethod,
      paymentReference,
    });
    setResult(outcome);
    setSubmitting(false);

    if (outcome.success) {
      refresh(); // pick up updated quantityBooked
      refreshNotifications(); // pick up the notification bookingService already created
    }

    return outcome;
  }

  function handlePaymentSuccess({ method, reference }) {
    finalize({ paymentMethod: method, paymentReference: reference });
  }

  function cancelCheckout() {
    setStep('details');
  }

  return {
    quantity, setQuantity,
    attendeeName, setAttendeeName,
    attendeeEmail, setAttendeeEmail,
    available, totalPrice,
    step, proceed, handlePaymentSuccess, cancelCheckout,
    submitting, result,
  };
}
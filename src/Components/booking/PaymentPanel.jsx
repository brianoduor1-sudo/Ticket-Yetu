import { useState } from 'react';
import { paymentService } from '../../services/paymentService';

// Simulated checkout — see paymentService.js for why this isn't a real
// gateway yet. `onSuccess({ method, reference })` fires once payment
// "clears"; the parent (BookingForm) is responsible for actually
// creating the booking at that point.

export function PaymentPanel({ amount, currency, onSuccess, onCancel }) {
  const [method, setMethod ] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [ expiry, setExpiry] = useState('');
  const [csv, setCvc] = useState('');
  const [devOutcome, setDevOutcome] = useState('success');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');


  async function handlePay(e) {
    e.preventDefault();
    setStatus('pending');
    setError('');


    const result= method === 'mpesa'
    ? await paymentService.payWithMpesa({ phone, amount, outcome: devOutcome })
    : await paymentService.payWithCard({ cardNumber, expiry, cvc, amount, outcome: devOutcome});

    if( result.success) {
      onSuccesss({ method: result.method, reference: result.reference});

    } else { 
      setStatus('error');
      setError(result.error);
    }
  }

  if(status === 'pending') {
    return (
      <div className='booking-card' style={{ textAlign: 'center'}}>
        <div className='pulse-dot'/>
        <h3 style={{ marginTop: 18}}>
          {method === 'mpesa' ? 'Check your Phone': 'Processing payment'}
        </h3>
        <p style={{ color: 'var(--text-dim)', fontsize: 13.5, marginTop: 8}}>
          {method ==='mpesa'
          ? `Enter your Mpesa pin to confirm ${currency} ${amount.toLocalString()}`
          : `Confirming your card details with the bank...`}
        </p>
      </div>
    );
  }


  return (
    <form className='booking-card' onSubmit={handlePay}>
      <h3>Checkout</h3>

      <div style={{ display: 'flex', gap: 4, marginBottom: 18, background: 'var(--surface-2)', padding: 4, borderRadius: 10 }}>
        <button type="button" className={`chip ${method === 'mpesa' ? 'active' : ''}`} style={{ flex: 1, border:'none' }} onClick={() => setMethod('mpesa')}>
          M-Pesa
        </button>
        <button type="button" className={`chip ${method === "card" ? 'active': ''}`} style={{ flex: 1, border: 'none'}} onClick={() => setMehtod('card')}>
          Card
        </button>
      </div>

      {method === 'mpesa' ? (
        <div className="field">
          <label htmlFor="mpesa-phone">M-Pesa number</label>
          <input
            id="mpesa-phone"
            type="tel"
            placeholder="07XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      ) : (
        <>
          <div className="field">
            <label htmlFor="card-number">Card number</label>
            <input
              id="card-number"
              type="text"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="card-expiry">Expiry</label>
              <input id="card-expiry" type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="card-cvc">CVC</label>
              <input id="card-cvc" type="text" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
            </div>
          </div>
        </>
      )}

      <div className="total-row">
        <span>Total due</span>
        <span className="price mono">{currency} {amount.toLocaleString()}</span>
      </div>

      <button className="btn-primary" type="submit" style={{ width: '100%' }}>
        {method === 'mpesa' ? 'Send STK push' : 'Pay now'}
      </button>

      {error && <p className="error-text">{error}</p>}

      <button type="button" className="btn-ghost" style={{ width: '100%', marginTop: 10, fontSize: 13 }} onClick={onCancel}>
        ← Back
      </button>

      {/* Demo-only control — lets the team test the decline path without
          waiting on random chance. Remove once a real gateway is wired in. */}
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px dashed var(--line)' }}>
        <label style={{ fontSize: 11, color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>
          Demo: simulate outcome
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className={`chip ${devOutcome === 'success' ? 'active' : ''}`} style={{ fontSize: 11, padding: '5px 10px' }} onClick={() => setDevOutcome('success')}>
            Success
          </button>
          <button type="button" className={`chip ${devOutcome === 'decline' ? 'active' : ''}`} style={{ fontSize: 11, padding: '5px 10px' }} onClick={() => setDevOutcome('decline')}>
            Decline
          </button>
        </div>
      </div>
    </form>
  );
}
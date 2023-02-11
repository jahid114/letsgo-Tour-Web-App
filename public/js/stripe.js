import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51IT0EUBCxZcGzl0sqvKRjsFPf4R0LAR5wjaysmydtddj6y2uKEj959AdzWIK0vZSF51r7yHcaV82dL0INzGJnfYz00XAAmvGoS'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

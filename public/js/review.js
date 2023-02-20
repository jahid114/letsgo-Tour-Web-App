import axios from 'axios';
import { showAlert } from './alerts';

export const reviewFunc = async (tourId, review, rating) => {
  try {
    console.log('in review function');
    rating = 1 * rating;
    const res = await axios({
      method: 'POST',
      url: `/api/v1/tours/${tourId}/reviews`,
      data: {
        review,
        rating,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      window.location.reload();
      showAlert('success', 'Review Added Successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

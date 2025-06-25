import React, { useState } from 'react';
import axios from 'axios';

const PhonepePage = () => {
  const [amount, setAmount] = useState('100');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);
    setPaymentUrl(null);

    const merchantOrderId = `TX${Date.now()}`;

    try {
      const response = await axios.post('http://localhost:5000/api/payment/initiate-payment', {
        amount: parseInt(amount, 10),
        merchantOrderId,
      });

      console.log('Backend response:', response.data); // Debug log

      const { success, data } = response.data;

      if (success && data?.paymentUrl) {
        console.log("data.paymentUrl",data.paymentUrl)
        setPaymentUrl(data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        setError('Payment initiation failed: Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Error connecting to server';
      setError(errorMessage);
      console.error('Payment error:', errorMessage, error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">PhonePe Payment</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            disabled={loading}
            min="1"
          />
        </div>
        <button
          onClick={initiatePayment}
          disabled={loading || !amount || parseInt(amount, 10) <= 0}
          className={`w-full p-2 rounded text-white font-medium ${
            loading || !amount || parseInt(amount, 10) <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Initiate Payment'}
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            Error: {error}
          </div>
        )}
        {paymentUrl && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            Redirecting to payment page...
          </div>
        )}
      </div>
    </div>
  );
};

export default PhonepePage;
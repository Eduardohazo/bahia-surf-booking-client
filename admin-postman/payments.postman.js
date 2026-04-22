const handlePay = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/payments/create-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "69cda97d8af22af0e065d779",
        }),
      },
    );

    const data = await res.json();

    if (data.data.approvalUrl) {
      window.location.href = data.data.approvalUrl;
    } else {
      alert("Failed to create PayPal order");
    }
  } catch (err) {
    console.error(err);
    alert("Error contacting server");
  }
};


let payBtn = document.querySelector('.pay');
payBtn.addEventListener('click', handlePay);


/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML(userID) {

  return `
  <html>
    <body>

      <!-- Load Stripe.js on your website. -->
       <h1>Loading...</h1>
      <script src="https://js.stripe.com/v3"></script>

     
      <div id="error-message"></div>

      <script>
        (function () {
          var stripe = Stripe('pk_test_51EidCJIDVqkyxy7bMJ2QRq8I82c5yoEOLJJBDATAKTWUBV0cA5DSkGiaFMRTjMqfYiSFMzyLXBnPa5H56QZcghbN00NBOIdLrv');

          window.onload = function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            stripe.redirectToCheckout({
              items: [{ price: '200', quantity: 1 }],

              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: 'http://localhost/success',
              cancelUrl: 'http://localhost/cancel',

              clientReferenceId: '12345678',
            })
              .then(function (result) {
                if (result.error) {
                  // If redirectToCheckout fails due to a browser or network
                  // error, display the localized error message to your customer.
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
          };
        })();
      </script>

    </body>
  </html>
  `;
}
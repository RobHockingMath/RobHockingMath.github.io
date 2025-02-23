document.addEventListener('DOMContentLoaded', function () {
    const currencySwitcher = document.getElementById('currency-switcher');
    if (currencySwitcher) {
      currencySwitcher.addEventListener('change', function () {
        const newCurrency = this.value;
        // Update Snipcart currency and refresh the cart once Snipcart is ready
        if (window.Snipcart && Snipcart.api && Snipcart.api.settings && Snipcart.api.cart) {
          Snipcart.api.settings.set('currency', newCurrency)
            .then(() => Snipcart.api.cart.refresh())
            .then(() => console.log("Currency updated to", newCurrency))
            .catch(err => console.error("Error updating currency:", err));
        } else {
          console.warn("Snipcart not fully loaded yet.");
        }
      });
    }
  });
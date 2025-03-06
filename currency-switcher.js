document.addEventListener('DOMContentLoaded', function () {
    const currencySwitcher = document.getElementById('currency-switcher');

    if (currencySwitcher) {
        // Load saved currency preference (if any)
        const savedCurrency = localStorage.getItem("selectedCurrency");
        if (savedCurrency) {
            currencySwitcher.value = savedCurrency;
        }

        // Listen for currency change
        currencySwitcher.addEventListener('change', function () {
            const newCurrency = this.value;
            localStorage.setItem("selectedCurrency", newCurrency);

            // Ensure Snipcart is loaded before changing currency
            if (window.Snipcart && Snipcart.api && Snipcart.api.session) {
                Snipcart.api.session.setCurrency(newCurrency)
                    .then(() => {
                        console.log("Currency updated to", newCurrency);
                        return Snipcart.api.cart.refresh();
                    })
                    .catch(err => console.error("Error updating currency:", err));
            } else {
                console.warn("Snipcart not fully loaded yet. Retrying in 1 second...");
                setTimeout(() => updateSnipcartCurrency(newCurrency), 1000);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const currencySwitcher = document.getElementById('currency-switcher');
  const priceTag = document.querySelector('.price-tag');
  
  // Read the base price from the data attribute.
  const basePriceUSD = parseFloat(priceTag.dataset.basePrice);
  
  // Define your conversion rates relative to USD.
  const conversionRates = {
    usd: 1,
    cad: 1.25,  // Example: 1 USD = 1.25 CAD
    eur: 0.8,    // Example: 1 USD = 0.8 Euro
    hkd: 7.78,
  };

  function updatePrice() {
    // Determine the selected currency; default to USD.
    const selectedCurrency = (currencySwitcher.value || 'USD').toLowerCase();
    const rate = conversionRates[selectedCurrency] || 1;
    const newPrice = basePriceUSD * rate;
    // Format the new price using Intl.NumberFormat.
    priceTag.textContent = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency.toUpperCase()
    }).format(newPrice);
  }

  // Initial update.
  updatePrice();

  // Update the price when the currency changes.
  if (currencySwitcher) {
    currencySwitcher.addEventListener('change', updatePrice);
  }
});
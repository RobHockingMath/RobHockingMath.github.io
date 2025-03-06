function updateSnipcartLanguage(lang) {
    if (window.Snipcart && Snipcart.api && Snipcart.api.session) {
        // First, get the current currency before changing language
        Snipcart.api.session.get()
            .then(session => {
                const currentCurrency = session.currency; // Preserve the selected currency
                
                // Now update the language
                return Snipcart.api.session.setLanguage(lang)
                    .then(() => {
                        console.log(`Snipcart UI language set to ${lang}`);

                        // Restore the currency if it changed
                        return Snipcart.api.session.setCurrency(currentCurrency);
                    });
            })
            .then(() => console.log("Currency preserved after language change"))
            .catch(err => console.error("Error updating Snipcart language/currency:", err));
    } else {
        console.warn("Snipcart not fully loaded yet. Retrying...");
        setTimeout(() => updateSnipcartLanguage(lang), 1000);
    }
}


  
  

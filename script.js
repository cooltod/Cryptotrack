
const API_KEY = "b69e816c-e555-4746-8bac-4c19a1227dfe";  // Bitquery API Key
const API_URL = "https://graphql.bitquery.io";

async function fetchData(type) {
    const query = `
    {
      ethereum {
        dexTrades(
          options: {desc: "tradeAmount", limit: 10}
        ) {
          baseCurrency {
            symbol
          }
          tradeAmount(in: USD)
          trades: count
        }
      }
    }`;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        },
        body: JSON.stringify({query})
    });

    const data = await response.json();
    displayData(data, type);
}

function displayData(data, type) {
    const container = document.getElementById('heatmap-container');
    container.innerHTML = "";

    data.data.ethereum.dexTrades.forEach(trade => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const amount = trade.tradeAmount;
        const colorClass = amount > 1000 ? 'green' : amount < 500 ? 'red' : 'orange';

        balloon.classList.add(colorClass);
        balloon.innerText = `${trade.baseCurrency.symbol} - $${amount.toFixed(2)}`;

        container.appendChild(balloon);
    });
}

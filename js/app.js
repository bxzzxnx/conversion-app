const inputCoin = document.querySelector('[data-js="currency-one-times"]');
const precision = document.querySelector('[data-js="conversion-precision"]');
const convertedValue = document.querySelector('[data-js="converted-value"]')
const currencyOne = document.querySelector('[data-js="currency-one"]');
const currencyTwo = document.querySelector('[data-js="currency-two"]');
const dateAtt = document.querySelector('[data-js="conversion-date"]');
const exchangeButton = document.querySelector('[data-js="exchange-button"]');
const bidValue = document.querySelector('[data-js="bid-value"]');
const askValue = document.querySelector('[data-js="ask-value"]');

const fetchData = async (coinOne, coinTwo) =>{
    try {
      const response = await fetch(`https://economia.awesomeapi.com.br/last/${coinOne}-${coinTwo}`);
      if (!response.ok) {
        throw new Error('Dados não obtidos')
      }
      return response.json();
    } catch ({error, message}) {
      console.log(error, message)
    }
};

const showData = async () =>{
  const inputValue = inputCoin.value
  const inputFieldOne = currencyOne.value;
  const inputFieldTwo = currencyTwo.value;
  const fetch = await fetchData(inputFieldOne, inputFieldTwo);

  const Data = () => fetch[`${inputFieldOne}${inputFieldTwo}`];

  const date = new Date(Data().create_date);
  const formatedDate = new Intl.DateTimeFormat(
    'pt-BR',{dateStyle : 'short',  timeStyle: 'full'}
  ).format(date);

  const ask = Number(Data().ask);
  const bid = Number(Data().bid);

  dateAtt.textContent = `Atualizado em: ${formatedDate}`
  precision.textContent = `1 ${inputFieldOne} = ${ask} ${inputFieldTwo}`;
  convertedValue.textContent = (ask * inputValue).toFixed(2);
  bidValue.textContent = `Preço de compra: ${bid}`;
  askValue.textContent = `Preço de venda: ${ask}`;
}

const exchangeValues = () =>{
  const dump = currencyOne.value;
  currencyOne.value = currencyTwo.value
  currencyTwo.value = dump
  formatOptions()
}

const formatOptions = () =>{
  const selectedOption1 = currencyOne.options[currencyOne.selectedIndex].value;
  const selectedOption2 = currencyTwo.options[currencyTwo.selectedIndex].value;

  const hiddenAnotherOption = (currencyField, hidden) =>{
    for (let i = 0; i < currencyField.options.length; i++) {
      const option = currencyField.options[i];
      if (option.value === hidden) {
      option.style.display = "none";
      } else {
      option.style.display = "";
      }
    }
  };

  hiddenAnotherOption(currencyOne, selectedOption2);
  hiddenAnotherOption(currencyTwo, selectedOption1);
  showData();
}

formatOptions()

inputCoin.addEventListener('input', showData);
currencyTwo.addEventListener('change', formatOptions);
currencyOne.addEventListener('change', formatOptions);
exchangeButton.addEventListener('click', exchangeValues);
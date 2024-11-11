import './CurrencyInput.css';

interface CurrencyInputProps {
  currencies: { name: string; value: number }[]; 
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
  return (
    <div className="currency-input">
      <select value={selectedCurrency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency.name} value={currency.name}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;

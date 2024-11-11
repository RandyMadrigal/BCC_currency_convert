import "./CurrencySelect.css";

interface CurrencySelectProps {
  currencies: { name: string; value: number }[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currencies,
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <div className="currency-select">
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency.name} value={currency.name}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;

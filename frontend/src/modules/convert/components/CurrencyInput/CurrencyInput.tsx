interface CurrencyInputProps {
  amount: number;
  setAmount: (amount: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ amount, setAmount }) => {
  return (
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(parseFloat(e.target.value))}
      placeholder="Enter amount"
    />
  );
};

export default CurrencyInput;

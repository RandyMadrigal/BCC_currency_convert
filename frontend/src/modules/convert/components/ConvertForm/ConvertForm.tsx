import { useEffect, useState } from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import ConvertButton from '../ConvertButtom/ConvertButtom';
import { convertCurrency } from '../../services/convertService';
import { ConvertRequest, ConvertResponse } from '../../types/convertTypes';
import axios from '../../../../lib/axios';
import { useAuthContext } from '../../../auth/context/AuthContext';
import './ConvertForm.css';

const ConvertForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('DOP');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [currencies, setCurrencies] = useState<{ name: string; value: number }[]>([]);
  const { user } = useAuthContext();  // Obtener el usuario del contexto de autenticación

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('/exchange-rate');
        setCurrencies(response.data.msg);
      } catch (error) {
        console.error('Error al obtener las monedas', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvertCurrency = async () => {
    if (!user) {
      return;  // Si no está logueado, no procede con la conversión
    }

    const requestData: ConvertRequest = {
      amount,
      from: fromCurrency,
      to: toCurrency,
      userId: user.id,
    };

    try {
      const response: ConvertResponse = await convertCurrency(requestData);
      setConvertedAmount(response.result);
    } catch (error) {
      console.error('Error al convertir la moneda', error);
    }
  };

  return (
    <div className="convert-form">
      <h2>Currency Converter</h2>

      {/* Mostrar mensaje si el usuario no está logueado */}
      {!user && (
        <div className="login-message">
          <p>Necesitas iniciar sesión para usar el convertidor.</p>
        </div>
      )}

      <div className="input-row">
        <div className="input-container">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        <CurrencyInput
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
        />
      </div>

      <div className="input-row">
        <div className="result-container">
          <p>{convertedAmount}</p>
        </div>
        <CurrencyInput
          currencies={currencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
        />
      </div>

      <ConvertButton onClick={handleConvertCurrency} disabled={amount <= 0 || !user} />
    </div>
  );
};

export default ConvertForm;

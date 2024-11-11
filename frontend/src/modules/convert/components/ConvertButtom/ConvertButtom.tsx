import './ConvertButton.css';

interface ConvertButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="convert-button">
      Convertir
    </button>
  );
};

export default ConvertButton;

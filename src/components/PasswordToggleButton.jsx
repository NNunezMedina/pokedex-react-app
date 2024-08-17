
const PasswordToggleButton = ({ onClick, isVisible }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded mt-3 ml-1"
    >
      {isVisible ? 'Hide' : 'Show'}
    </button>
  );
};

export default PasswordToggleButton;
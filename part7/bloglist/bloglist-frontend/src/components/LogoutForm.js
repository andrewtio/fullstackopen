const LogoutForm = ({ handleLogout }) => (
  <button
    onClick={() => {
      handleLogout();
    }}
  >
    Logout
  </button>
);

export default LogoutForm;

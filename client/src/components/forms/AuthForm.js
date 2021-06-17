const AuthForm = ({
  email = '',
  password = '',
  loading,
  setEmail = (f) => f,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
  hideEmailInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    {!hideEmailInput && (
      <div class="form-outline mt-4">
        <label class="form-label fs-5" for="typeEmail">
          Email Address
        </label>
        <input
          type="email"
          id="typeEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control fs-6 ps-3 pt-1 pb-1"
          disabled={loading}
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
    )}
    {showPasswordInput && (
      <div class="form-outline mt-4">
        <label class="form-label fs-5" for="typePassword">
          Password
        </label>
        <input
          type="password"
          id="typePassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control fs-6 ps-3 pt-1 pb-1"
          disabled={loading}
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
    )}
    <button
      className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7"
      disabled={loading}
    >
      <i class="fas fa-check pe-2"></i> Submit
    </button>
  </form>
);

export default AuthForm;

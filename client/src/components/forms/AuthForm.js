const AuthForm = ({
  email,
  password = '',
  loading,
  setEmail,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    <div class="form-outline p-2">
      <label class="form-label fs-4" for="typeEmail">
        Email Address
      </label>
      <input
        type="email"
        id="typeEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control fs-4"
        disabled={loading}
        style={{ borderBottom: '1px solid yellow' }}
      />
    </div>
    {showPasswordInput && (
      <div class="form-outline p-2">
        <label class="form-label fs-4" for="typePassword">
          Password
        </label>
        <input
          type="password"
          id="typePassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control fs-5"
          disabled={loading}
          style={{ borderBottom: '1px solid yellow' }}
        />
      </div>
    )}
    <button
      className="btn btn-primary btn-raised btn-lg mb-4 fs-7"
      disabled={!email || loading}
    >
      Submit
    </button>
  </form>
);

export default AuthForm;

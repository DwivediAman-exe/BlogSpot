import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  return (
    <div className="container p-5 ">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-outline mb-4 p-2">
          <input
            id="form1Example1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            disabled={loading}
          />
          <label class="form-label" for="form1Example1">
            Email Address
          </label>
        </div>
        <div class="form-outline mb-4  p-2">
          <input type="password" id="form1Example2" class="form-control" />
          <label class="form-label" for="form1Example2">
            Password
          </label>
        </div>
        <div class="row mb-4">
          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>
        <button
          className="btn btn-primary btn-raised btn-lg"
          disabled={!email || loading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

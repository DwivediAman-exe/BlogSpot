const UserProfile = ({
  handleSubmit,
  handleChange,
  username,
  name,
  email,
  about,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Username"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Name"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Email"
          disabled
        />
      </div>

      <div className="form-outline mt-4">
        <label>About</label>
        <textarea
          name="about"
          value={about}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="About"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <button
        className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7"
        disabled={!email || loading}
      >
        Update Details
      </button>
    </form>
  );
};

export default UserProfile;

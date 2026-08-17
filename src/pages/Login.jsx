import { useState } from "react";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../services/authService";

import { createUserProfile } from "../services/userService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const user = await loginWithEmail(email, password);

      // Make sure the user has a Firestore profile
      await createUserProfile(user);

      setMessage("Login successful!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");

    try {
      const user = await loginWithGoogle();

      // Make sure the Google user has a Firestore profile
      await createUserProfile(user);

      setMessage("Google login successful!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login to EventHub</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      <hr />

      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;

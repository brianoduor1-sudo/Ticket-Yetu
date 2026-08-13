import { useState } from "react";
import {
  registerWithEmail,
  loginWithGoogle,
} from "../services/authService";

import { createUserProfile } from "../services/userService";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const user = await registerWithEmail(
        name,
        email,
        password
      );

      await createUserProfile(user, name);

      setMessage("Account created successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    setMessage("");

    try {
      const user = await loginWithGoogle();

      await createUserProfile(user);

      setMessage("Account created successfully with Google!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Create an EventHub Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Create a password"
            required
          />
        </div>

        <button type="submit">
          Create Account
        </button>
      </form>

      <hr />

      <button onClick={handleGoogleRegister}>
        Continue with Google
      </button>

      <p>
        Already have an account?
      </p>

      <button onClick={onLogin}>
        Login
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;

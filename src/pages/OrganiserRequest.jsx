import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { submitOrganiserRequest } from "../services/organiserService";

function OrganiserRequest() {
  const { user, profile } = useAuth();

  const [organisationName, setOrganisationName] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return <p>Please log in to request organiser access.</p>;
  }

  if (profile?.role === "organiser") {
    return <p>You are already an organiser.</p>;
  }

  if (profile?.organiserStatus === "pending") {
    return <p>Your organiser request is currently pending.</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await submitOrganiserRequest(
        user,
        organisationName,
        reason
      );

      setMessage(
        "Your organiser request has been submitted and is awaiting approval."
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Become an Organiser</h2>

      <p>
        Request organiser access to create and manage events
        on EventHub.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Organisation Name</label>

          <input
            type="text"
            value={organisationName}
            onChange={(event) =>
              setOrganisationName(event.target.value)
            }
            placeholder="Enter organisation name"
            required
          />
        </div>

        <div>
          <label>
            Why do you want to become an organiser?
          </label>

          <textarea
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            placeholder="Tell us about your events..."
            required
          />
        </div>

        <button type="submit">
          Submit Organiser Request
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OrganiserRequest;

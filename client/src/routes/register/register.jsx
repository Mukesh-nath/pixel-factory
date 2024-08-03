import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBuilder, setIsBuilder] = useState(false);

  const navigate = useNavigate();

  const userTypeChangehandler = (e) => {
    setIsBuilder(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const isBuilder = formData.get("isBuilder") === "on";
    const builderName = formData.get("builderName");
    const builderWebsite = formData.get("builderWebsite");
    const noOfProjects = Number(formData.get("noOfProjects"));
    const address = formData.get("address");
    const typeOfUser = formData.get("typeOfuser");
    try {
      const data = {
        username,
        email,
        password,
        isBuilder,
        builderName,
        builderWebsite,
        noOfProjects,
        address,
        typeOfUser,
      };

      await apiRequest.post("/auth/register", data);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            type="checkbox"
            id="isBuilder"
            name="isBuilder"
            onChange={userTypeChangehandler}
            checked={isBuilder}
          />
          <label htmlFor="isBuilder"> I am a builder</label>
          {isBuilder ? (
            <>
              <input
                name="builderName"
                type="text"
                placeholder="Builder name"
                required
              />
              <input
                name="builderWebsite"
                type="url"
                placeholder="Builder website"
              />
              <textarea
                name="address"
                placeholder="Builder address"
                rows={4}
              ></textarea>
              <input
                name="noOfProjects"
                type="number"
                placeholder="No. of previous projects"
                step={1}
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="typeOfuser">Select the type of user:</label>
              <select name="typeOfuser" id="typeOfuser">
                <option value="buyer">Buyer</option>
                <option value="owner">Owner</option>
              </select>
            </>
          )}
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;

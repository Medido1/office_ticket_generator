import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate("");

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/users/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
        credentials: "include"
      })
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
      };
      if (!res.ok) {
        setMessage(data.message || "Error Login in");
      } else {
        setMessage("Logged in!");
        setUsername("");
        setPassword("");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }
  return (
    <div className="w-full max-w-md flex-grow self-center mt-[10%] ">
      <form 
        onSubmit={handleLogin}
        className="flex flex-col items-center bg-gray-200 max-h-64 p-4 rounded-2xl w-full"
      >
      <h2 className="text-xl font-bold text-center mb-4">
        Please Log in
      </h2>
      <div className="flex flex-col gap-2 mb-4  text-xl font-bold">
        <label htmlFor="username">
          UserName
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="cool name"
          value={username}
          onChange={(e) => {
            setMessage("")
            setUsername(e.target.value)
          }}
          className=" p-2 border border-gray-200 rounded-lg bg-blue-600 text-white"
          required 
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2 mb-4 text-xl font-bold">
        <label htmlFor="password">
          Password
        </label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" p-2 border border-gray-200 rounded-lg bg-blue-600 text-white"
          required
        />
      </div>
      <button 
          type="submit"
          className="rounded-full px-6 py-4 mt-4 bg-blue-200 cursor-pointer text-xl
          transition duration-200 ease-in-out hover:scale-125"
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default LogIn;
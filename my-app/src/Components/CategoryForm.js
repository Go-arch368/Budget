import { useState, useContext } from "react";
import axios from "axios";
import CategoryContext from "../Context/CategoryContext";

export default function CategoryForm() {
  const { categoryDispatch } = useContext(CategoryContext);
  const [name, setName] = useState("");
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]); // Initialize as an empty array
  const errors = {};

  const runClientValidations = () => {
    if (name.trim().length === 0) {
      errors.name = "The name field should not be empty";
    } else if (name.trim().length < 3 || name.trim().length > 20) {
      errors.name = "Name should be between 3-20 characters long";
    }
    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const value = { name };
    console.log(name)

    const validationErrors = runClientValidations();

    if (Object.keys(validationErrors).length !== 0) {
      setClientErrors(validationErrors);
    } else {
      setClientErrors({});
      axios
        .post("http://localhost:3999/create-category", value)
        .then((response) => {
          const result = response.data;
          categoryDispatch({ type: "add_category", payload: result });
          setName("");
          setServerErrors([]); // Clear server errors after successful submission
        })
        .catch((err) => {
       //   const serverErrorResponse = err.response?.data?.error || []; // Handle server errors as an array
          setServerErrors(err.response.data.error);
        });
    }
  }

  return (
    <div>
      <h2>Add Category</h2>
     
      {serverErrors.length > 0 && (
        <div>
          <h3>Server Errors</h3>
          <ul>
            {serverErrors.map((err, i) => (
              <li key={i}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter category"
        />
        {clientErrors.name && <span style={{ color: "red" }}>{clientErrors.name}</span>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

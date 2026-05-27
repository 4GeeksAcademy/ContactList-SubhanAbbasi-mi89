import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API_URL = "https://playground.4geeks.com/contact";

export default function AddContact() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const foundContact = store.contacts.find((item) => item.id === Number(id));

      if (foundContact) {
        setContact({
          name: foundContact.name || "",
          email: foundContact.email || "",
          phone: foundContact.phone || "",
          address: foundContact.address || "",
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contact.name || !contact.email || !contact.phone || !contact.address) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      let response;

      if (isEditing) {
        response = await fetch(`${API_URL}/agendas/${store.agendaSlug}/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
      } else {
        response = await fetch(`${API_URL}/agendas/${store.agendaSlug}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
      }

      const data = await response.json();

      if (isEditing) {
        dispatch({ type: "update_contact", payload: data });
      } else {
        dispatch({ type: "add_contact", payload: data });
      }

      navigate("/");
    } catch (error) {
      console.log("Error saving contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        {isEditing ? "Edit contact" : "Add a new contact"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          save
        </button>

        <Link to="/" className="d-block mt-2">
          or get back to contacts
        </Link>
      </form>
    </div>
  );
}
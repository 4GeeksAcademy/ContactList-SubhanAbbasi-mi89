import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Single() {
  const { id } = useParams();
  const { store } = useGlobalReducer();

  const contact = store.contacts.find((item) => item.id === Number(id));

  if (!contact) {
    return (
      <div className="container mt-5">
        <h2>Contact not found</h2>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>{contact.name}</h1>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <p>{contact.address}</p>
      <Link to="/">Back home</Link>
    </div>
  );
}
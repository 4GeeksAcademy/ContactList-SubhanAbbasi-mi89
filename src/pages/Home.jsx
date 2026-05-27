import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

const API_URL = "https://playground.4geeks.com/contact";

export default function Home() {
  const { store, dispatch } = useGlobalReducer();

  const createAgenda = async () => {
    await fetch(`${API_URL}/agendas/${store.agendaSlug}`, {
      method: "POST",
    });
  };

  const getContacts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/agendas/${store.agendaSlug}/contacts`
      );

      if (response.status === 404) {
        await createAgenda();
        dispatch({ type: "set_contacts", payload: [] });
        return;
      }

      const data = await response.json();
      dispatch({ type: "set_contacts", payload: data.contacts || [] });
    } catch (error) {
      console.log("Error loading contacts:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/agendas/${store.agendaSlug}/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch({ type: "delete_contact", payload: id });
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {store.contacts.length === 0 ? (
        <h4 className="text-center mt-5">No contacts yet. Add one!</h4>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      )}
    </div>
  );
}
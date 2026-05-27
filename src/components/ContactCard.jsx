import { Link } from "react-router-dom";

export default function ContactCard({ contact, deleteContact }) {
  return (
    <div className="card contact-card mb-3">
      <div className="card-body d-flex align-items-center">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="contact"
          className="contact-img me-4"
        />

        <div className="flex-grow-1">
          <h5>{contact.name}</h5>

          <p className="mb-1 text-muted">
            <i className="fa-solid fa-location-dot me-2"></i>
            {contact.address}
          </p>

          <p className="mb-1 text-muted">
            <i className="fa-solid fa-phone me-2"></i>
            {contact.phone}
          </p>

          <p className="mb-0 text-muted">
            <i className="fa-solid fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>

        <div className="d-flex gap-3">
          <Link to={`/edit-contact/${contact.id}`} className="text-dark">
            <i className="fa-solid fa-pencil"></i>
          </Link>

          <button
            className="btn btn-link text-dark p-0"
            onClick={() => deleteContact(contact.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
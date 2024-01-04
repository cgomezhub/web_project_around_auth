import "../index.css";

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <form id={name} className="form" onSubmit={onSubmit}>
        <button
          type="button"
          className="form__close"
          onClick={onClose}
        ></button>
        <h2 className="form__title">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;

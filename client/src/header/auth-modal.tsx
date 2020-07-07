import React from "react";
import Modal from "react-modal";

import "../kumastyles/minimalist/components/auth-modal.scss";

Modal.setAppElement("#root");

const authURL = (provider) =>
  `/users/${provider}/login/?next=${window.location.pathname}`;

export default function AuthModal(props: Omit<Modal.Props, "isOpen">) {
  return (
    <Modal
      isOpen
      overlayClassName="modal"
      className="auth-providers"
      {...props}
    >
      <header>
        <h2 id="modal-main-heading">Sign In</h2>
      </header>
      <p>
        Sign in to enjoy the benefits of an MDN account. If you haven’t already
        created an MDN profile, you will be prompted to do so after signing in.
      </p>
      <div className="auth-button-container">
        <a href={authURL("github")} className="github-auth">
          Sign in with Github
        </a>
        <a href={authURL("google")} className="google-auth">
          Sign in with Google
        </a>
      </div>

      <button
        id="close-modal"
        className="close-modal"
        onClick={props.onRequestClose}
      >
        <span>Close modal</span>
      </button>
    </Modal>
  );
}

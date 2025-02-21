import React from "react";
import { useState } from "react";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(true);
  const handleHide = () => setOpen(false);

  return (
    <div className="footer">
      <div className="footer-container container col-11">
        <div className="col">
          <div className="name-blue footer-title fs-4 mb-2">
            ARCANE&nbsp;DEVLAB
          </div>
          <div>
            <p className="mb-1">Самозанятый</p>
            <p className="mb-1">Ахмедов Рустам Расулжонович</p>
            <p className="mb-1">ИНН: 540134089994</p>
          </div>
        </div>
        <div className="col col-right">
          <div>
            <a
              className="fs-6 main-link"
              href="https://arcanedevlab.ru"
              target="_blank"
            >
              www.arcanedevlab.ru
            </a>
          </div>
          <div>
            <a
              className="fs-6 main-link"
              href="https://t.me/+79994654345"
              target="_blank"
            >
              tg: @arcanedevlab
            </a>
          </div>
          <div>
            <a
              className="fs-6 main-link"
              href="mailto:arcanedevlab@gmail.com"
              target="_blank"
            >
              arcanedevlab@gmail.com
            </a>
          </div>
          <div>
            <span
              className="fs-6 main-link"
              style={{ cursor: "pointer" }}
              onClick={handleShow}
            >
              Пользовательское соглашение
            </span>
          </div>
        </div>
      </div>
      <TermsOfService show={open} handleHide={handleHide} />
    </div>
  );
};

export default Footer;

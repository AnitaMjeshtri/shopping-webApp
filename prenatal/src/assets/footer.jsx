import { useState } from "react";

export default function Footer(){

  const [isAziendeOpen, setIsAziendeOpen] = useState(false);
  const [isSupportoOpen, setIsSupportoOpen] = useState(false);

  const toggleAziende = () => {
    setIsAziendeOpen(!isAziendeOpen);
  }

  const toggleSupporto = () => {
    setIsSupportoOpen(!isSupportoOpen);
  }

  
  return (

    <div className="p-10">
        <div className="footer-div justify-between">
          <div className="categorie-div">
          <ul>
            <li><h3 className="font-bold">CATEGORIE</h3></li>
            <li><a href="#">Mamma</a></li>
            <li><a href="#">Bambina</a></li>
            <li><a href="#">Bambino</a></li>
            <li><a href="#">Casa</a></li>
            <li><a href="#">Pasegio</a></li>
          </ul>
        </div>
        <div className="prenata-div">
        <ul>
            <li><h3 className="font-bold">TU E PRENATAL</h3></li>
            <li><a href="#">Mamma</a></li>
            <li><a href="#">Bambina</a></li>
            <li><a href="#">Bambino</a></li>
            <li><a href="#">Casa</a></li>
            <li><a href="#">Pasegio</a></li>
          </ul>
        </div>
        <div className="azienda-div">
        <ul>
            <li><h3 className="font-bold"><button onClick={toggleAziende} className="footer-btn font-bold">AZIENDA <i className="down-arrow fa-solid fa-chevron-down"></i></button></h3></li>
            <div className={`toggled-el ${isAziendeOpen ? 'open' : ''}`}>
            <li><a href="#">Mamma</a></li>
            <li><a href="#">Bambina</a></li>
            <li><a href="#">Bambino</a></li>
            <li><a href="#">Casa</a></li>
            <li><a href="#">Pasegio</a></li>
            </div>
          </ul>
        </div>
        <div className="supporto-div">
        <ul>
            <li><h3><button onClick={toggleSupporto} className="footer-btn font-bold">SUPPORTO <i className={`down-arrow fa-solid fa-chevron-down ${isSupportoOpen ? 'fa-rotate-180' : ''}`}></i></button></h3></li>
            <div className= {`toggled-el ${isSupportoOpen ? 'open' : ''}`}>
            <li><a href="#">Mamma</a></li>
            <li><a href="#">Bambina</a></li>
            <li><a href="#">Bambino</a></li>
            <li><a href="#">Casa</a></li>
            <li><a href="#">Pasegio</a></li>
            </div>
          </ul>
        </div>
        </div>
        <div className="footer-div2 border-top mt-4 flex justify-around">
            <img className="w-48 h-auto" src="/images/prenatalIcon.jpg" alt=""></img>
            <p className="flex justify-center align-items-center text-xs">© 2023 Prenatal S.p.A. All rights reserved. Via Bertani 6 20154 Milano (MI) - P.I. 00857680151</p>
            <ul>
              <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
            </ul>
        </div>
        </div>
  )
}
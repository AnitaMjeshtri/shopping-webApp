import axios from "axios";
import { useState } from "react";

export default function Subscription(){

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  const handleEmailSending = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/sendMail', {email})
    .then((response)=>{
      setMessage(response.data.message)
      console.log(message);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className="card-before-footer p-10">
    <div className="flex flex-col"><img src="/public/images/heartShape.png" className="heart w-20"></img>
      <form method="post" onSubmit={handleEmailSending}>
      <div className="newsletter bg-white">
      Iscriviti alla newsletter. per te, subito un buono sconto da 5€ da spendere sul tuo prossimo ordine.
      <input type="email" placeholder="Enter your email" className="border-1 border-bottom mt-2"
      onChange={handleEmail}></input>
      <div className="flex">
      <input type="checkbox"
      checked={isChecked}
      onChange={handleChecked}
      >  
      </input>
      <div className="terms-conditions flex">
        <p className="terms-text">
        Dichiaro di aver letto e accettato l’informativa privacy e acconsento al trattamento dei miei dati per lo svolgimento da parte della Società di attività di marketing di vario tipo, inclusa la promozione di prodotti, servizi, distribuzione di materiale a carattere informativo, pubblicitario e promozionale, eventi, invio di newsletter e pubblicazioni (art. 2, lett. d) dell’informativa privacy).
        </p>
      </div>
      </div>
      <div className="flex justify-center align-items-center mt-3">
      <button className={`subscription-btn bg-pink-600 rounded-3xl px-3 py-1 text-white disabled={!isChecked} ${!isChecked ? 'disabled' : ''}`} type="submit">ISCRIVITI</button>
      </div>
      </div>
      </form>
    </div>
    </div>
  )
}
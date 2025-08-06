import { useState } from 'react';
import './RegistrationForm.css'

function RegistrationForm() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  return(
    <div className='form-container'>
      <form>
      <label>
        Login:
        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>
      <br/>

      <label>
        Email:
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      </form>
    </div>
  )

}
export default RegistrationForm;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/reducer';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleInputsChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      const nameRegex = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/;
      if (value !== '' && !nameRegex.test(value)) {
        alert(
          'Name may contain only letters, apostrophe, dash, spaces, and Cyrillic characters. For example Adrian, Jacob Mercer, Іван, Олена'
        );
        return;
      }
      setName(value);
    } else {
      const phoneRegex = /^[+\-\d]+$/;
      if (value !== '') {
        if (!phoneRegex.test(value)) {
          alert('Phone may contain only +, -, and digits.');
          return;
        }
        if (value.length > 15) {
          alert('Phone number should not exceed 15 characters.');
          return;
        }
      }
      setNumber(value);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contactId = nanoid();
    if (name.trim() !== '' && number.trim() !== '') {
      dispatch(add({ contactId, name, number }));
    }
    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h1 style={{ fontFamily: 'cursive' }}>Add Contact</h1>
        <label htmlFor="name" style={{ width: '100%', fontFamily: 'cursive' }}>
          Name
        </label>

        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleInputsChange}
          className="input-text"
        />
        <label
          htmlFor="number"
          style={{ width: '100%', fontFamily: 'cursive' }}
        >
          Number
        </label>

        <input
          type="text"
          name="number"
          id="number"
          value={number}
          onChange={handleInputsChange}
          className="input-text"
        />
        <button type="submit" className="form-btn">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

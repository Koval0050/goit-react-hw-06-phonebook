import PropTypes from 'prop-types';
import {
  NameInputTitle,
  NameInput,
  PhoneInputTitle,
  PhoneInput,
  SectionInputs,
  Submit,
} from './addform.styled';
import { useState } from 'react';

export const InputForm = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

  const handleSubmit = event => {
    event.preventDefault();

    const newContactData = {
      name: name,
      number: number,
    };
    props.addContact(newContactData);
    reset();
  };

  InputForm.propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  return (
    <SectionInputs onSubmit={handleSubmit}>
      <NameInputTitle className="name">Name</NameInputTitle>
      <NameInput
        type="text"
        name="name"
        value={name}
        onChange={handleInputsChange}
        required
      />
      <PhoneInputTitle className="number">Number</PhoneInputTitle>
      <PhoneInput
        type="tel"
        name="number"
        value={number}
        onChange={handleInputsChange}
        required
      />

      <Submit type="submit">Add contact</Submit>
    </SectionInputs>
  );
};

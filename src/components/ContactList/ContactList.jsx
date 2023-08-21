import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, getContacts, setFilter } from 'redux/reducer';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const contactList = contacts.data;

  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const [searchValue, setSearchValue] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contactList);

  useEffect(() => {
    filterContacts(searchValue);
  }, [contactList, filter, searchValue]);

  const handleInput = elem => {
    const value = elem.target.value;
    setSearchValue(value);
    dispatch(setFilter(value));
    filterContacts(value);
  };

  const removeContact = id => {
    dispatch(remove(id));
    filterContacts(searchValue);
  };

  const filterContacts = value => {
    const newFilteredContacts = contactList.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContacts(newFilteredContacts);
  };

  const noContactsMessage = (
    <p className="no-contacts-message">There is nothing here yet</p>
  );

  return (
    <div className="contact-list-container">
      <div className="contact-list">
        <h1 style={{ fontFamily: 'cursive' }}>Contacts</h1>
        <input
          type="text"
          value={filter}
          onChange={handleInput}
          placeholder="Filter by name"
          className="filter-input"
        />
        <ul className="contacts">
          {filteredContacts.length ? (
            filteredContacts.map(contact => (
              <li key={contact.contactId} className="contacts-item">
                <div className="contacts-item-text">
                  <p>Name: {contact.name}</p>
                  <p>Number: {contact.number}</p>
                </div>
                <button
                  className="contact-btn"
                  onClick={() => removeContact(contact.contactId)}
                >
                  x
                </button>
              </li>
            ))
          ) : (
            <li>{noContactsMessage}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;

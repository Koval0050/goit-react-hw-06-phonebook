import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import './style.css';
export const App = () => {
  return (
    <div>
      <ContactForm />
      <ContactList />
    </div>
  );
};

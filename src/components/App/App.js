import { nanoid } from 'nanoid';
import { Component } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';


import { AppWrapper, Title, TitleContacts } from './App.styled';

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	};
	componentDidMount()
	{
		const contacts = localStorage.getItem('contacts');
		const parsedContacts = JSON.parse(contacts);
		if (parsedContacts)
		{
			this.setState({ contacts: parsedContacts });
			}
	};
	
	componentDidUpdate(PrevPops, prevState) {

		const { contacts } = this.state;
		if (contacts !== prevState.contacts) {
			localStorage.setItem('contacts', JSON.stringify(contacts));
		}
	};

	addContact = ({ name, number }) => {
		const { contacts } = this.state;

		const addContact = {
			id: nanoid(5),
			name,
			number,
		};

		if (
			contacts.find(
				contact => contact.name.toLowerCase() === addContact.name.toLowerCase()
			)
		) {
			return alert(`${addContact.name} is already in contacts.`);
		}

		this.setState(({ contacts }) => ({
			contacts: [addContact, ...contacts],
		}));
	};

	deleteContact = idContact => {
		this.setState(({ contacts }) => ({
			contacts: contacts.filter(contact => contact.id !== idContact),
		}));
	};

	filterContacts = e => {
		this.setState({ filter: e.currentTarget.value });
	};

	render() {
		const { filter } = this.state;
		const normalized = this.state.filter.toLocaleLowerCase();
		const renderContacts = this.state.contacts.filter(contact =>
			contact.name.toLocaleLowerCase().includes(normalized)
		);

		return (
			<AppWrapper>
				<Title>Phonebook</Title>
				<ContactForm onSubmit={this.addContact} />

				<TitleContacts>Contacts</TitleContacts>

				<Filter value={filter} onFilterContacts={this.filterContacts} />
				<ContactList
					contacts={renderContacts}
					onDeleteContact={this.deleteContact}
				/>

			</AppWrapper>
		);
	}
}

export default App;
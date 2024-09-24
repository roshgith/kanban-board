import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import Header from './components/Header';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'user');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  const fetchData = async () => {
    try {

      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGroupChange = (group) => {
    setGroupBy(group);
    localStorage.setItem('groupBy', group); 
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    localStorage.setItem('sortBy', sort); 
  };

  return (
    <div className="App">
      
      <Header 
        groupBy={groupBy} 
        sortBy={sortBy} 
        onGroupChange={handleGroupChange} 
        onSortChange={handleSortChange} 
      />
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} users={users} />
    </div>
  );
}

export default App;

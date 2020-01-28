import React, {useEffect, useState} from 'react';
import CreateVacations from './components/CreateVacations'
import Vacations from './components/Vacations'
import './App.css';
import axios from 'axios'

const API = 'https://acme-users-api-rev.herokuapp.com/api';

  const fetchUser = async ()=> {
    const storage = window.localStorage;
    const userId = storage.getItem('userId'); 
    if(userId){
      try {
        return (await axios.get(`${API}/users/detail/${userId}`)).data;
      }
      catch(ex){
        storage.removeItem('userId');
        return fetchUser();
      }
    }
    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem('userId', user.id);
    return  user;
  };

function App() {
  const [user, setUser] = useState({}) 
  const [vacations, setVacations] = useState([])

  useEffect(() => {
    fetchUser()
      .then(user => {
        setUser(user)
        console.log(user)
        return user
      })
      .then(user => {
        axios.get(`${API}/users/${user.id}/vacations`)
        .then(response => response)
        .then(({data}) => setVacations(data))
      })
  }, [])

  if(!user.id) {
    return '..loading'
  }

  const destroy = async(vacationToDestroy) => {
    await axios.delete(`${API}/users/${user.id}/vacations/${vacationToDestroy.id}`)
    setVacations(vacations.filter(vacation => vacation.id !== vacationToDestroy.id))
  }

  const create = async(vacation) => {
    const response = await axios.post(`${API}/users/${user.id}/vacations/`, vacation)
    setVacations([...vacations, response.data])
  }

  return (
    <div className="App">
      <h1>Acme Vacation Planner for {user.fullName}</h1>
      <p>Has {vacations.length} vacations</p>
      <CreateVacations create={create}/>
      <Vacations vacations={vacations} destroy={destroy}/>
    </div>
  );
}

export default App;

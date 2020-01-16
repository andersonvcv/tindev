import React, {useState, useEffect} from 'react';
import api from './services/api'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] =  useState([]);

  // load devs from mongoDB
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []); // Executed just 1x

  async function addDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      
      <aside>
        <strong>Cadastrar</strong>
        <DevForm handleAddDev={addDev}/>
      </aside>

      <main>
        <ul>  
          {devs.map(dev =>(
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;

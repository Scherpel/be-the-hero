import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom'; 
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import Logo from '../../assets/logo.svg';
export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history =  useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get(
            'profiles', 
            {headers: {
                Authorization: ongId,

            }}).then(response => {
                setIncidents(response.data);
            })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Error');
        }

    }

    function handleLogout(){
       localStorage.clear();
       history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={Logo} alt="logo"/>
                <span>Bem vindo, {ongName}</span>
                <Link to="/incidents/new" className="button"> Cadastrar novos casos </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>
                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li> 
              ))}
            </ul>
        </div>
    )
}
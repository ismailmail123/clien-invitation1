import React from 'react';
import { InputGroup, Button, Form, Table, Image, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import LoadingTable from '../../components/LoadingTable';
import './style.css';

const Navbar = () => {

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');

  

  const {id} = useParams();


 
  const URL = "https://invitation-lm0g.onrender.com"
  const getCards = () => {
    axios({
      method: "GET",
      url: `${URL}/recipients`
    })
    .then(cards => {
      setCards(cards.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])

  

  const deleteHandler = (id) => {
    axios({
      method: "DELETE",
      url: `${URL}/recipients/${id}`
    })
    .then(result => {
      getCards()
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])

  const updateHandler = (id) => {
    axios({
      method: "PUT",
      url: `${URL}/cards/${id}`
    })
    .then(result => {
      getCards()
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])


    return (
      <div className='container-fluid p-3 ' style={{ height: '100%' }}>
        <div className='row w-100'>
            <div className=' p-3'>
              <Form className='mb-3 form-search'>
                <InputGroup className='search d-flex justify-content-end'>
                  <Form.Control 
                    onChange={(e) =>setSearch(e.target.value)}
                    placeholder='Serch...'
                  />
                </InputGroup>
              </Form>
            <Table striped>
                  <thead>
                    <tr className='text-center text-table'>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Telepon</th>
                      <th>Aksi</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    { 
                    // cards.filter((item) => {
                    //   return search.toLowerCase() === '' ? item
                    //   : item.name.toLowerCase().includes(search);
                    // })
                      cards.length !== 0 ?
                      cards.filter((card) => card.name.toLowerCase().includes(search))
                      .map(card => {
                        return(
                          <tr className='text-center text-table' key={card.id}>
                            <td>{card.id}</td>
                            <td>{card.name}</td>
                            <td>{card.adress}</td>
                            <td>{card.phone}</td>
                            <td className='d-flex justify-content-end align-items-center'>
                              <button className='btn btn-outline-danger  me-2 p-1 ' onClick={() => deleteHandler(+card.id)} > <RiDeleteBinLine /> </button>
                              <button className="btn btn-outline-primary p-1" onClick={()=>navigate(`/update/${card.id}`)}  > <BsPencil /></button>
                            </td>
                          </tr>
                          
                        )
                      }) : 
                      <tr>
                        <td>
                          <LoadingTable />
                        </td>
                        <td>
                          <LoadingTable />
                        </td> 
                        <td>
                         <LoadingTable />
                        </td>      
                        <td>
                         <LoadingTable />
                        </td>
                        <td>
                         <LoadingTable />
                        </td>
                      </tr> 
                      
                      
                     }
                  </tbody>
                </Table>
                
            </div>
                        
        </div>
    </div>
                    
                    
        
    ) 
}

export default Navbar;
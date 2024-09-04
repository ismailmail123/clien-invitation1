import { Dropdown, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import brand from "../../assets/logo-undangan2.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import useRecipientStore from '../../store/useRecipientStore';
import { useEffect, useState } from 'react';
import Icon from "../../assets/avatar.jpg";
import axios from 'axios';

function OffcanvasExample() {

  const token = localStorage.getItem("token")
  const {user, fetchUser, logout} = useRecipientStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [title, setTitle] = useState("Invitation");
  const [metaImage, setMetaImage] = useState("");
  const [favicon, setFavicon] = useState("");
  const {id} = useParams();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      alert("Kata kunci yang anda masukkan tidak ditemukan");
    } else {
      navigate(`/search?query=${searchTerm}`);
      setShow(false); // Close the Offcanvas
    }
  };

  useEffect(() => {
    fetchUser();
  },[])

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 
    const getData = async () => {
        try {
            const response = await axios.get(`https://api-invitation.xyz/api/recipients/${id}`);
            setData(response.data.data);
            const datas = response.data.data;

      if (datas && datas.user && datas.user.username) {
        setTitle(`${datas.user.wedding.name} & ${datas.user.wedding.parthner_name}`);
      }
      
      if (datas && datas.user && datas.user.profile_image) {
        setMetaImage(datas.user.profile_image);
        setFavicon(datas.user.profile_image);
    }

        } catch (err) {
            console.log("Data tidak ditemukan", err);
            setData([]);
        }
    };

    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        console.log("Meta image URL: ", metaImage); // Debug line
    }, [metaImage]);

    useEffect(() => {
      document.title = title;
    }, [title]);

  return (
    <>
      <Navbar key="false" expand="false" className="bg-body-tertiary mb-3">
        <Container fluid>
          {
            token && user && user.length > 0 ? (
              <>
                {
                  user[0]?.profile_image ? (
                    <Image 
                      src={user[0].profile_image} 
                      className='rounded-circle m-0 p-0' 
                      style={{width: "40px", height: "40px"}} 
                      alt="User Profile" 
                    />  
                  ) : (
                    <Image 
                      src={Icon} 
                      className='rounded-circle m-0 p-0' 
                      style={{width: "40px", height: "40px"}} 
                      alt="User Profile" 
                    />  
                  )
                }
                <Dropdown style={{marginLeft: "-250px"}}>
                  <Dropdown.Toggle 
                    variant="light" 
                    className="bg-transparent border-0 p-0 text-wrap" 
                    style={{fontSize: "12px"}}
                    id="dropdown-basic"
                  >
                    {user[0].username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Image 
                src={brand} 
                style={{width: "250px", height: "60px", marginLeft: "-40px"}} 
                alt="Brand Logo" 
              />
            )
          }

          <Navbar.Toggle 
            aria-controls={`offcanvasNavbar-expand-false`}
            onClick={() => setShow(true)} // Open the Offcanvas
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
            show={show}
            onHide={() => setShow(false)} // Close the Offcanvas
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title 
                style={{ fontFamily: "Dancing Script, cursive", fontWeight: "bold" }} 
                id={`offcanvasNavbarLabel-expand-false`}
              >
                The Invitation
              </Offcanvas.Title>
            </Offcanvas.Header>
            {
              token && user && user.length > 0 ? (
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to="/">Halaman Utama</Nav.Link>
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to={`/open/1`} >Lihat tampilan</Nav.Link>
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to="/edit" >Edit Undangan</Nav.Link>
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to="/addrecipient" >Tambahkan Penerima</Nav.Link>
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to="/list">Daftar Penerima</Nav.Link>
                  </Nav>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="d-flex justify-content-center" style={{marginTop: "50px"}}>
                      <input
                        className="form-control border-2 border-secondary w-75  px-4 rounded-pill"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Cari.."
                      />
                      <button
                        type="submit"
                        className="btn btn-primary border-secondary p-3 mb-2 rounded-pill text-white"
                        style={{ 
                          marginLeft: "-60px",
                          marginTop:"9px", 
                          width: "100px",
                          fontFamily: "Dancing Script, cursive"
                        }}
                      >
                        Cari
                      </button>
                    </div>
                  </form>
                </Offcanvas.Body>
              ) : (
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to={`/open/1`} >Lihat tampilan</Nav.Link>
                    <Nav.Link style={{ fontFamily: "Dancing Script, cursive" }} as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              )
            }              
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;

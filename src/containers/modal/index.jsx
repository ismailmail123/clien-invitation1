import { useState, useEffect, useRef } from "react";
import "./styles.css";
// import Icon from "../../assets/close.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import useRecipientStore from "../../store/useRecipientStore";
import FromToken from "../../utils/auth";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Containt from "../../components/container";

const Modal1 = ({ isOpen, toggleModal, modalType }) => {
  const navigate = useNavigate();
  const {
    weddings,
    addWedding,
    updateWedding,
    fetchWedding,
    sounds,
    fetchSound,
    galeries,
    fetchGaleri,
    addGaleri,
    user,
    fetchUser,
    updateUser,
    thems,
    fetchThem,
    updateThem,
    fetchUserById,
    cards,
    fetchCard,
    addCard,
    fetchCardById
  } = useRecipientStore();
  const [weddingData, setWeddingData] = useState({
    name: "",
    parthner_name: "",
    date: "",
    time: "",
    address: "",
    sound: null,
  });
  const [userData, setUserData] = useState({
    profile_image: "",
    cover_image: "",
    thems_image: "",
    thems_image1: "",
  });
  const [cardData, setCardData] = useState({    
      title: "",
      number: "",
      name: "",
  });
  const [thems_image, setThems_image] = useState();
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [title, setTitle] = useState();
  const [thems_image1, setThems_image1] = useState();
  const [image, setImage] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Jika perlu, Anda bisa memuat data wedding yang relevan di sini
    fetchWedding();
    fetchSound();
    fetchGaleri();
    fetchUser();
    fetchUserById();
    fetchThem();
    fetchCard();
    fetchCardById();
  }, []);


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setWeddingData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInsertChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFilesChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setUserData((prevState) => ({
        ...prevState,
        [name]: file, // Directly store the file object
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Atau sessionStorage.getItem('token')
    if (!token) {
      alert("Anda belum login, silahkan login terlebih dahulu !!");
      navigate("/login");
      return;
    }

    const userId = FromToken(token);
    if (!userId) {
      alert("Gagal mendapatkan ID pengguna");
      return;
    }

    setIsSubmitting(true);

    try {

      // Cari data wedding yang sudah ada berdasarkan user_id
      const existingWedding = weddings.find(
        (wedding) => String(wedding.user_id) === String(userId)
      );

      if (existingWedding) {
        // Ambil ID pernikahan yang sudah ada
        const weddingId = existingWedding.id;

        // Panggil fungsi updateWedding dengan ID dan data pernikahan
        await updateWedding(weddingId, weddingData);
        alert("Data berhasil diperbarui");
      } else {
        await addWedding({ ...weddingData, user_id: userId });
        alert("Data berhasil ditambahkan");
      }

      toggleModal(); // Tutup modal setelah operasi selesai
    } catch (error) {
      setError("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false); // Set status submit ke false setelah proses selesai
    }
  };

  const handleImageChange = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result); // Set pratinjau gambar
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleImageChange(file); // this updates both the state and preview
    }
  };

  const handleAddGaleri = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image); // append the selected image file

    try {
      await addGaleri(formData); // upload the image and data to the backend
      alert("Galeri berhasil ditambahkan"); // alert success
      toggleModal(); // close the modal after submission
    } catch (error) {
      console.error("Error adding galeri:", error);
      setError("Gagal menambahkan galeri");
    } finally {
      setIsSubmitting(false); // set submitting to false after completion
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    if (userData.profile_image) {
      formData.append("profile_image", userData.profile_image);
    }
    if (userData.cover_image) {
      formData.append("cover_image", userData.cover_image);
    }
    if (userData.profile_image) {
      formData.append("thems_image", userData.thems_image);
    }
    if (userData.cover_image) {
      formData.append("thems_image1", userData.thems_image1);
    }

    try {
      const userId = user[0]?.id;
      if (!userId) {
        setError("No user ID found");
        return;
      }

      // Assuming updateUser expects formData as input
      await updateUser(userId, formData); // Pass userId and formData
      alert("Data berhasil diperbarui")
      toggleModal();
    } catch (error) {
      alert("Gagal melakukan pengaturan tema. Silahkan coba kembali!")
      console.error("Error sending data:", error);
      setError("Failed to update user");
      alert("Gagal melakukan pengaturan tema. Silahkan coba kembali!")
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user[0]?.id;
        if (!userId) {
          setError("No user ID found");
          return;
        }

        const userData = await fetchUserById(userId);
        if (userData) {
          setProfileImage(userData.profile_image || "");
          setCoverImage(userData.cover_image || "");
          setThems_image(userData.thems_image || "");
          setThems_image1(userData.thems_image1 || "");
        } else {
          setError("No user data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchUserData();
  }, [fetchUserById]);

  const handleAddCard = async (e) => {
    e.preventDefault(); // Mencegah form dari refresh otomatis
    
    if (isSubmitting) return; // Cek apakah proses submit sedang berlangsung
  
    setIsSubmitting(true); // Set status submitting ke true
  
    try {
      // Kirim data cardData ke backend
      await addCard(cardData);
      alert("Kartu berhasil ditambahkan"); // Tampilkan pesan sukses
      toggleModal(); // Tutup modal setelah berhasil
    } catch (error) {
      console.error("Error adding card:", error); // Log error jika terjadi kesalahan
      setError("Gagal menambahkan kartu"); // Set pesan error
    } finally {
      setIsSubmitting(false); // Set status submitting ke false setelah proses selesai
    }
  };
  

  return (
    <>
    
      <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
        <div className="div-close">
          <button
            style={{ marginTop: "-200px", marginRight: "-450px" }}
            className="rounded-pill border-secondary bg-light"
            onClick={toggleModal}
          >
            <IoMdCloseCircleOutline className="text-dark fs-1"/>
          </button>
        </div>
        <div className="modal-1-modal">
          {modalType === "mempelai" && (
            <form className="pt-3" onSubmit={handleSubmit}>
              <h5
                style={{ top: 10, position: "sticky" }}
                className="text-center fw-bold"
              >
                Atur Mempelai
              </h5>
              <Form.Group controlId="formBasicName">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nama"
                  name="name"
                  value={weddingData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPartnerName">
                <Form.Label>Nama Pasangan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nama pasangan"
                  name="parthner_name"
                  value={weddingData.parthner_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicTime">
                <Form.Label>Waktu</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Masukkan waktu"
                  name="time"
                  value={weddingData.time}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Masukkan waktu"
                  name="date"
                  value={weddingData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat"
                  name="address"
                  value={weddingData.address}
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted lh-1">
                  Copykan alamat anda dari Bagi alam whatsapp anda
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicSuara">
                <Form.Label>Suara</Form.Label>
                <Form.Control
                  as="select"
                  className="tema"
                  name="sound"
                  onChange={handleInputChange}
                >
                  <option value="">Pilih suara</option>
                  {sounds &&
                    sounds.map((sound, index) => (
                      <option key={index} value={sound.sound_url}>
                        {sound.title}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              {isSubmitting ? (
                <>
                  <Button
                    style={{ bottom: 0, position: "sticky" }}
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Loading...
                  </Button>
                </>
              ) : (
                   <Button
                  style={{ bottom: 0, position: "sticky" }}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </form>
          )}
          {modalType === "galeri" && (
            <form className="p-3" onSubmit={handleAddGaleri}>
              <h5
                style={{ top: 10, position: "sticky" }}
                className="text-center fw-bold"
              >
                Atur Galeri
              </h5>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan judul"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicImage">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  className="tema"
                  type="file"
                  placeholder="Image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Form.Group>
              {/* {imgPreview && (
                <div className="image-preview">
                  <img
                    src={imgPreview}
                    alt="Image Preview"
                    className="img-fluid"
                  />
                </div>
              )} */}
              {isSubmitting ? (
                <>
                  <Button
                    style={{ bottom: 0, position: "sticky" }}
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Loading...
                  </Button>
                </>
              ) : (
                <Button
                  style={{ bottom: 0, position: "sticky" }}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </form>
          )}
          {modalType === "tema" && (
            <form className="p-3" onSubmit={handleUpdateUser}>
              <h5
                style={{ top: 10, position: "sticky" }}
                className="text-center fw-bold"
              >
                Atur Tema
              </h5>

              <Form.Group controlId="formBasicTitle">
                <Form.Label>gambar profil</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Masukkan judul"
                  name="profile_image"
                  onChange={handleFilesChange}
                  ref={fileInputRef}
                />
              </Form.Group>
              {/* {imgPreview && (
                <div className="image-preview">
                  <img
                    src={imgPreview}
                    alt="Image Preview"
                    className="img-fluid"
                  />
                </div>
              )} */}
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Gambar cover</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Masukkan judul"
                  name="cover_image"
                  onChange={handleFilesChange}
                  ref={fileInputRef}
                />
              </Form.Group>
              {/* {imgPreview && (
                <div className="image-preview">
                  <img
                    src={imgPreview}
                    alt="Image Preview"
                    className="img-fluid"
                  />
                </div>
              )} */}
              <Form.Group controlId="formBasicThem1">
                <Form.Label>Tema Utama</Form.Label>
                <Form.Select
                  name="thems_image"
                  onChange={handleInputsChange}
                  value={userData.thems_image}
                >
                  <option value="">Pilih Tema Utama</option>
                  {thems &&
                    thems.map((them, index) => (
                      <option key={index} value={them.img_url}>
                        {them.title}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formBasicThem2">
                <Form.Label>Tema Isi</Form.Label>
                <Form.Select
                  name="thems_image1"
                  onChange={handleInputsChange}
                  value={userData.thems_image1}
                >
                  <option value="">Pilih Tema Isi</option>
                  {thems &&
                    thems.map((them, index) => (
                      <option key={index} value={them.img_url}>
                        {them.title}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              {isSubmitting ? (
                <>
                  <Button
                    style={{ bottom: 0, position: "sticky" }}
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Loading...
                  </Button>
                </>
              ) : (
                   <Button
                  style={{ bottom: 0, position: "sticky" }}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </form>
          )}

          {modalType === "kado" && (
            <form className="p-3" onSubmit={handleAddCard}>
              <h5
                style={{ top: 10, position: "sticky" }}
                className="text-center fw-bold"
              >
                Atur Kado
              </h5>
              <Form.Group controlId="formBasiNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nama Anda"
                  name="name"
                  value={cardData.name}
                  onChange={handleInsertChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCard">
                <Form.Label>Nama Kartu</Form.Label>
                <Form.Select
                  name="title"
                  onChange={handleInsertChange}
                  // value={cardData.title}
                >
                  <option value="">Pilih Nama Kartu</option>
                  <option value="mandiri">Mandiri</option>
                  <option value="bri">Bri</option>
                  <option value="muamalat">Muamalat</option>
                  <option value="bsi">BSI</option>
                  <option value="bni">BNI</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicNumberCard">
                <Form.Label>Nomor Rekening</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nomor kartu"
                  name="number"
                  value={cardData.number}
                  onChange={handleInsertChange}
                />
              </Form.Group>
              <Button
                style={{ bottom: 0, position: "sticky" }}
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
          {modalType === "pengaturan" && (
            <>
            <Col className="mt-3">
            <Button 
                      // onClick={() => handleClick("pengaturan")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      {/* <MdOutlineSettings className="fs-1 text-info-emphasis" /> */}
                      <h6 className="text-black">Pengaturan</h6>
                    </Button>
          </Col>
            <Col className="mt-3">
            <Button 
                      // onClick={() => handleClick("pengaturan")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      {/* <MdOutlineSettings className="fs-1 text-info-emphasis" /> */}
                      <h6 className="text-black">Pengaturan</h6>
                    </Button>
          </Col>
            <Col className="mt-3">
            <Button 
                      // onClick={() => handleClick("pengaturan")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      {/* <MdOutlineSettings className="fs-1 text-info-emphasis" /> */}
                      <h6 className="text-black">Pengaturan</h6>
                    </Button>
          </Col>
            </>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Modal1;

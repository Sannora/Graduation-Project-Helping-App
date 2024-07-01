import "./CreateTicket.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTicket() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Academic', 'Translation', 'Software', 'Mechanics', 'Craftsmanship'];

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((item) => item !== category)
        : [...prevSelectedCategories, category]
    );

    // Seçilen kategoriyi setCategory ile güncelle
    setCategory(category);
  };

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Giriş yapmamış kullanıcıları login sayfasına yönlendirme
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const createPost = async (e) => {
    e.preventDefault();
  
    const postData = {
      title,
      category,
      description
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        return navigate('/home');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="createticket-component-container">
      <form onSubmit={createPost} className="ticket-container">
        <div className="ticket-section ticket-title">
          <p>What is your problem about?</p>
          <input
            type="text"
            className="ticket-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Describe your problem in a sentence/question."
          />
        </div>
        <div className="ticket-section ticket-categories">
          <p>Choose the categories that your problem is related.</p>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  backgroundColor: selectedCategories.includes(category)
                    ? '#FFCE35'
                    : '#3B55D9',
                  cursor: 'pointer',
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="ticket-section ticket-description">
          <p>
            Please elaborate your problem. More detailed tickets have a higher
            chance to be resolved.
          </p>
          <textarea
            name="description"
            id="ticket-description"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details about your problem..."
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submit-ticket">Submit</button>
      </form>
    </div>
  );
}

export default CreateTicket;
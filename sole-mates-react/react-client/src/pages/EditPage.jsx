import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useShoesContext } from "../contexts/ShoesContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const EditPage = () => {
  const { userData } = useAuthContext();
  if(!userData.isAuthenticated) {
    return <Navigate to={'/dashboard'}/>
  }

  const [formValues, setFormValues] = useState({});
  const onChange = (e) => setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const { id } = useParams();
  const { getShoeById, editShoeById } = useShoesContext();
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShoeById(id)
      .then(item => {
        if(userData._id != item._ownerId){
          return navigate('/dashboard')
        }
        setFormValues(item);
        setLoading(false);
      })
      .catch(err => {
        navigate('/dashboard');
      });
  }, [id]);

  const editSubmitHandler = async (e) => {
    e.preventDefault();

    for (const value in formValues) {
      if(!formValues[value]) {
        return alert('All fields are required!')
      }
    }
    setLoading(true);
    await editShoeById(id, formValues);
    navigate('/details/'+id);
  }

  return (
    <section id="edit">
      {loading && <p>Loading...</p>}
      {!loading && <div className="form">
        <h2>Edit item</h2>
        <form className="edit-form" onSubmit={editSubmitHandler}>
          <input type="text" name="brand" id="shoe-brand" placeholder="Brand" onChange={onChange} value={formValues.brand} />
          <input type="text" name="model" id="shoe-model" placeholder="Model" onChange={onChange} value={formValues.model} />
          <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" onChange={onChange} value={formValues.imageUrl} />
          <input type="text" name="release" id="shoe-release" placeholder="Release date" onChange={onChange} value={formValues.release} />
          <input type="text" name="designer" id="shoe-designer" placeholder="Designer" onChange={onChange} value={formValues.designer} />
          <input type="text" name="value" id="shoe-value" placeholder="Value" onChange={onChange} value={formValues.value} />

          <button type="submit">post</button>
        </form>
      </div>}

    </section>
  )
}

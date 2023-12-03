import { useForm } from '../hooks/useForm';
import { useShoesContext } from '../contexts/ShoesContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

export const CreatePage = () => {
  const { userData } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.isAuthenticated) navigate('/login');
  }, []);

  const { formValues, onChange } = useForm({
    brand: '',
    model: '',
    imageUrl: '',
    release: '',
    designer: '',
    value: ''
  });

  const { createShoe } = useShoesContext();


  const createSubmitHandler = async (e) => {
    e.preventDefault();

    for (const value in formValues) {
      if (!formValues[value]) {
        return alert('All fields are required!')
      }
    }

    await createShoe(formValues);
    navigate('/dashboard');
  }

  return (
    <section id="create">
      <div className="form">
        <h2>Add item</h2>
        <form className="create-form" onSubmit={createSubmitHandler}>
          <input type="text" name="brand" id="shoe-brand" placeholder="Brand" onChange={onChange} />
          <input type="text" name="model" id="shoe-model" placeholder="Model" onChange={onChange} />
          <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" onChange={onChange} />
          <input type="text" name="release" id="shoe-release" placeholder="Release date" onChange={onChange} />
          <input type="text" name="designer" id="shoe-designer" placeholder="Designer" onChange={onChange} />
          <input type="text" name="value" id="shoe-value" placeholder="Value" onChange={onChange} />

          <button type="submit">post</button>
        </form>
      </div>
    </section>
  )
}

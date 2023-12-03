import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useShoesContext } from "../contexts/ShoesContext";
import { useAuthContext } from "../contexts/AuthContext";

export const DetailsPage = () => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const { getShoeById, deleteShoeById } = useShoesContext();
  const { userData } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShoeById(id)
      .then(item => {
        item.canEdit = userData._id == item._ownerId;
        setCurrentItem(item);
        setLoading(false);
      })
      .catch(err => {
        navigate('/dashboard');
      });
  }, [id]);

  const deleteShoeHandler = async () => {
    const choice = confirm('Are you sure, you want to delete this item?');
    if (choice) {
      setLoading(true);
      await deleteShoeById(id);
      navigate('/dashboard');
    }
  }

  return (
    <section id="details">
      {loading && <p>Loading...</p>}

      {!loading && <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
          <img src={currentItem.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>Brand: <span id="details-brand">{currentItem.brand}</span></p>
          <p>Model: <span id="details-model">{currentItem.model}</span></p>
          <p>Release date: <span id="details-release">{currentItem.release}</span></p>
          <p>Designer: <span id="details-designer">{currentItem.designer}</span></p>
          <p>Value: <span id="details-value">{currentItem.value}</span></p>
        </div>

        {currentItem.canEdit
          ? <div id="action-buttons">
            <a href={`/edit/${currentItem._id}`} id="edit-btn">Edit</a>
            <a href="javascript:void(0)" onClick={deleteShoeHandler} id="delete-btn">Delete</a>
          </div>
          : null}

      </div>}

    </section>
  )
}

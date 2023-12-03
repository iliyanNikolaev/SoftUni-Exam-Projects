import { Link } from "react-router-dom";

export const DashboardItem = ({
    shoe
}) => {
    return (
        <li className="card">
            <img src={shoe.imageUrl} alt="travis" />
            <p>
                <strong>Brand: </strong><span className="brand">{shoe.brand}</span>
            </p>
            <p>
                <strong>Model: </strong
                ><span className="model">{shoe.model}</span>
            </p>
            <p><strong>Value:</strong><span className="value">{shoe.value}</span>$</p>
            <Link className="details-btn" to={`/details/${shoe._id}`}>Details</Link>
        </li>
    )
}

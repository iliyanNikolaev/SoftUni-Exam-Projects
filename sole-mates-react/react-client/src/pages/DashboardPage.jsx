import { useShoesContext } from "../contexts/ShoesContext";
import { DashboardItem } from "../components/DashboardItem";
import { useEffect } from "react";

export const DashboardPage = () => {

  const { shoes, getAllShoes } = useShoesContext();

  useEffect(() => {
    getAllShoes()
  }, [])

  return (
    <>
      <section id="dashboard">
        <h2>Collectibles</h2>
        <ul className="card-wrapper">
          { shoes.map(x => <DashboardItem key={x._id} shoe={x}/>) }
        </ul>

        { shoes.length == 0 ? <h2>There are no items added yet.</h2> : null }
      </section>

    </>
  )
}

import React from 'react'

export const DashboardPage = () => {
  return (
    <>
            <section id="dashboard">
          <h2>Collectibles</h2>
          <ul className="card-wrapper">
            {/* <!-- Display a li with information about every post (if any)--> */}
            <li className="card">
              <img src="./images/travis.jpg" alt="travis" />
              <p>
                <strong>Brand: </strong><span className="brand">Air Jordan</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span className="model">1 Retro High TRAVIS SCOTT</span>
              </p>
              <p><strong>Value:</strong><span className="value">2000</span>$</p>
              <a className="details-btn" href="">Details</a>
            </li>
            <li className="card">
              <img src="./images/back2future.webp" alt="back2future" />
              <p><strong>Brand: </strong><span className="brand">Nike</span></p>
              <p>
                <strong>Model: </strong
                ><span className="model">Back To the Future Part II</span>
              </p>
              <p><strong>Value:</strong><span className="value">92100</span>$</p>
              <a className="details-btn" href="">Details</a>
            </li>
            <li className="card">
              <img src="./images/eminem.jpg" alt="eminem" />
              <p>
                <strong>Brand: </strong><span className="brand">Air Jordan</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span className="model">4 Retro CARHARTT X EMINEM</span>
              </p>
              <p><strong>Value:</strong><span className="value">30000</span>$</p>
              <a className="details-btn" href="">Details</a>
            </li>
          </ul>

          {/* <!-- Display an h2 if there are no posts --> */}
          <h2>There are no items added yet.</h2>
        </section>

    </>
  )
}

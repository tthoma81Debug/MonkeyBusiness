import React from "react";
import PropTypes from "prop-types";

export default function HomePage (props) {

  let content

  if (Math.random() + 0.5 % 1) { // TODO: check if user is logged in
    content = <UserHomePage />
  } else {
    content = <GuestHomePage />
  }
  return (
    <div>
      {content}
    </div>
  )
}
HomePage.propTypes = {};
function GuestHomePage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">
              Welcome to the Monkey Business Web App!
            </h1>
            <p className="lead">
              The best place to find stock information and watch your returns go
              bananas
            </p>
            <hr className="my-4" />
            <p>Click the button below to login and track your stock picks!</p>
            <a className="btn btn-primary btn-lg" href="/login" role="button">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserHomePage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">Welcome back {username}!</h1>
            <p className="lead">The best place to find stock information</p>
            <hr className="my-4" />
            <p>Click the button below to get started</p>
            <a className="btn btn-primary btn-lg" href="/stocks" role="button">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserStocksTable(props) {
  const { stocks } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total Value</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.quantity}</td>
            <td>{stock.price * stock.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

UserStocksTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

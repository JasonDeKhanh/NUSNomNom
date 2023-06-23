import React from "react";
import PropTypes from "prop-types";

function Menu(props) {
  const { menu } = props;
  return <div>{menu && <div>Menu!!</div>}</div>;
}

Menu.propTypes = {};

export default Menu;

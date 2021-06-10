import React from "react";
import styles from "./item.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";

function Item(props) {
  const { color, name, displaySpan } = props;
  const mainStyleLink = cn(styles.link, {
    [styles[`link__${color}`]]: color,
  });
  const greenStyle = cn(styles[`link__${props.colorSpan}`]);
  return (
    <div>
      <Link to={name} className={mainStyleLink}>
        {name}
        {displaySpan && <span className={greenStyle}>123123</span>}
      </Link>
    </div>
  );
}

export default Item;

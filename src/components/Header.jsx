import React, { useState } from "react";
import Logo from "./icons/Logo";
import Notification from "./icons/Notification";
import Message from "./icons/Message";
import { useBookStore } from "../store/bookStore";


const Header = () => {
  const [value, setValue] = useState("cat");
  const updateValue = useBookStore(state => state.updateValue)

  const handleKey = (e) =>{
    if(e.key === "Enter"){
      updateValue(value)
    }
  }

  return (
    <header>
      <ul>
        <li>
          <a href="">
            <Logo />
          </a>
        </li>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Create</a>
        </li>
        <li>
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
          />
        </li>
        <li>
          <a href="">
            <Notification />
          </a>
        </li>
        <li>
          <a href="">
            <Message />
          </a>
        </li>
        <li>
          <a href="">by: LM</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;

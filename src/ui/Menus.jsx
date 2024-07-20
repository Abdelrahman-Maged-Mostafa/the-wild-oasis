import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const menusContext = createContext();

function Menus({ children }) {
  const [opened, setOpen] = useState(null);
  const [position, setPosition] = useState({});
  const open = setOpen;
  const close = () => setOpen(null);

  const list = useRef();
  useOutsideClick(close, list);

  useEffect(function () {
    const closeList = function () {
      setOpen(null);
    };
    document.addEventListener(`scroll`, closeList);
    return () => document.removeEventListener(`scroll`, closeList);
  }, []);

  return (
    <menusContext.Provider
      value={{ opened, open, close, setPosition, position, list }}
    >
      <Menu>{children}</Menu>
    </menusContext.Provider>
  );
}
//Toggle
function Toggle({ id }) {
  const { open, setPosition } = useContext(menusContext);
  function handleClick(e) {
    const { x, y, height, width } = e.target
      .closest("button")
      .getBoundingClientRect();
    setPosition({ x: window.innerWidth - x - width, y: y + height });
    open((ids) => (ids === id ? null : id));
  }
  //(opened) => (opened === id ? null : id)
  return (
    <StyledToggle onClick={handleClick} id="toggle">
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
//List
function List({ children, id }) {
  const { opened, position, list } = useContext(menusContext);
  if (opened !== id) return null;
  return createPortal(
    <StyledList position={position} ref={list}>
      {children}
    </StyledList>,
    document.body
  );
}
//Button
function Button({ children, icon, onClick }) {
  const { close } = useContext(menusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useEffect } from "react";
import { useDarkMode } from "../context/useDarkMode";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();
  useEffect(
    function () {
      if (darkMode) {
        document.querySelector("html").classList.remove("light-mode");
        document.querySelector("html").classList.add("dark-mode");
      } else {
        document.querySelector("html").classList.add("light-mode");
        document.querySelector("html").classList.remove("dark-mode");
      }
    },
    [darkMode]
  );
  return (
    <ButtonIcon onClick={() => setDarkMode((darkMode) => !darkMode)}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

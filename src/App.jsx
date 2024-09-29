import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load the saved theme from localStorage if available
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme); // Set the theme on root
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-200" : "bg-stone-900"
      } transition-all`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          theme === "light" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
      <Todo />
    </div>
  );
}

export default App;

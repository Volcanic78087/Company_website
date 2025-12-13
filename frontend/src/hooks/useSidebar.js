import { useState, useEffect } from "react";

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }

    // Listen for custom events
    const handleSidebarToggle = (event) => {
      setCollapsed(event.detail.collapsed);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);

    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle);
    };
  }, []);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
    window.dispatchEvent(
      new CustomEvent("sidebarToggle", {
        detail: { collapsed: newState },
      })
    );
  };

  return { collapsed, toggleSidebar };
};

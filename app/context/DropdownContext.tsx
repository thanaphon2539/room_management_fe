// "use client";

// import { createContext, useContext, useState, useRef, useEffect } from "react";

// interface DropdownContextType {
//   menuOpen: boolean;
//   toggleMenu: () => void;
//   dropdownRef: React.RefObject<HTMLDivElement>;
// }

// const DropdownContext = createContext<DropdownContextType | undefined>(
//   undefined
// );

// export const DropdownProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <DropdownContext.Provider value={{ menuOpen, toggleMenu, dropdownRef }}>
//       {children}
//     </DropdownContext.Provider>
//   );
// };

// export const useDropdown = () => {
//   const context = useContext(DropdownContext);
//   if (!context) {
//     throw new Error("useDropdown must be used within a DropdownProvider");
//   }
//   return context;
// };

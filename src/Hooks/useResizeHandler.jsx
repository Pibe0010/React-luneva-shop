import { useEffect, useState } from "react";

export const useResizeHandler = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isViewNumPages, setIsViewNumPages] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 450) {
        setItemsPerPage(1);
        setIsMobile(true);
        setIsViewNumPages(true);
      } else if (width <= 860) {
        setItemsPerPage(1);
        setIsMobile(false);
        setIsViewNumPages(false);
      } else {
        setItemsPerPage(4);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { itemsPerPage, isMobile, isViewNumPages };
};

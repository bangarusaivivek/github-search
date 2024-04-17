import { useEffect } from "react";

const useInfiniteScroll = (
  parentRef: React.RefObject<HTMLElement>,
  callback: () => void,
  isLoading: boolean
) => {
  useEffect(() => {
    if (isLoading) return;

    const parentElement = parentRef.current;
    if (!parentElement) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = parentElement;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        callback();
      }
    };

    const handleKeyDown = (event: any) => {
      // Detect arrow key down events
      if (event.key === "ArrowDown") {
        parentElement.scrollTop += 100;
      } else if (event.key === "ArrowUp") {
        parentElement.scrollTop -= 100;
      }
    };

    parentElement.addEventListener("scroll", handleScroll);
    parentElement.addEventListener("keydown", handleKeyDown);
    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
      parentElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentRef, callback, isLoading]);
};

export default useInfiniteScroll;

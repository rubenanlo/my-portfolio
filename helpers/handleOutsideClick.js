export const handleOutsideClick = (boxRef, setOpen, buttonRef = null) => {
  const handleOpenClose = (event) => {
    let boxCondition = boxRef.current && !boxRef.current.contains(event.target);
    let buttonCondition = buttonRef
      ? buttonRef.current && !buttonRef.current.contains(event.target)
      : true;

    if (boxCondition && buttonCondition) {
      setOpen(false);
    }
  };

  window.addEventListener("mousedown", handleOpenClose);

  return () => {
    window.removeEventListener("mousedown", handleOpenClose);
  };
};

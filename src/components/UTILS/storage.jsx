export const saveForm = (form) => {
    localStorage.setItem("dynamicForm", JSON.stringify(form));
  };
  
  export const loadForm = () => {
    const savedForm = localStorage.getItem("dynamicForm");
    return savedForm ? JSON.parse(savedForm) : null;
  };
  
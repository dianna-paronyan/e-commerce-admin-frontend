
function useLocalStorage() {
    const user = JSON.parse(localStorage.getItem("user"));
  return {user}
}

export default useLocalStorage
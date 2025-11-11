import React, { useEffect, useState } from "react";
import { fetchTodos } from "../data/todos";

function Todos() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === "") return;
    const nextId = todosRaw.length ? todosRaw[todosRaw.length - 1].id + 1 : 1;

    const newTodo = {
      id: nextId,
      title: newTodoTitle,
      completed: false,
    };

    setTodosRaw([...todosRaw, newTodo]);
    setNewTodoTitle("");
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todosRaw.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      } else {
        return todo;
      }
    });
    setTodosRaw(updatedTodos);
  };

  const handleDelete = (id) => {
    const remainingTodos = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(remainingTodos);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      console.log("ไม่มีหน้านี้ในระบบ");
    }
  };

  let filterTodos = showOnlyWaiting
    ? todosRaw.filter((todo) => todo.completed === false)
    : todosRaw;

  const nextId = todosRaw.length ? todosRaw[todosRaw.length - 1].id + 1 : 1;
  const totalPages = Math.ceil(filterTodos.length / itemsPerPage);
  const indexOfLI = currentPage * itemsPerPage;
  const indexOfFI = indexOfLI - itemsPerPage;
  const currentTodos = filterTodos.slice(indexOfFI, indexOfLI);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white-100 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showOnlyWaiting}
              onChange={(e) => {
                const checkedValue = e.target.checked;
                setShowOnlyWaiting(checkedValue);
                setCurrentPage(1);
              }}
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-300 ease-in-out shadow-inner">
              <div
                className={`absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${
                  showOnlyWaiting ? "translate-x-7" : "translate-x-0"
                } hover:scale-110`}
              ></div>
            </div>
          </label>
          <span className="text-gray-700 font-medium">Show only</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            waiting 🕒
          </span>
        </div>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setItemsPerPage(newValue);
            setCurrentPage(1);
          }}
          className="form-select block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-end p-2 ">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            +
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/12">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-7/12">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-4/12 flex justify-end p-2 ">
                Completed
              </th>
              
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentTodos.map((todo) => {
              let statusClass = "";
              let statusText = "";

              if (todo.completed === true) {
                statusClass = "bg-green-100 text-green-800";
                statusText = "done ✔";
              } else {
                statusClass = "bg-yellow-100 text-yellow-800";
                statusText = "waiting 🕒";
              }

              return (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {todo.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {todo.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span
                        onClick={() => handleToggleStatus(todo.id)}
                        className={`cursor-pointer px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
                      >
                        {statusText}
                      </span>

                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          First
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Last
        </button>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Todo</h2>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="number"
                value={nextId}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter todo title..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todos;
import { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../app/api/api.Slice.js";
import "./home.scss";

const Home = () => {
  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [newTodo, setNewTodo] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [id, setId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo !== "") {
      addTodo({ userId: 1, title: newTodo, completed: false });
      setNewTodo("");
    } else {
      alert("Opps! Empty Item");
    }
  };

  const handleEdit = (e, todo) => {
    updateTodo({ ...todo, title: e.target.value });
  };

  return (
    <div className="m-auto container">
      <h1 className="mt-4 text-3xl font-bold mb-4 text-slate-600">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          {/* <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && e.shiftKey === false) {
                handleSubmit(e);
              }
            }}
            placeholder="Enter todo item"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          /> */}
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && e.shiftKey === false) {
                handleSubmit(e);
              }
            }}
            placeholder="Enter todo item"
            class="block w-11/12 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          {/* <div className="input-group-append"> */}
          <button type="submit" className="border px-4 py-1.5 h-fit rounded-md bg-slate-400 text-neutral-50 hover:bg-slate-500">
            {/* <span className="input-group-text border-0 bg-transparent" id="inputGroup-sizing-default"> */}
            {/* <i className="fa-solid fa-plus text-slate-500"></i> */}
            Add
            {/* </span> */}
          </button>
          {/* </div> */}
        </div>
      </form>

      {isLoading && "Loading..."}
      {isSuccess && (
        <div>
          {todos.map((todo, index) => {
            return (
              <div className="flex justify-between mb-3 p-2 border" key={index}>
                <div className="flex justify-center items-center">
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    id={todo.id}
                    onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                    className="mr-2"
                  />
                  <input
                    value={todo.title}
                    onChange={(e) => handleEdit(e, todo)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13 && e.shiftKey === false) {
                        setDisableInput(true);
                      }
                    }}
                    disabled={todo.id === id ? disableInput : true}
                    type="text"
                    id={todo.id}
                    className="border-0 bg-transparent text-slate-600"
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      setId(todo.id);
                      setDisableInput(false);
                    }}
                    className="mr-2 border-0"
                  >
                    <i className="fa-solid fa-edit text-slate-500"></i>
                  </button>
                  <button onClick={() => deleteTodo({ id: todo.id })} className=" border-0 hover:color-slate-900">
                    <i className="fa-solid fa-trash text-slate-500"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isError && <p>{error}</p>}
    </div>
  );
};

export default Home;

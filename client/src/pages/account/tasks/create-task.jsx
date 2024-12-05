import { useContext, useState } from "react";
import { Appcontext } from "../../../context/appcontext";

export default function CreateTask() {
  const { user } = useContext(Appcontext);
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    desc: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const task = { taskData, user: user._id };
    console.log("Task Created:", task);

    setTaskData({
      title: "",
      desc: "",
      status: "",
    });

    setLoading(false);
  };

  return (
    <div className="p-6  rounded-md  w-3/4">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={taskData.title}
            onChange={handleChange}
            className="p-3 rounded-md border w-full focus:outline-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-lg font-medium mb-2">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={taskData.desc}
            onChange={handleChange}
            className="p-3 h-52 resize-none rounded-md border w-full focus:outline-blue-500"
            placeholder="Enter task description"
            required
          />
        </div>

        <div>
          <h1 className="text-lg font-medium mb-2">Choose Priority</h1>
          <div className="flex gap-4">
            {["High", "Medium", "Low"].map((priority) => (
              <div key={priority}>
                <input
                  id={priority}
                  name="status"
                  value={priority}
                  type="radio"
                  checked={taskData.status === priority}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={priority} className="text-sm font-medium">
                  {priority}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-3 w-full rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500"
          } text-white font-bold hover:bg-blue-600 transition`}
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}

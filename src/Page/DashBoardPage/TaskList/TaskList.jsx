import  { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TaskList = () => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);
  

    useEffect(() => {
        // Fetch tasks when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await axiosSecure.get('/task');
                // Assuming the response data is an array of tasks
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [axiosSecure]);

    

    return (
        <div>
     
            <h2 className='text-4xl text-center font-bold mb-5'>Task List</h2>
            {tasks.map((task) => (
                <div key={task._id} className="card text-white bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Title: {task.title}</h2>
                        <p>Description: {task.taskDescription}</p>
                        <p>Deadline: {task.deadline}</p>
                        <p>Priority: {task.priority}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;

import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import TaskCard from './TaskCard';

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
        <div className='w-full'>

            <h2 className='text-4xl text-center font-bold mb-5'>Task List</h2>
            <div className='md:flex text-white gap-4'>
                <div className=' bg-red-500 md:w-1/3 p-3'>
                    <h1 className='text-4xl   font-bold mb-3'>To-Do-List</h1>
                  <div className=' flex md:flex-col gap-4'>
                  {tasks.map((task) => (<TaskCard key={task._id} task={task}></TaskCard>))}
                  </div>
                </div>
                <div className=' md:w-1/3'>
                    <h1 className='text-4xl font-bold mb-3'>On-Going</h1>
                </div>
                <div className=' md:w-1/3'>
                    <h1 className='text-4xl font-bold mb-3'>Completed</h1>
                </div>


            </div>
           
        </div>
    );
};

export default TaskList;
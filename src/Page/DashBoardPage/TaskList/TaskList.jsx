
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const TaskList = () => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosSecure.get('/task');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [axiosSecure]);

    const handleDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }
    
        const { source, destination } = result;
    
        // If the task is dropped back into the same list and position, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
    
        // Update the status of the moved task
        movedTask.status = destination.droppableId; // Use your own status values here
    
        updatedTasks.splice(result.destination.index, 0, movedTask);
    
        // Update tasks in the state
        setTasks(updatedTasks);
    
        // Update task status in the backend (if needed)
        try {
            const updatedTasksData = updatedTasks.map((task) => ({
                _id: task._id,
                status: task.status,
            }));
    
            await axiosSecure.put('/task/status', { updatedTasks: updatedTasksData });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };
    
    const handleDelete = (task) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/task/${task._id}`);
                if (res.data.deletedCount > 0) {
                   
                    toast.success(`${task.title} has Been Deleted`);
                    fetchTasks();
                }
            }
        });
    } 
    const fetchTasks = async () => {
        try {
            const response = await axiosSecure.get('/task');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    return (
        <div>
            <h2 className='text-4xl text-center font-bold mb-5'>Task List</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='lg:flex w-full  text-white gap-4'>
                    {/* To-Do List Section */}
                    <Droppable droppableId="todo-list" direction="vertical">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='bg-red-500 min-h-60 lg:w-1/3 p-3'
                            >
                                <h1 className='text-4xl text-center font-bold mb-3'>To-Do List</h1>
                                {tasks.filter((task) => task.status === 'todo-list') // Adjust the condition based on your task structure
                                        .map((task, index) =>(
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="card text-white bg-base-100 mb-2 shadow-xl">
                                                    <div className="card-body">
                                                        <h2 className="card-title">Title: {task.title}</h2>
                                                        <p>Description: {task.taskDescription}</p>
                                                        <p>Deadline: {task.deadline}</p>
                                                        <p>Priority: {task.priority}</p>
                                                    </div>
                                                    <button onClick={()=>handleDelete(task)} className='btn text-white bg-red-500'>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* On-Going Section */}
                    <div className='lg:w-1/3 min-h-60 bg-yellow-400 p-3'>
                        <h1 className='text-4xl text-center font-bold mb-3'>On-Going</h1>
                        <Droppable droppableId="on-going-list" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {tasks
                                        .filter((task) => task.status === 'on-going-list') // Adjust the condition based on your task structure
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="card text-white mb-2 bg-base-100 shadow-xl">
                                                            <div className="card-body">
                                                                <h2 className="card-title">Title: {task.title}</h2>
                                                                <p>Description: {task.taskDescription}</p>
                                                                <p>Deadline: {task.deadline}</p>
                                                                <p>Priority: {task.priority}</p>
                                                            </div>
                                                            <button onClick={()=>handleDelete(task)} className='btn text-white bg-red-500'>Delete</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* Completed Section */}
                    <div className='lg:w-1/3 min-h-60 bg-orange-400 p-3'>
                        <h1 className='text-4xl font-bold text-center mb-3'>Completed</h1>
                        <Droppable droppableId="completed-list" direction="vertical">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {tasks
                                        .filter((task) => task.status === 'completed-list') // Adjust the condition based on your task structure
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="card  text-white mb-2 bg-base-100 shadow-xl">
                                                            <div className="card-body">
                                                                <h2 className="card-title">Title: {task.title}</h2>
                                                                <p>Description: {task.taskDescription}</p>
                                                                <p>Deadline: {task.deadline}</p>
                                                                <p>Priority: {task.priority}</p>
                                                            </div>
                                                            <button onClick={()=>handleDelete(task)} className='btn text-white bg-red-500'>Delete</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList;

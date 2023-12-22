import React from 'react';

const TaskCard = ({task}) => {
    return (
        <div   className="card text-white bg-base-100 shadow-xl">
                
                <div className="card-body">
                    <h2 className="card-title">Title: {task.title}</h2>
                    <p>Description: {task.taskDescription}</p>
                    <p>Deadline: {task.deadline}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            
               </div>
    );
};

export default TaskCard;
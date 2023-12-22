
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateTask = () => {
    const axiosSecure = useAxiosSecure();
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        const formData = {
            title: data.title,
            taskDescription: data.taskDescription,
            deadline: data.deadline,
            priority: data.priority,
        }
        console.log(formData)
        const taskRes = await axiosSecure.post('task', formData)
        if (taskRes.data.insertedId) {
            reset()
            Swal.fire({
                position: 'top-end',
                title: `${data.title} is added to the Task Collection`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }


    return (
        <div>
            <h2 className='text-4xl text-center mb-5'>Create New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input required type="text" {...register('title', { required: true })} placeholder="Task Title" className="input input-bordered w-full " />
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <textarea
                        required
                        {...register('taskDescription', { required: true })}
                        placeholder="Task Description"
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input
                        className='input w-full input-bordered text-white'
                        type="date"  
                        id="deadline"
                        {...register('deadline')}
                    />
                </div>



                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Priority</span>
                    </label>
                    <select
                        className='select  select-bordered w-full text-white'
                        id="priority"
                        {...register('priority')}
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>


                <button type="submit" className='btn w-full bg-red-500 mt-5 text-white'>Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;

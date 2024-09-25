import { TaskDataType } from "../../components/Tasks/types"
import { typeRequest } from "./typeRequest"

export const updateTask = async(taskId: number, taskData: TaskDataType) =>{
  const getRequest = typeRequest('PUT')
  try {
    const res = await getRequest({
      url: `/api/tasks/${taskId}/update`,
      data: taskData,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to update task: ', error)
    throw error
  }
  
}
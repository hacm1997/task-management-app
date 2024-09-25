import { TaskDataType } from "../../components/Tasks/types"
import { typeRequest } from "./typeRequest"

export const saveTasks= async(taskData: TaskDataType) =>{
  const getRequest = typeRequest('POST')
  try {
    const res = await getRequest({
      url: '/api/tasks',
      data: taskData,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to save task: ', error)
    throw error
  }
  
}
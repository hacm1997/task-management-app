import { typeRequest } from "./typeRequest"

export const getTasksById = async(taskId: number) =>{
  const getRequest = typeRequest('GET')
  try {
    const res = await getRequest({
      url: `/api/tasks/${taskId}`,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to get tak: ', error)
    throw error
  }
  
}
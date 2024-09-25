import { typeRequest } from "./typeRequest"

export const deleteTask = async(taskId: number) =>{
  const getRequest = typeRequest('DELETE')
  try {
    const res = await getRequest({
      url: `/api/tasks/${taskId}`,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to delete task: ', error)
    throw error
  }
  
}
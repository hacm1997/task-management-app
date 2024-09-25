import { typeRequest } from "./typeRequest"

export const changeCompelteTaskStatus = async(taskId: number, complete: number) =>{
  const getRequest = typeRequest('PUT')
  try {
    const res = await getRequest({
      url: `/api/tasks/${taskId}/complete/${complete}`,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to delete task: ', error)
    throw error
  }
  
}
import { typeRequest } from "./typeRequest"

export const getTasks= async(currPage?: number, completed?: number | null, serchText?: string) =>{
  const getRequest = typeRequest('GET')
  try {
    const res = await getRequest({
      url: `/api/tasks?page=${currPage}${completed !== null ? `&completed=${completed}` : ''}${serchText !== '' ? `&search=${serchText}` : ''}`,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to get taks: ', error)
    throw error
  }
  
}
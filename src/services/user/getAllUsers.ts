import { typeRequest } from "../task/typeRequest"

export const getAllUsers= async(currPage?: number) =>{
  const getRequest = typeRequest('GET')
  try {
    const res = await getRequest({
      url: `/api/all-users?page=${currPage}`,
    })
    const response = res.data
    return response
  } catch (error) {
    console.error('Error to get users: ', error)
    throw error
  }
  
}
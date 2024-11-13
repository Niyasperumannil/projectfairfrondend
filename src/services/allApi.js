//register

import { commenApi } from "./commenAPi"
import { serverUrl } from "./serverUrl"

export const registerApi = async(reqBody)=>{
    return await commenApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commenApi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project

export const addProjectApi = async(reqBody,reqheader)=>{
    return await commenApi('POST',`${serverUrl}/add-project`,reqBody,reqheader)
}
//home project
export const  homeProjectApi = async()=>{
    return await commenApi('GET',`${serverUrl}/home-project`)
}
//all project
//query parameter = bseurl?key=value
export const allProjectApi = async(searchKey,reqHeader)=>{
    //query parameter = baseurl?key=value
    //path parameter = baseurl/id = baseurl/id
    return await commenApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}
//user project
export const userProjectApi = async(reqHeader)=>{
    return await commenApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}
//remover user project
export const removeUserProjectApi = async(id,reqHeader)=>{
    return await commenApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}
//api to update
export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commenApi('PUT',`${serverUrl}/update-userproject/${id}`,reqBody,reqHeader)
}
//api to update profile

export const updateUserProfileApi = async(reqBody,reqHeader)=>{
  return await commenApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}

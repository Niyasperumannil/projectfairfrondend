import { faAngleDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allApi';
import Collapse from 'react-bootstrap/Collapse';



function Profile() {
    
    const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        password:"",
        profile:"",
        github:"",
        linkedin:""
    })
    const [preview,setPreview]=useState("")
    const [existingImg,setExistingImg]= useState("")
    const [updatestatus,setUpdateStatus] = useState("")
    //console.log(userDetails);
    const handlefile = (e)=>{
        setUserDetails({...userDetails, profile:e.target.files[0]})
    }

   
    const handleupdate = async ()=>{
        const {username,email,password,profile,github,linkedin} = userDetails
        if(!github || !linkedin){
            toast.info('please add github and linkedin')
        }
        else{
            const reqbody =new FormData()
            reqbody.append("username",username)
            reqbody.append("email",email)
            reqbody.append("password",password)
            
            reqbody.append("github",github)
            reqbody.append("linkedin",linkedin)
            preview?reqbody.append("profile",profile): reqbody.append("profile",existingImg)
           
            const token =sessionStorage.getItem("token")
            if(preview){
                const reqHeader={
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserProfileApi(reqbody,reqHeader)
                console.log(result);
                if(result.status == 200){
                    toast.success('updated successfuly')
                    sessionStorage.setItem('existngUser',JSON.stringify(result.data))
                    setUpdateStatus(result)
                }else{
                    toast('something went wrong')
                }
            }else{
                const reqHeader={
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserProfileApi(reqbody,reqHeader)
                console.log(result);
                if(result.status == 200){
                    toast.success('updated successfuly')
                    sessionStorage.setItem('existngUser',JSON.stringify(result.data))
                    setUpdateStatus(result)
                }else{
                    toast('something went wrong')
                }
                
            }
          
        }
    }
   

    useEffect(()=>{
        if(sessionStorage.getItem("existngUser")){
            const user = JSON.parse(sessionStorage.getItem("existngUser"))
            console.log(user);
            setUserDetails({...userDetails, username:user.username, email:user.email, password:user.password, github:user.github, linkedin:user.linkedin})
            setExistingImg(user.profile)
        }
    },[updatestatus])

    useEffect(()=>{
        if(userDetails.profile){
            setPreview(URL.createObjectURL(userDetails.profile))
        }
    },[userDetails.profile])
   // console.log(preview);

    
    return (
    <div className='p-4 shadow '>
    <div className='d-flex justify-content-between'>
        <h3>Profile</h3>
        <button className='btn' style={{borderColor:'rgb(160,98,192)'}}><FontAwesomeIcon icon={faArrowUp} />:<FontAwesomeIcon icon={faAngleDown} /></button>
        </div>

              <div className='d-flex justify-content-center align-items-center flex-column mt-3 mb-3'>
                    <label htmlFor="profileimage">
                        <input type="file" id='profileimage' style={{display:'none'}} onChange={(e)=>handlefile(e)}/>
                        
                       <div className='d-flex justify-content-center align-items-center'>
                        {existingImg==""?

                        <img src={preview?preview:''}alt="no image" className='w-50 mb-3'  />
                        :
                        <img src={preview?preview:`${serverUrl}/upload/${existingImg}`} alt='no image' style={{width:'200px',height:'200'}} />
                    }
                        </div>
    
                    </label>

                <div className="w-100">
                    <div className="mb-3">
                        <input type="text" placeholder='GitHub' className='form-control' value={userDetails?.github} onChange={(e)=>
                        setUserDetails({...userDetails,github:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                    <input type="text" placeholder='linkedin' className='form-control' value={userDetails?.linkedin} onChange={(e)=>
                        setUserDetails({...userDetails,linkedin:e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-success w-100' onClick={handleupdate}>Update</button>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000}/>
</div>

  )
}

export default Profile

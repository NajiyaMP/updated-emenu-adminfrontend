

import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import { Button, Modal } from 'react-bootstrap'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from 'axios'
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import SmallNav from './SmallNav';


function Maincategories() {
  

    const  backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [uid, setUid] = useState('')
    const [show, setShow] = useState(false);
    const [on, setOn] = useState(false)
    const [maincategories, setMaincategories] = useState('')
    const [getMaincategories, setGetMaincategories] = useState([])
    const [getMaincategoriesById, setGetMaincategoriesById] = useState('')
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(backendUrl,'the url')
  const handleOff = ()=> setOn(false)

  const postMaincategories = async()=>{
    const data = {
        maincategories:maincategories
    }
    try{
     await axios.post(`${backendUrl}/admin/postmaincategories`, data)
     window.location.reload()
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    const fetch = async()=>{
        try{
            const response = await axios.get(`${backendUrl}/admin/getmaincategories`)
            const data = response.data
            setGetMaincategories(data)
            // console.log(backendUrl,'the url')
        }catch(err){
            console.log(err,'the error message showing that')
        }
    }
    fetch()
  }, [backendUrl])
  
  
  const handleOn = async(id)=> {
    setOn(true);
    setUid(id)
    
    try{
        const response = await axios.get(`${backendUrl}/admin/getmaincategoriesbyid/${id}`)
        const data = response.data
        setGetMaincategoriesById(data)
        console.log(data,'this is data')
    }catch(err){
        console.log(err)
    }

}
const handleUpdateChange = (e)=>{
    const {name, value} = e.target
    setGetMaincategoriesById((prevstate)=>({...prevstate, [name]:value}))
    
}

const updateMaincategories = async()=>{
    const data = {
        maincategories:getMaincategoriesById.maincategories
    }
  try{
    await axios.put(`${backendUrl}/admin/putmaincategories/${uid}`, data)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}

const handleDelete = async(id)=>{
    const windowConfirmation = window.confirm('Are you sure to Delete this item')
    if(windowConfirmation){
        try{
            await axios.delete(`${backendUrl}/admin/deletemaincategories/${id}`)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
}


  return (
    <div className='' >
      <SmallNav/>
        <SideNav/>
        <div>
            <div className=" container main-contenet">
                  <div className="pl-3 row main-row">
                      <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <h2 style={{color:"#b20769"}}><b> Parent CATEGORIES</b></h2>
                          <Tooltip className='add_btn' title='Add'>
                            <Link>
                          <IoIosAddCircle className='add_btn'  onClick={handleShow} />
                          </Link>
                          </Tooltip>
                      </div>
                      
                      {getMaincategories.map((items, index)=>(
                      
                          <div  key={index} className="col-12 my-1 p-2 montserrat-400" style={{display:'flex', alignItems:'center', justifyContent:'space-between', backgroundColor:'#dee2e6'}}>
                            <h5 className='text-black'>{items.maincategories}</h5>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'20%'}}>
                            <FiEdit style={{color:'black', cursor:'pointer'}} onClick={()=> handleOn(items._id)} />
                            <MdDelete style={{color:'black', cursor:'pointer'}} onClick={()=> handleDelete(items._id)} />
                          </div>
                        
                          

                      </div>
                      
                      ))}
                      
                      
                      
                  </div>
            </div>
        </div>
         

        <Modal show={show} onHide={handleClose} className='montserrat-400'>
        <Modal.Header closeButton>
          <Modal.Title>Add  Main Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input className='input-style' type="text" style={{width:'100%'}} onChange={(e)=> setMaincategories(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postMaincategories}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


        <Modal show={on} onHide={handleOff} className='montserrat-400'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input value={getMaincategoriesById.maincategories} name='maincategories' type="text" style={{width:'100%'}} onChange={handleUpdateChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOff}>
            Close
          </Button>
          <Button variant="primary" onClick={updateMaincategories}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Maincategories
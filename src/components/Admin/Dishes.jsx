
import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Link } from "react-router-dom";
// import SmallNav from "./SmallNav";

function Dishes() {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [uid, setUid] = useState("");
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(false);
  const [dishes, setDishes] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categotries, setCategories] = useState("");
  const [Itemnumber, setItemnumber] = useState("");
  const [weight, setWeight] = useState("");
  const [purity, setPurity] = useState("");
  const [details, setDetails] = useState("");
  const [getCategories, setGetCategories] = useState([]);
  const [getDishes, setGetDishes] = useState([]);
  const [getDishesById, setGetDishesById] = useState({
    dishes: "",
    price: "",
    description:"",
    Itemnumber: "",
    weight: "",
    purity: "",
    details: "",

  });
  console.log(getDishesById, "the dishes by id");
  const [getCategoriesById, setGetCategoriesById] = useState("");
  const [file, setFile] = useState("");

  const handleClose = () => setShow(false);

  const handleOff = () => setOn(false);

  const handleShow = async () => {
    setShow(true);
    try {
      const response = await axios.get(`${backendUrl}/admin/getcategories`);
      const data = response.data;
      setGetCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getcategories`);
        const data = response.data;
        setGetCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, [backendUrl]);

  const postCategories = async () => {
    const formdata = new FormData();
    formdata.append("dishes", dishes);
    formdata.append("description", description);
    formdata.append("categories", categotries);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("Itemnumber", Itemnumber);
    formdata.append("weight", weight);
    formdata.append("purity", purity);
    formdata.append("details", details);

    try {
      await axios.post(`${backendUrl}/admin/postdishes`, formdata);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getdishes`);
        const data = response.data;
        // console.log(response.data,"heeee")
        setGetDishes(data);
        // console.log(data,"dishes dateaaaa")
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [backendUrl]);

  const handleOn = async (id) => {
    setOn(true);
    setUid(id);

    try {
      const response = await axios.get(
        `${backendUrl}/admin/getdishesbyid/${id}`
      );
      const data = response.data;
      setGetDishesById({
        dishes: data.dishes,
        price: data.price,
        description: data.description,
        Itemnumber: data.Itemnumber,
        weight: data.weight,
        purity: data.purity,
        details: data.details,



      });
      setGetCategoriesById(data.categories);
      console.log(data.price, "this is data");
    } catch (err) {
      console.log(err);
    }
  };
  // const handleUpdateChange = (e)=>{
  //     const {name, value} = e.target
  //     getDishesById((prevstate)=>({...prevstate, [name]:value}))

  // }

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setGetDishesById((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateCategories = async () => {
    const formdata = new FormData();
    formdata.append("dishes", getDishesById.dishes);
    formdata.append("description", getDishesById.description);
    formdata.append("price", getDishesById.price);
    formdata.append("categories", getCategoriesById);
    formdata.append("Itemnumber", getDishesById.Itemnumber);
    formdata.append("weight", getDishesById.weight);
    formdata.append("purity", getDishesById.purity);
    formdata.append("details", getDishesById.details);
    formdata.append("image", file);
    try {
      await axios.put(`${backendUrl}/admin/putdishes/${uid}`, formdata);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const windowConfirmation = window.confirm(
      "Are you sure to Delete this item"
    );
    if (windowConfirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/deletedishes/${id}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {/* <SmallNav /> */}
      <SideNav />
      <div className="whole">
        <div className="  main-contenet">
          <div className="pl-3 row main-row">
            <div
              className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{color:"#b20769"}}><b>ITEMS</b></h2>
              {/* <Button className='add_btn' variant="success">Add</Button>{' '} */}
              <Tooltip className="add_btn" title="Add">
                <Link>
                  <IoIosAddCircle className="add_btn" onClick={handleShow} />
                </Link>
              </Tooltip>
            </div>
            <div className="container">
              <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Item Number</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Purity</th>
                      <th scope="col">Details</th>
                      <th scope="col">Category</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDishes.map((items, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="avatar"
                            src={`${backendUrl}/images/${items.image}`}
                            alt="pic"
                          />
                        </td>
                        <td className="text-black item-text">{items.Itemnumber}</td>
                        <td className="text-black item-text"><b>{items.dishes}</b></td>
                        <td className="text-black item-text">{items.description}</td>
                        <td className="text-black item-text">₹ {items.price}</td>
                        <td className="text-black item-text">{items.weight}</td>
                        <td className="text-black item-text">{items.purity}</td>
                        <td className="text-black item-text">{items.details}</td>
                        <td className="text-black item-text">
                          {getCategories.find((item) => item._id === items.categories)?.categories}
                        </td>
                        <td>
                          <Tooltip title="Edit">
                            <Link>
                              <FiEdit
                                style={{ color: "black", cursor: "pointer" }}
                                onClick={() => handleOn(items._id)}
                              />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Link>
                              <MdDelete
                                style={{ color: "black", cursor: "pointer" }}
                                onClick={() => handleDelete(items._id)}
                              />
                            </Link>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>

            </div>
               
           
          </div>
        </div>
      </div>
     

      <Modal className="montserrat-400" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add jewellery products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            style={{ width: "100%" }}
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-3"
          />
          <input
            placeholder="item-number"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setItemnumber(e.target.value)}
          />
          <input
            placeholder="products"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setDishes(e.target.value)}
          />
          <input
            placeholder="description"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setDescription(e.target.value)}
          />
         

          <select
            onChange={(e) => setCategories(e.target.value)}
            value={categotries}
            className="my-3"
            style={{ width: "100%",marginBottom:'1rem' }}
            name=""
            id=""
          >
            <option value="">Select..</option>
            {getCategories.map((items, index) => (
              <option key={index} value={items._id}>
                {items.categories}
              </option>
            ))}
          </select>
          <input
            placeholder="Price"
            type="number"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="weight"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            placeholder="purity"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setPurity(e.target.value)}
          />
          <input
            placeholder="details"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => setDetails(e.target.value)}
          />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postCategories}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={on} onHide={handleOff} className="montserrat-400">
        <Modal.Header closeButton>
          <Modal.Title>Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            style={{ width: "100%", margin: "10px" }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            value={getDishesById.Itemnumber}
            name="Itemnumber"
            type="text"
            placeholder="itemnumber"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />

          <input
            value={getDishesById.dishes}
            name="dishes"
            type="text"
            placeholder="dishes"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
          <input
            value={getDishesById.description}
            name="description"
            type="text"
            placeholder="description"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />



          <select
            onChange={(e) => setGetCategoriesById(e.target.value)}
            value={getCategoriesById}
            className="my-3"
            style={{ width: "100%",marginBottom:'1rem' }}
            name=""
            id=""
          >
            <option value="">Select..</option>
            {getCategories.map((items, index) => (
              <option key={index} value={items._id}>
                {items.categories}
              </option>
            ))}
          </select>

          <input
            value={getDishesById.price}
            name="price"
            type="number"
            placeholder="price"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <input
            value={getDishesById.weight}
            name="weight"
            type="text"
            placeholder="weight"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <input
            value={getDishesById.purity}
            placeholder="purity"
            name="purity"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <input
            value={getDishesById.details}
            name="details"
            type="text"
            placeholder="details"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOff}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCategories}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Dishes;



//multiple file upload fullcode
// import React, { useEffect, useState } from "react";
// import SideNav from "./SideNav";
// import { Button, Modal } from "react-bootstrap";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";
// import { IoIosAddCircle } from "react-icons/io";
// import Tooltip from "@mui/material/Tooltip";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Dishes() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [uid, setUid] = useState("");
//   const [show, setShow] = useState(false);
//   const [on, setOn] = useState(false);
//   const [dishes, setDishes] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [categories, setCategories] = useState("");
//   const [ItemNumber, setItemNumber] = useState("");
//   const [weight, setWeight] = useState("");
//   const [purity, setPurity] = useState("");
//   const [details, setDetails] = useState("");
//   const [getCategories, setGetCategories] = useState([]);
//   const [getDishes, setGetDishes] = useState([]);
//   const [getDishesById, setGetDishesById] = useState({
//     dishes: "",
//     price: "",
//     description:"",
//     ItemNumber: "",
//     weight: "",
//     purity: "",
//     details: "",
//   });
//   const [getCategoriesById, setGetCategoriesById] = useState("");
//   const [files, setFiles] = useState([]);
//   const [editFiles, setEditFiles] = useState([]);

//   const handleClose = () => setShow(false);
//   const handleOff = () => setOn(false);

//   const handleShow = async () => {
//     setShow(true);
//     try {
//       const response = await axios.get(`${backendUrl}/admin/getcategories`);
//       setGetCategories(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getcategories`);
//         setGetCategories(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchCategories();
//   }, [backendUrl]);

//   const postCategories = async () => {
//     const formData = new FormData();
//     formData.append("dishes", dishes);
//     formData.append("description", description);
//     formData.append("categories", categories);
//     formData.append("price", price);
//     formData.append("ItemNumber", ItemNumber);
//     formData.append("weight", weight);
//     formData.append("purity", purity);
//     formData.append("details", details);
//     files.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       await axios.post(`${backendUrl}/admin/postdishes`, formData);
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getdishes`);
//         setGetDishes(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchDishes();
//   }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getdishesbyid/${id}`);
//       const data = response.data;
//       setGetDishesById({
//         dishes: data.dishes,
//         price: data.price,
//         description: data.description,
//         ItemNumber: data.ItemNumber,
//         weight: data.weight,
//         purity: data.purity,
//         details: data.details,
//         images:data.images
//       });
//       setGetCategoriesById(data.categories);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setGetDishesById((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const updateCategories = async () => {
//     const formData = new FormData();
//     formData.append("dishes", getDishesById.dishes);
//     formData.append("description", getDishesById.description);
//     formData.append("price", getDishesById.price);
//     formData.append("categories", getCategoriesById);
//     formData.append("ItemNumber", getDishesById.ItemNumber);
//     formData.append("weight", getDishesById.weight);
//     formData.append("purity", getDishesById.purity);
//     formData.append("details", getDishesById.details);
//     editFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       await axios.put(`${backendUrl}/admin/putdishes/${uid}`, formData);
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const windowConfirmation = window.confirm("Are you sure to delete this item?");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletedishes/${id}`);
//         window.location.reload();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <SideNav />
//       <div className="whole">
//         <div className="container main-content">
//           <div className="pl-3 row main-row">
//             <div
//               className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <h2 style={{ color: "#b20769" }}><b>ITEMS</b></h2>
//               <Tooltip className="add_btn" title="Add">
//                 <Link>
//                   <IoIosAddCircle className="add_btn" onClick={handleShow} />
//                 </Link>
//               </Tooltip>
//             </div>
//             <div className="container">
//               <table className="table table-striped table-bordered">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">Images</th>
//                     <th scope="col">Item Number</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Description</th>
//                     <th scope="col">Price</th>
//                     <th scope="col">Weight</th>
//                     <th scope="col">Purity</th>
//                     <th scope="col">Details</th>
//                     <th scope="col">Category</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {getDishes.map((items, index) => (
//                     <tr key={index}>
//                        <td>
//                         {items.images && items.images.length > 0 ? (
//                           items.images.map((image, imgIndex) => (
//                             <img
//                               key={imgIndex}
//                               className="avatar"
//                               src={`${backendUrl}/images/${image}`}
//                               alt="pic"
                             
//                             />
//                           ))
//                         ) : (
//                           <span>No Images</span>
//                         )}
//                       </td>
//                       {/* <td>
//                         {items.images.map((image, imgIndex) => (
//                           <img
//                             key={imgIndex}
//                             className="avatar"
//                             src={`${backendUrl}/images/${image}`}
//                             alt="pic"
//                           />
//                         ))}
//                       </td> */}
//                       <td className="text-black item-text">{items.ItemNumber}</td>
//                       <td className="text-black item-text"><b>{items.dishes}</b></td>
//                       <td className="text-black item-text">{items.description}</td>
//                       <td className="text-black item-text">₹ {items.price}</td>
//                       <td className="text-black item-text">{items.weight}</td>
//                       <td className="text-black item-text">{items.purity}</td>
//                       <td className="text-black item-text">{items.details}</td>
//                       <td className="text-black item-text">
//                         {getCategories.find((item) => item._id === items.categories)?.categories}
//                       </td>
//                       <td>
//                         <Tooltip title="Edit">
//                           <Link>
//                             <FiEdit
//                               style={{ color: "black", cursor: "pointer" }}
//                               onClick={() => handleOn(items._id)}
//                             />
//                           </Link>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <Link>
//                             <MdDelete
//                               style={{ color: "black", cursor: "pointer" }}
//                               onClick={() => handleDelete(items._id)}
//                             />
//                           </Link>
//                         </Tooltip>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal className="montserrat-400" show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Jewellery Products</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             style={{ width: "100%" }}
//             type="file"
//             multiple
//             name="images"
//             onChange={(e) => setFiles([...e.target.files])}
//             className="mb-3"
//           />
//           <input
//             placeholder="Item Number"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setItemNumber(e.target.value)}
//           />
//           <input
//             placeholder="Products"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setDishes(e.target.value)}
//           />
//           <input
//             placeholder="Description"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <select
//             onChange={(e) => setCategories(e.target.value)}
//             value={categories}
//             className="my-3"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             name=""
//             id=""
//           >
//             <option value="">Select..</option>
//             {getCategories.map((items, index) => (
//               <option key={index} value={items._id}>
//                 {items.categories}
//               </option>
//             ))}
//           </select>
//           <input
//             placeholder="Price"
//             type="number"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             placeholder="Weight"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setWeight(e.target.value)}
//           />
//           <input
//             placeholder="Purity"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setPurity(e.target.value)}
//           />
//           <input
//             placeholder="Details"
//             type="text"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={(e) => setDetails(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={postCategories}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={on} onHide={handleOff} className="montserrat-400">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Products</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             style={{ width: "100%", margin: "10px" }}
//             type="file"
//             multiple
//             onChange={(e) => setEditFiles([...e.target.files])}
//           />
//           <input
//             value={getDishesById.ItemNumber}
//             name="ItemNumber"
//             type="text"
//             placeholder="Item Number"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <input
//             value={getDishesById.dishes}
//             name="dishes"
//             type="text"
//             placeholder="Dishes"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <input
//             value={getDishesById.description}
//             name="description"
//             type="text"
//             placeholder="Description"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <select
//             onChange={(e) => setGetCategoriesById(e.target.value)}
//             value={getCategoriesById}
//             className="my-3"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             name=""
//             id=""
//           >
//             <option value="">Select..</option>
//             {getCategories.map((items, index) => (
//               <option key={index} value={items._id}>
//                 {items.categories}
//               </option>
//             ))}
//           </select>
//           <input
//             value={getDishesById.price}
//             name="price"
//             type="number"
//             placeholder="Price"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <input
//             value={getDishesById.weight}
//             name="weight"
//             type="text"
//             placeholder="Weight"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <input
//             value={getDishesById.purity}
//             name="purity"
//             type="text"
//             placeholder="Purity"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//           <input
//             value={getDishesById.details}
//             name="details"
//             type="text"
//             placeholder="Details"
//             style={{ width: "100%", marginBottom: "1rem" }}
//             onChange={handleUpdateChange}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleOff}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={updateCategories}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
// export default Dishes;
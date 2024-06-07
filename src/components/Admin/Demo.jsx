





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
  const [Itemnumber, setItemnumber] = useState("");
  const [weight, setWeight] = useState("");
  const [purity, setPurity] = useState("");
  const [details, setDetails] = useState("");
  const [maincategory, setMaincategory] = useState('');
  const [categories, setCategories] = useState('');
  const [getMaincategories, setGetMaincategories] = useState([]);
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

  const handleShow =  () => setShow(true);
    
    const fetchMaincategories = async () => {
    try {
        const response = await axios.get(`${backendUrl}/admin/getmaincategories`);
        setGetMaincategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    // Function to fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getcategories`);
        setGetCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    // Fetch main categories and categories on component mount
    useEffect(() => {
      fetchMaincategories();
      fetchCategories();
    }, [backendUrl]); // Fetch data whenever backendUrl changes or component mounts
  

    const postCategories = async () => {
        const formdata = new FormData();
        formdata.append("dishes", dishes);
        formdata.append("description", description);
        formdata.append("categories", categories);
        formdata.append("maincategories", maincategory);
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
        <div className=" main-contenet">
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
            <div className="container table-responsive">
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
                      <th scope="col">Main Category</th>
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
                        <td className="text-black item-text">
                            {getMaincategories.find((mainCat) => mainCat._id === items.maincategories)?.maincategories}
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

                  {/* <tbody>
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
                  </tbody> */}
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
            <input className=' my-3 input-style'
            style={{ width: "100%" }}
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            />
            <input className='input-style'
            placeholder="item-number"
            type="text"
            style={{ width: "100%", marginBottom: '1rem' }}
            onChange={(e) => setItemnumber(e.target.value)}
            />
            <input className='input-style'
            placeholder="products"
            type="text"
            style={{ width: "100%", marginBottom: '1rem' }}
            onChange={(e) => setDishes(e.target.value)}
            />
            <textarea className='input-style'
              placeholder="description"
              type="text"
              style={{ width: "100%", marginBottom: '1rem' }}
              onChange={(e) => setDescription(e.target.value)}>
            </textarea>
           
            

        <select className=' my-3 input-style'
          onChange={(e) => setMaincategory(e.target.value)}
          value={maincategory}
          style={{ width: "100%", marginBottom: '1rem' }}
          name=""
          id=""
        >
          <option value="">Select Main Category</option>
          {getMaincategories.map((mainCat) => (
            <option key={mainCat._id} value={mainCat._id}>
              {mainCat.maincategories}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select className=' my-3 input-style'
          onChange={(e) => setCategories(e.target.value)}
          value={categories}
          style={{ width: "100%", marginBottom: '1rem' }}
          name=""
          id=""
        >
          <option value="">Select Category</option>
          {getCategories.map((items, index) => (
            <option key={index} value={items._id}>
              {items.categories}
            </option>
          ))}
        </select>
            <input className='input-style'
            placeholder="Price"
            type="number"
            style={{ width: "100%", marginBottom: '1rem' }}
            onChange={(e) => setPrice(e.target.value)}
            />
            <input className='input-style'
            placeholder="weight"
            type="text"
            style={{ width: "100%", marginBottom: '1rem' }}
            onChange={(e) => setWeight(e.target.value)}
            />
            <input className='input-style'
            placeholder="purity"
            type="text"
            style={{ width: "100%", marginBottom: '1rem' }}
            onChange={(e) => setPurity(e.target.value)}
            />
            <textarea className='input-style'
              placeholder="details"
              type="text"
              style={{ width: "100%", marginBottom: '1rem' }}
              onChange={(e) => setDetails(e.target.value)}>

            </textarea>
          

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
          <input className='input-style'
            style={{ width: "100%", margin: "10px" }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input className='input-style'
            value={getDishesById.Itemnumber}
            name="Itemnumber"
            type="text"
            placeholder="itemnumber"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />

          <input className='input-style'
            value={getDishesById.dishes}
            name="dishes"
            type="text"
            placeholder="dishes"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />

          <textarea className='input-style'
            value={getDishesById.description}
            name="description"
            type="text"
            placeholder="description"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}>
          </textarea>
           
        



          <select className='my-3 input-style'
            onChange={(e) => setGetCategoriesById(e.target.value)}
            value={getCategoriesById}
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

          <input className='input-style'
            value={getDishesById.price}
            name="price"
            type="number"
            placeholder="price"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <input className='input-style'
            value={getDishesById.weight}
            name="weight"
            type="text"
            placeholder="weight"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <input className='input-style'
            value={getDishesById.purity}
            placeholder="purity"
            name="purity"
            type="text"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}
          />
           <textarea className='input-style'
            value={getDishesById.details}
            name="details"
            type="text"
            placeholder="details"
            style={{ width: "100%",marginBottom:'1rem' }}
            onChange={(e) => handleUpdateChange(e)}>

            </textarea>
         
          
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

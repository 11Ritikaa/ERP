import React, { useState, useEffect } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormLabel, CFormInput, CFormSelect, CRow, CCol, CFormCheck } from "@coreui/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://192.168.1.82/api";
const PRODUCTS = "/products";
const CATEGORY_API = "/category";
const SUBCATEGORY_API = "/category/sub-category";

const ProductEditForm = ({ show, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]); 
  const [tags, setTags] = useState([]); 

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${CATEGORY_API}`);
        if (response.data.status === "success") {
          setCategories(response.data.result); // Assuming response has `result` with categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const fetchSubCategories = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}${SUBCATEGORY_API}/${formData.category}`);
          if (response.data.status === "success") {
            setSubCategories(response.data.result); // Assuming response has `result` with subcategories
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Failed to load subcategories");
        } finally {
          setLoading(false);
        }
      };

      fetchSubCategories();
    }
  }, [formData.category]);

  // Fetch status options (you can replace this with actual data from your API if needed)
  useEffect(() => {
    // Example status options, replace with your actual data
    setStatusOptions([
      { value: "ACTIVE", label: "Active" },
      { value: "DEACTIVE", label: "Deactive" },
      { value: "DRAFT", label: "Draft" },
      { value: "PROTOTYPE", label: "Prototype" },
    ]);
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.title,
        description: product.description,
        material: product.material,
        materialType: product.material_type,
        price: product.base_price,
        hsn: product.hsn,
        gstSlab: product.gst_percentage,
        variationName: product.variation_name,
        type: product.type,
        paletteApplication: product.pallete_applicable,
        finish: product.has_finish,
        length: product.l,
        width: product.b,
        height: product.h,
        dimensionUnit: product.dimension_unit,
        weight: product.weight,
        weightUnit: product.weight_unit,
        cost: product.cost,
        stock: product.stock,
        setOf: product.set_of,
        status: product.status,
      });
      setTags(product.tags || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gstSlab" ? parseFloat(value) : value, // Convert gstSlab to a number
    }));
  };  

  const handleTagChange = (e) => {
    const { value } = e.target;
    setTags(value.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData, tags }; 
      const response = await axios.put(`${BASE_URL}${PRODUCTS}/${product.id}`, dataToSubmit);
      if (response.data && response.data.status === "success") {
        onSave(response.data.result); // Pass the updated product data
        handleClose(); // Close the modal
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
    <ToastContainer />
    <CModal visible={show} onClose={handleClose} size="lg">
      <CModalHeader onClose={handleClose}>
        <h5>Edit Product</h5>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                label="Product Name"
                type="text"
                name="productName"
                value={formData.productName || ""}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CFormInput
                label="Description"
                type="textarea"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                label="Material"
                name="material"
                value={formData.material || ""}
                onChange={handleChange}
                required
              >
                <option value="wood">Wood</option>
                <option value="metal">Metal</option>
                <option value="brass">Brass</option>
                <option value="copper">Copper</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={3}>
              <CFormInput
                label="Cost"
                type="number"
                name="cost"
                value={formData.cost || ""}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={3}>
              <CFormInput
                label="Price"
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          {/* Add HSN and GST Slab in one row */}
          <CRow>
            <CCol sm={6}>
              <CFormInput
                label="HSN"
                type="text"
                name="hsn"
                value={formData.hsn || ""}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={6}>
            <CFormSelect
              label="GST Slab"
              name="gstSlab"
              value={formData.gstSlab || 5}
              onChange={handleChange}
              required
            >
              <option value={5}>5%</option>
              <option value={12}>12%</option>
              <option value={18}>18%</option>
            </CFormSelect>
            </CCol>
          </CRow>

          {/* Add Variation Name in one row */}
          <CRow>
            <CCol sm={12}>
              <CFormInput
                label="Variation Name"
                type="text"
                name="variationName"
                value={formData.variationName || ""}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          {/* Add Type, Palette Applicable and Finish in one row */}
          <CRow>
          <CCol sm={4}>
            <CFormLabel>Type</CFormLabel>
            <CFormCheck
                label="Normal"
                name="type"
                value="normal"
                checked={formData.type === "normal"}
                onChange={handleChange}
                required
            />
            <CFormCheck
                label="Antique"
                name="type"
                value="antique"
                checked={formData.type === "antique"}
                onChange={handleChange}
            />
            </CCol>
            <CCol sm={4}>
              <CFormLabel>Palette Applicable</CFormLabel>
              <CFormCheck
                name="paletteApplication"
                value="paletteApplication"
                checked={formData.paletteApplication}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={4}>
              <CFormLabel>Finish</CFormLabel>
              <CFormCheck
                name="finish"
                value="finish"
                checked={formData.finish}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={6}>
              <CFormSelect
                label="Category"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                label="Sub Category"
                name="subCategory"
                value={formData.subCategory || ""}
                onChange={handleChange}
                required
                disabled={loading} // Disable while loading subcategories
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={4}>
              <CFormInput
                label="Length"
                type="number"
                name="length"
                value={formData.length || ""}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={4}>
              <CFormInput
                label="Breadth"
                type="number"
                name="width"
                value={formData.width || ""}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol sm={4}>
              <CFormInput
                label="Height"
                type="number"
                name="height"
                value={formData.height || ""}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          {/* Move Dimension Unit to Length, Breadth, Height row */}
          <CRow>
            <CCol sm={4}>
              <CFormSelect
                label="Dimension Unit"
                name="dimensionUnit"
                value={formData.dimensionUnit || ""}
                onChange={handleChange}
                required
              >
                <option value="in">Inches</option>
                <option value="cm">Centimeters</option>
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Tags Input */}
          <CRow>
            <CCol sm={12}>
              <CFormInput
                label="Tags (comma separated)"
                type="text"
                name="tags"
                value={tags ? tags.join(", ") : ""} // Display tags as a comma-separated string
                onChange={handleTagChange}
                placeholder="Enter tags"
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={6}>
              <CFormSelect
                label="Status"
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSubmit}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  );
};

export default ProductEditForm;

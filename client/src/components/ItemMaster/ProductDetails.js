import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductEditForm from "./ProductEditForm";
import { Container, Row, Col, Image, Button, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VariantEditForm from './VariantEditForm';
import { CModal, CModalHeader,
  CModalTitle,
  CModalBody, } from "@coreui/react";

const BASE_URL = "http://192.168.1.82/api";
const PRODUCTS = "/products";
const VARIANTS = "/variants";

const ProductDetails = () => {
  const { id } = useParams(); // Dynamic route param
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null); // To hold the selected variant
  
  const handleEditVariant = (variant) => {
    setSelectedVariant(variant); // Set the variant to be edited
    setShowEditForm(true); // Open the form
  };

  const handleCloseForm = () => {
    setShowEditForm(false); // Close the form
    setSelectedVariant(null); // Clear the selected variant
  };

  const handleSaveVariant = (variantData) => {
    console.log('Variant saved:', variantData)
    // Optionally, you could update the product list or show a success message
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${PRODUCTS}/${id}`);
        setProduct(response.data.result);
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

   // PUT request handler for saving variant changes
  //  const handleSaveVariant = async (variantData) => {
  //   try {
  //     await axios.put(`${BASE_URL}${VARIANTS}/${variantId}`, variantData);
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product.id === variantData.productId
  //           ? {
  //               ...product,
  //               variants: product.variants.map((variant) =>
  //                 variant.id === variantData.id ? variantData : variant
  //               ),
  //             }
  //           : product
  //       )
  //     );
  //     setModalVisible(false);
  //   } catch (error) {
  //     console.error('Error saving variant:', error);
  //   }
  // };

  const handleDeleteVariant = async (variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      try {
        await axios.delete(`${BASE_URL}${VARIANTS}/${variantId}`);
        // Remove the deleted variant from the state
        setProduct((prevProduct) => ({
          ...prevProduct,
          variants: prevProduct.variants.filter(
            (variant) => variant.id !== variantId
          ),
        }));
        toast.success("Variant deleted successfully");
      } catch (err) {
        console.error("Error deleting variant:", err);
        toast.error("Failed to delete variant. Please try again.");
      }
    }
  };

  const handleSaveProduct = (updatedProduct) => {
    setProduct(updatedProduct);
    toast.success("Product updated successfully");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
    <ToastContainer />
    <Container fluid className="">
      <Row className="align-items-center" style={{padding: "0"}}>
        {/* Product Image */}
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src={product.images?.[0] || "https://via.placeholder.com/500x500"}
            alt={product.title}
            fluid
            className="rounded "
          />
          {/* Small Images and Video Box */}
          <Row className="mt-3">
            <Col xs={2} >
              <Image
                src={product.images?.[1] || "https://via.placeholder.com/100x100"}
                alt="Small Image 1"
                fluid
                className="rounded"
              />
            </Col>
            <Col xs={2}>
              <Image
                src={product.images?.[2] || "https://via.placeholder.com/100x100"}
                alt="Small Image 2"
                fluid
                className="rounded"
              />
            </Col>
            <Col xs={2}>
              <Image
                src={product.images?.[3] || "https://via.placeholder.com/100x100"}
                alt="Small Image 3"
                fluid
                className="rounded"
              />
            </Col>
            <Col xs={2}>
              <Image
                src={product.images?.[3] || "https://via.placeholder.com/100x100"}
                alt="Small Image 3"
                fluid
                className="rounded"
              />
            </Col>
            <Col xs={2}>
              <Image
                src={product.images?.[3] || "https://via.placeholder.com/100x100"}
                alt="Small Image 3"
                fluid
                className="rounded"
              />
            </Col>
            {/* <Col xs={2}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#ccc",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Video Box</span>
              </div>
            </Col> */}
          </Row>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          {/* Product Name and Edit Button */}
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h1 className="fw-bold mb-3" style={{ color: "#2c3e50", fontSize: "2.5rem" }}>
                {product.title}
              </h1>
            </Col>
            <Col className="text-end">
              <Button
                variant="success"
                size="sm"
                className="ms-3"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "8px 20px",
                  borderRadius: "5px",
                }}
                onClick={handleEditClick}
              >
               <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Col>
          </Row>

          {/* Product Information */}
          <div className="mt-4">
            <p style={{ fontSize: "1.1rem", color: "#34495e", lineHeight: "1.7" }}>
              <strong style={{ color: "#16a085" }}>Base Price: </strong>
              <span>${product.base_price}</span>
            </p>
            <p style={{ fontSize: "1.1rem", color: "#34495e", lineHeight: "1.7" }}>
              <strong style={{ color: "#16a085" }}>Category: </strong>
              {product.category_name} / {product.sub_category}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#34495e", lineHeight: "1.7" }}>
              <strong style={{ color: "#16a085" }}>Dimensions: </strong>
              {product.l} x {product.b} x {product.h} {product.dimension_unit}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#34495e", lineHeight: "1.7" }}>
              <strong style={{ color: "#16a085" }}>Material: </strong>
              {product.material}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#34495e", lineHeight: "1.7" }}>
              <strong style={{ color: "#16a085" }}>Weight: </strong>
              {product.weight} {product.weight_unit}
            </p>
          </div>

          {/* CTA Buttons */}
          {/* <div className="d-flex gap-3">
            <Button variant="primary" className="px-4 py-2" style={{ fontSize: "1.2rem" }}>
              Add to Cart
            </Button>
            <Button variant="outline-secondary" className="px-4 py-2" style={{ fontSize: "1.2rem" }}>
              Buy Now
            </Button>
          </div> */}
        </Col>
      </Row>

      {/* Tabs Section */}
      <Row className="mt-5">
        <Col>
          <div>
          <Tabs
            defaultActiveKey="description"
            id="product-tabs"
            className="mb-3"
            fill
          >
            {/* Description Tab */}
            <Tab eventKey="description" title="Description">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h3 className="font-semibold text-xl mb-2">Product Description</h3>
                <p>{product.description}</p>
              </div>
            </Tab>

            {/* Variants Tab */}
          
              <Tab eventKey="variants" title="Variants">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h3 className="font-semibold text-xl mb-4">Product Variants</h3>
                {product.variants && product.variants.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Variant Name</th>
                          <th className="px-4 py-2 text-left">Dimensions</th>
                          <th className="px-4 py-2 text-left">Weight</th>
                          <th className="px-4 py-2 text-left">Cost</th>
                          <th className="px-4 py-2 text-left">Stock</th>
                          <th className="px-4 py-2 text-left">SKU</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.variants.map((variant) => (
                          <tr key={variant.id} className="border-b">
                            <td className="px-4 py-2">{variant.variant_name}</td>
                            <td className="px-4 py-2">
                              {variant.l} x {variant.b} x {variant.h} {variant.dimension_unit}
                            </td>
                            <td className="px-4 py-2">
                              {variant.weight} {variant.weight_unit}
                            </td>
                            <td className="px-4 py-2">${variant.cost}</td>
                            <td className="px-4 py-2">{variant.stock}</td>
                            <td className="px-4 py-2">{variant.sku}</td>
                            <td className="px-4 py-2">{variant.status}</td>
                            <td className="px-4 py-2 d-flex gap-2">
                            <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditVariant(variant)} // Open the edit form
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteVariant(variant.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">No variants available for this product.</p>
                )}
              </div>
            </Tab>
           
           

            {/* Additional Information Tab */}
            <Tab eventKey="additional" title="Additional Information">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h3 className="font-semibold text-xl mb-4">Additional Information</h3>
                <p><strong>HSN:</strong> {product.hsn}</p>
                <p><strong>Tags:</strong> {product.tags?.join(", ") || "No tags"}</p>
                <p><strong>Set of:</strong> {product.set_of}</p>
                <p><strong>Material Type:</strong> {product.material_type}</p>
                <p><strong>Status:</strong> {product.status}</p>
                <p><strong>Finish Available:</strong> {product.has_finish ? "Yes" : "No"}</p>
                <p><strong>Palette Applicable:</strong> {product.pallete_applicable ? "Yes" : "No"}</p>
              </div>
            </Tab>
          </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
    
    {/* Modal for adding variant */}
    <CModal visible={modalVisible} onClose={handleCloseForm} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Edit Variant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedVariant && (
            <VariantEditForm
              product={selectedVariant}
              onClose={handleCloseForm}
              onSave={handleSaveVariant}
            />
          )}
        </CModalBody>
      </CModal>
    </>
  );
};

export default ProductDetails;




import placeholderImage from '/src/assets/brand/test.jpeg'
import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faTable, faTh } from '@fortawesome/free-solid-svg-icons'
import VariantForm from './VariantForm'
import {Link}  from 'react-router-dom'

const BASE_URL = 'http://192.168.1.82/api'
const PRODUCTS = '/products'

const Products = () => {
  const [products, setProducts] = useState([])
  // const [hoveredProductId, setHoveredProductId] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
  const [modalVisible, setModalVisible] = useState(false) // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null) // Product selected for variant addition

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...')
        const response = await axios.get(`${BASE_URL}${PRODUCTS}/list`)
        console.log('Products fetched:', response.data.result)
        setProducts(response.data.result) // Assuming the response data contains the list of products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const deleteProduct = async (productId) => {
    try {
      console.log(`Deleting product with ID: ${productId}`)
      await axios.delete(`${BASE_URL}${PRODUCTS}/${productId}`)
      setProducts(products.filter((product) => product.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleVariantClick = (product) => {
    setSelectedProduct(product)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedProduct(null)
  }

  const handleSaveVariant = (variantData) => {
    console.log('Variant saved:', variantData)
    // Optionally, you could update the product list or show a success message
    setModalVisible(false)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Products
          <CButton
            className="float-end"
            color="info"
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
          >
            <FontAwesomeIcon icon={viewMode === 'grid' ? faTable : faTh} />{' '}
            {viewMode === 'grid' ? 'Table View' : 'Grid View'}
          </CButton>
        </CCardHeader>
        <CCardBody>
          {viewMode === 'grid' ? (
            <CRow>
              {products.length > 0 ? (
                products.map((product) => (
                  <CCol sm="6" md="4" lg="3" key={product.id}>
                    <CCard
                      className="position-relative mb-4"
                      style={{ height: '350px', width: '100%', cursor: 'pointer' }}
                    >
                         <Link to={`item-master/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <CCardHeader>{product.name}</CCardHeader>
                      <CCardBody>
                        <div
                          className="w-100 mb-3 bg-light d-flex align-items-center justify-content-center overflow-hidden"
                          style={{ height: '160px', width: '100%' }}
                        >
                          <img
                            src={product.thumbnail || placeholderImage}
                            alt={product.name}
                            className="w-150 h-200 object-fit-cover"
                          />
                        </div>
                        <p>
                          <strong>{product.title}</strong>
                        </p>
                        <p>Price: ${product.base_price}</p>
                      </CCardBody>
                          </Link>
                      {/* Buttons always visible in bottom-right corner */}
                      <div
                        className="position-absolute bottom-0 end-0 p-2"
                        style={{
                          zIndex: 1,
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          margin: '8px',
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent card click when interacting with buttons
                      >
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            deleteProduct(product.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                        <CButton
                          color="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            handleVariantClick(product);
                          }}
                        >
                          Add Variant
                        </CButton>
                      </div>
                    </CCard>
                  </CCol>

                ))
              ) : (
                <p>Loading products...</p>
              )}
            </CRow>
          ) : (
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Thumbnail</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <CTableRow key={product.id}>
                      {/* <Link to={`/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                      <CTableDataCell>
                        <img
                          src={product.thumbnail || placeholderImage}
                          alt={product.name}
                          style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                       
                      </CTableDataCell>
                      <CTableDataCell>{product.title}</CTableDataCell>
                      <CTableDataCell>${product.base_price}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteProduct(product.id)}}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                        <CButton
                          color="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVariantClick(product)}} 
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </CButton>
                      </CTableDataCell>
                      {/* </Link> */}
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="5">Loading products...</CTableDataCell>
                  </CTableRow>
                )}
              
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Modal for adding variant */}
      <CModal visible={modalVisible} onClose={handleModalClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Add Variant for {selectedProduct ? selectedProduct.title : ''}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedProduct && (
            <VariantForm
              product={selectedProduct}
              onClose={handleModalClose}
              onSave={handleSaveVariant}
            />
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

export default Products

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
} from '@coreui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faTable, faTh } from '@fortawesome/free-solid-svg-icons'

const BASE_URL = 'http://localhost:1337/api'
const PRODUCTS = '/products'

const Flags = () => {
  const [products, setProducts] = useState([])
  const [hoveredProductId, setHoveredProductId] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${PRODUCTS}/list`)
        setProducts(response.data.result) // Assuming the response data contains the list of products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}${PRODUCTS}/${productId}`)
      setProducts(products.filter((product) => product.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleVariantClick = (product) => {
    console.log(`Add variant clicked for: ${product.name}`)
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
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="position-relative"
                    >
                      <CCardHeader>{product.name}</CCardHeader>
                      <CCardBody>
                        <div
                          className="w-100 mb-3 bg-light d-flex align-items-center justify-content-center overflow-hidden"
                          style={{ height: '160px' }}
                        >
                          <img
                            src={product.thumbnail || placeholderImage}
                            alt={product.name}
                            className={`w-150 h-200 object-fit-cover ${
                              hoveredProductId === product.id ? 'blur' : ''
                            }`}
                          />
                        </div>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                      </CCardBody>
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
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <CTableRow key={product.id}>
                      <CTableDataCell>
                        <img
                          src={product.thumbnail || placeholderImage}
                          alt={product.name}
                          style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      <CTableDataCell>{product.description}</CTableDataCell>
                      <CTableDataCell>${product.price}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                        <CButton
                          color="primary"
                          size="sm"
                          onClick={() => handleVariantClick(product)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </CButton>
                      </CTableDataCell>
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
    </>
  )
}

export default Flags

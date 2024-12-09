import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CForm,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CFormSelect,
  CButton,
  CCol,
  CRow,
  CFormLabel,
} from '@coreui/react'

const BASE_URL = 'http://localhost:1337/api'
const PRODUCTS = '/products'

const CoreUIIcons = () => {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    description: '',
    cost: '',
    price: '',
    stock: '',
    length: '',
    width: '',
    height: '',
    dimensionUnit: '',
    weight: '',
    weightUnit: '',
    material: '',
    materialType: '',
    etsystore1price: '',
    etsystore2price: '',
    shopifystore1price: '',
    shopifystore2price: '',
    hsn: '',
    status: '',
    category: '',
    subCategory: '',
    etsyshopifycategory: '',
    type: 'normal',
    palleteApplicable: false,
    finish: false,
    tags: [],
  })

  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const requiredFields = [
    'productName',
    'sku',
    'description',
    'cost',
    'price',
    'stock',
    'length',
    'width',
    'height',
    'dimensionUnit',
    'weight',
    'weightUnit',
    'material',
    'materialType',
    'hsn',
    'setOf',
    'status',
    'category',
    'subCategory',
    'etsyshopifycategory',
    'type',
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    // Fetch subcategories if category changes
    if (name === 'category') {
      fetchSubCategories(value)
    }
  }

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map((tag) => tag.trim())
    setFormData({
      ...formData,
      tags: tagsArray,
    })
  }

  const validateForm = () => {
    const newErrors = {}
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const renderLabel = (labelText, fieldName) => (
    <>
      {labelText}
      {requiredFields.includes(fieldName) && (
        <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
      )}
    </>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post(`${BASE_URL}${PRODUCTS}/create-product`, formData)
        if (response.status === 201) {
          toast.success('Product added successfully!')
          setFormData({
            productName: '',
            sku: '',
            description: '',
            cost: '',
            price: '',
            stock: '',
            length: '',
            width: '',
            height: '',
            dimensionUnit: '',
            weight: '',
            weightUnit: '',
            material: '',
            materialType: '',
            etsystore1price: '',
            etsystore2price: '',
            shopifystore1price: '',
            shopifystore2price: '',
            hsn: '',
            status: '',
            category: '',
            setOf: '',
            subCategory: '',
            etsyshopifycategory: '',
            type: 'normal',
            palleteApplicable: false,
            finish: false,
            tags: [],
          })
        } else {
          toast.error('Failed to add product.')
        }
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while adding the product.')
      }
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category`)
      setCategories(response.data.result)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchSubCategories = async (categoryId) => {
    try {
      if (categoryId) {
        const response = await axios.get(`${BASE_URL}/category/sub-category/${categoryId}`)
        setSubCategories(response.data.result)
      } else {
        setSubCategories([])
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <ToastContainer />
      <CForm className="row g-3" onSubmit={handleSubmit}>
        {/* Product Name and SKU */}
        <CCol md={6}>
          <CFormLabel>{renderLabel('Product Name', 'productName')}</CFormLabel>
          <CFormInput
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className={errors.productName ? 'is-invalid' : ''}
          />
          {errors.productName && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.productName}</div>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel>{renderLabel('SKU', 'sku')}</CFormLabel>
          <CFormInput
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className={errors.sku ? 'is-invalid' : ''}
          />
          {errors.sku && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.sku}</div>}
        </CCol>

        {/* Description */}
        <CCol xs={12}>
          <CFormLabel>{renderLabel('Description', 'description')}</CFormLabel>
          <CFormTextarea
            id="description"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'is-invalid' : ''}
          />
          {errors.description && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.description}</div>
          )}
        </CCol>

        {/* Cost, Price, Set Of, Stock */}
        <CCol md={3}>
          <CFormLabel>{renderLabel('Cost', 'cost')}</CFormLabel>
          <CFormInput
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className={errors.cost ? 'is-invalid' : ''}
          />
          {errors.cost && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.cost}</div>}
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Price ($)', 'price')}</CFormLabel>
          <CFormInput
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'is-invalid' : ''}
          />
          {errors.price && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.price}</div>}
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Set Of', 'setOf')}</CFormLabel>
          <CFormInput
            type="number"
            id="setOf"
            name="setOf"
            value={formData.setOf}
            onChange={handleChange}
          />
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Stock', 'stock')}</CFormLabel>
          <CFormInput
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={errors.stock ? 'is-invalid' : ''}
          />
          {errors.stock && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.stock}</div>}
        </CCol>

        {/* Dimensions and Weight */}
        <CCol md={2}>
          <CFormLabel>{renderLabel('Length (L)', 'length')}</CFormLabel>
          <CFormInput
            type="number"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className={errors.length ? 'is-invalid' : ''}
          />
          {errors.length && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.length}</div>
          )}
        </CCol>
        <CCol md={2}>
          <CFormLabel>{renderLabel('Breadth (B)', 'width')}</CFormLabel>
          <CFormInput
            type="number"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className={errors.width ? 'is-invalid' : ''}
          />
          {errors.width && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.width}</div>}
        </CCol>
        <CCol md={2}>
          <CFormLabel>{renderLabel('Height (H)', 'height')}</CFormLabel>
          <CFormInput
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={errors.height ? 'is-invalid' : ''}
          />
          {errors.height && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.height}</div>
          )}
        </CCol>
        <CCol md={2}>
          <CFormLabel>{renderLabel('Unit', 'dimensionUnit')}</CFormLabel>
          <CFormSelect
            id="dimensionUnit"
            name="dimensionUnit"
            value={formData.dimensionUnit}
            onChange={handleChange}
            className={errors.dimensionUnit ? 'is-invalid' : ''}
          >
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="in">in</option>
          </CFormSelect>
          {errors.dimensionUnit && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.dimensionUnit}</div>
          )}
        </CCol>
        <CCol md={2}>
          <CFormLabel>{renderLabel('Weight', 'weight')}</CFormLabel>
          <CFormInput
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={errors.weight ? 'is-invalid' : ''}
          />
          {errors.weight && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.weight}</div>
          )}
        </CCol>
        <CCol md={2}>
          <CFormLabel>{renderLabel('Unit', 'weightUnit')}</CFormLabel>
          <CFormSelect
            id="weightUnit"
            name="weightUnit"
            value={formData.weightUnit}
            onChange={handleChange}
            className={errors.weightUnit ? 'is-invalid' : ''}
          >
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="lbs">lbs</option>
          </CFormSelect>
          {errors.weightUnit && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.weightUnit}</div>
          )}
        </CCol>

        {/* Material and Material Type */}
        <CCol md={6}>
          <CFormLabel>{renderLabel('Material', 'material')}</CFormLabel>
          <CFormSelect
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className={errors.material ? 'is-invalid' : ''}
          >
            <option>Metal</option>
            <option>Brass</option>
            <option>Wood</option>
            <option>Plastic</option>
          </CFormSelect>
          {errors.material && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.material}</div>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel>{renderLabel('Material Type', 'materialType')}</CFormLabel>
          <CFormInput
            type="text"
            id="materialType"
            name="materialType"
            value={formData.materialType}
            onChange={handleChange}
            className={errors.materialType ? 'is-invalid' : ''}
          />
          {errors.materialType && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.materialType}</div>
          )}
        </CCol>

        <CRow>
          <CCol md={3}>
            <CFormLabel>{renderLabel('Category', 'category')}</CFormLabel>
            <CFormSelect
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'is-invalid' : ''}
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </CFormSelect>
            {errors.category && (
              <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.category}</div>
            )}
          </CCol>

          <CCol md={3}>
            <CFormLabel>{renderLabel('Subcategory', 'subCategory')}</CFormLabel>
            <CFormSelect
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className={errors.subcategory ? 'is-invalid' : ''}
              disabled={!formData.category}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </CFormSelect>
            {errors.subcategory && (
              <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.subcategory}</div>
            )}
          </CCol>

          <CCol md={3}>
            <CFormLabel>
              {renderLabel('Shopify and Etsy Category', 'etsyshopifycategory')}
            </CFormLabel>
            <CFormSelect
              id="etsyshopifycategory"
              name="etsyshopifycategory"
              value={formData.etsyshopifycategory}
              onChange={handleChange}
              className={errors.etsyshopifycategory ? 'is-invalid' : ''}
            >
              <option>Shopify Cat 1</option>
              <option>Shopify Cat 2</option>
              <option>Shopify Cat 3</option>
            </CFormSelect>
            {errors.shopifyCategory && (
              <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.shopifyCategory}</div>
            )}
          </CCol>
        </CRow>

        {/* Store Prices */}
        <CCol md={3}>
          <CFormLabel>{renderLabel('Etsy Store 1 Price')}</CFormLabel>
          <CFormInput
            type="number"
            id="etsystore1price"
            name="etsystore1price"
            value={formData.etsystore1price}
            onChange={handleChange}
            className={errors.etsystore1price ? 'is-invalid' : ''}
          />
          {/* {errors.etsystore1price && (
          <div style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.etsystore1price}
          </div>
        )} */}
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Etsy Store 2 Price')}</CFormLabel>
          <CFormInput
            type="number"
            id="etsystore2price"
            name="etsystore2price"
            value={formData.etsystore2price}
            onChange={handleChange}
            className={errors.etsystore2price ? 'is-invalid' : ''}
          />
          {/* {errors.etsystore2price && (
          <div style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.etsystore2price}
          </div>
        )} */}
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Shopify Store 1 Price')}</CFormLabel>
          <CFormInput
            type="number"
            id="shopifystore1price"
            name="shopifystore1price"
            value={formData.shopifystore1price}
            onChange={handleChange}
            className={errors.shopifystore1price ? 'is-invalid' : ''}
          />
          {/* {errors.shopifystore1price && (
          <div style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.shopifystore1price}
          </div>
        )} */}
        </CCol>
        <CCol md={3}>
          <CFormLabel>{renderLabel('Shopify Store 2 Price')}</CFormLabel>
          <CFormInput
            type="number"
            id="shopifystore2price"
            name="shopifystore2price"
            value={formData.shopifystore2price}
            onChange={handleChange}
            className={errors.shopifystore2price ? 'is-invalid' : ''}
          />
          {/* {errors.shopifystore2price && (
          <div style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.shopifystore2price}
          </div>
        )} */}
        </CCol>

        {/* HSN and Status */}
        <CCol md={6}>
          <CFormLabel>{renderLabel('HSN', 'hsn')}</CFormLabel>
          <CFormInput
            type="number"
            id="hsn"
            name="hsn"
            value={formData.hsn}
            onChange={handleChange}
            className={errors.hsn ? 'is-invalid' : ''}
          />
          {errors.hsn && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.hsn}</div>}
        </CCol>
        <CCol md={6}>
          <CFormLabel>{renderLabel('Status', 'status')}</CFormLabel>
          <CFormSelect
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={errors.status ? 'is-invalid' : ''}
          >
            <option>Active</option>
            <option>Prototype</option>
            <option>Draft</option>
            <option>Deactive</option>
          </CFormSelect>
          {errors.status && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.status}</div>
          )}
        </CCol>

        {/* Type, Pallete, and Finish */}
        <CCol xs={12} className="d-flex align-items-center">
          {/* Type */}
          <div className="me-5 d-flex align-items-center">
            <CFormLabel className="me-3 mb-0">Type</CFormLabel>
            <CFormCheck
              type="radio"
              name="type"
              id="normal"
              value="Normal"
              label="Normal"
              checked={formData.type === 'Normal'}
              onChange={handleChange}
              className="me-3"
            />
            <CFormCheck
              type="radio"
              name="type"
              id="antique"
              value="Antique"
              label="Antique"
              checked={formData.type === 'Antique'}
              onChange={handleChange}
            />
          </div>

          {/* Pallete Applicable */}
          <div className="me-5 d-flex align-items-center">
            <CFormCheck
              type="checkbox"
              name="palleteApplicable"
              id="palleteApplicable"
              checked={formData.palleteApplicable}
              onChange={handleChange}
              className="me-3"
              label="Pallete Applicable"
            />
          </div>

          {/* Finish */}
          <div className="d-flex align-items-center">
            <CFormCheck
              type="checkbox"
              name="finish"
              id="finish"
              checked={formData.finish}
              onChange={handleChange}
              className="me-3"
              label="Finish"
            />
          </div>
        </CCol>

        {/* Tags Field */}
        <CCol xs={12}>
          <CFormLabel>Tags (comma-separated)</CFormLabel>
          <CFormInput
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
          />
          <small className="text-muted">Enter tags separated by commas (e.g., tag1, tag2).</small>
        </CCol>

        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default CoreUIIcons

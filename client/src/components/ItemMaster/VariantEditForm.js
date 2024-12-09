/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CForm, CFormInput, CFormLabel, CFormSelect, CRow, CCol, CButton } from '@coreui/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { z } from 'zod'

// Zod schema for validation
const variantSchema = z.object({
  variationnName: z.string().min(1, 'Variant Name is required'),
  variantLength: z.coerce.number().positive('Length must be a positive number'),
  variantBreadth: z.coerce.number().positive('Breadth must be a positive number'),
  variantHeight: z.coerce.number().positive('Height must be a positive number'),
  variantDimensionUnit: z.enum(['cm', 'in']),
  variantWeight: z.coerce.number().positive('Weight must be a positive number'),
  variantWeightUnit: z.enum(['kg', 'gram', 'lbs']),
  variantCost: z.coerce.number().positive('Cost must be a positive number'),
  variantPrice: z.coerce.number().positive('Price must be a positive number'),
  variantStatus: z.enum(['ACTIVE', 'DEACTIVE', 'DRAFT', 'PROTOTYPE']),
  variantSetOf: z.coerce.number().positive('Set Of must be a positive number'),
  variantStock: z.coerce.number().min(0, 'Stock must be zero or greater'),
})

const BASE_URL = 'http://192.168.1.82/api'
const VARIANTS = '/variants'

const VariantEditForm = ({ product,onClose, onSave }) => {
  const [variantData, setVariantData] = useState({
    variationnName: '',
    variantLength: '',
    variantBreadth: '',
    variantHeight: '',
    variantDimensionUnit: 'cm',
    variantWeight: '',
    variantWeightUnit: 'kg',
    variantCost: '',
    variantPrice: '',
    variantStatus: 'ACTIVE',
    variantSetOf: '',
    variantStock: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVariantData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validate the data
      variantSchema.parse(variantData)

      // Call the API
      const response = await axios.put(
        `${BASE_URL}${VARIANTS}/${product.id}`, 
        variantData
      )
      
      // Show success notification
      toast.success('Variant saved successfully!')

      // Trigger onSave and onClose
      onSave(response.data)
      onClose()
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show validation errors
        toast.error(
          error.errors.map((err) => `${err.path.join(' > ')}: ${err.message}`).join('\n')
        )
      } else if (axios.isAxiosError(error)) {
        // Show API error
        toast.error(error.response?.data?.message || 'Failed to save variant')
      } else {
        // Show unexpected error
        toast.error('An unexpected error occurred')
        console.error('Unexpected error:', error)
      }
    }
  }

  return (
    <CForm onSubmit={handleSubmit}>
      {/* Variant Name Row */}
      <CRow className="mb-3">
        <CCol md="12">
          <CFormLabel>Variant Name</CFormLabel>
          <CFormInput
            type="text"
            name="variationnName"
            value={variantData.variationnName}
            onChange={handleInputChange}
            placeholder="Enter variant name"
            required
          />
        </CCol>
      </CRow>

      {/* Dimensions (L, B, H) and Unit Row */}
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel>Length</CFormLabel>
          <CFormInput
            type="number"
            name="variantLength"
            value={variantData.variantLength}
            onChange={handleInputChange}
            placeholder="Length"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Breadth</CFormLabel>
          <CFormInput
            type="number"
            name="variantBreadth"
            value={variantData.variantBreadth}
            onChange={handleInputChange}
            placeholder="Breadth"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Height</CFormLabel>
          <CFormInput
            type="number"
            name="variantHeight"
            value={variantData.variantHeight}
            onChange={handleInputChange}
            placeholder="Height"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Length Unit</CFormLabel>
          <CFormSelect
            name="variantDimensionUnit"
            value={variantData.variantDimensionUnit}
            onChange={handleInputChange}
          >
            <option value="cm">Centimeters</option>
            <option value="in">Inches</option>
          </CFormSelect>
        </CCol>
      </CRow>

      {/* Weight, Weight Unit, and Stock Quantity */}
      <CRow className="mb-3">
        <CCol md="4">
          <CFormLabel>Weight</CFormLabel>
          <CFormInput
            type="number"
            name="variantWeight"
            value={variantData.variantWeight}
            onChange={handleInputChange}
            placeholder="Enter weight"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="4">
          <CFormLabel>Weight Unit</CFormLabel>
          <CFormSelect
            name="variantWeightUnit"
            value={variantData.variantWeightUnit}
            onChange={handleInputChange}
          >
            <option value="kg">Kg</option>
            <option value="gram">Gram</option>
            <option value="lbs">Lbs</option>
          </CFormSelect>
        </CCol>
        <CCol md="4">
          <CFormLabel>Stock Quantity</CFormLabel>
          <CFormInput
            type="number"
            name="variantStock"
            value={variantData.variantStock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            min="0"
            required
          />
        </CCol>
      </CRow>

      {/* Cost, Price, Status, Set of Row */}
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel>Cost()</CFormLabel>
          <CFormInput
            type="number"
            name="variantCost"
            value={variantData.variantCost}
            onChange={handleInputChange}
            placeholder="Enter cost"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Price($)</CFormLabel>
          <CFormInput
            type="number"
            name="variantPrice"
            value={variantData.variantPrice}
            onChange={handleInputChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </CCol>
        <CCol md="3">
          <CFormLabel>Status</CFormLabel>
          <CFormSelect
            name="variantStatus"
            value={variantData.variantStatus}
            onChange={handleInputChange}
          >
            <option value="ACTIVE">Active</option>
            <option value="DEACTIVE">Deactive</option>
            <option value="DRAFT">Draft</option>
            <option value="PROTOTYPE">Prototype</option>
          </CFormSelect>
        </CCol>
        <CCol md="3">
          <CFormLabel>Set of</CFormLabel>
          <CFormInput
            type="number"
            name="variantSetOf"
            value={variantData.variantSetOf}
            onChange={handleInputChange}
            placeholder="Enter set of"
            min="1"
          />
        </CCol>
      </CRow>

      {/* Action Buttons */}
      <CRow>
        <CCol>
          <CButton color="primary" type="submit" className="me-2">
            Save Variant
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

VariantEditForm.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default VariantEditForm
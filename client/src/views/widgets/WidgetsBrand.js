import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibTwitter, cilCalendar, cilSchool } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBox,
  faShoppingCart,
  faCog,
  faCheckCircle,
  faGem,
  faGift,
  faTruck,
  faWarehouse,
  faPlusSquare,
  faUser,
  faShieldAlt,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons'

const WidgetsBrand = (props) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [65, 59, 84, 84, 51, 55, 40],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faBox} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Item Master', value: 'Item Master' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4285f4',
          }}
        /> 
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [1, 13, 9, 17, 34, 41, 38],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faShoppingCart} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Order Management', value: 'Order Management' },
           
          ]}
          style={{
            '--cui-card-cap-bg': '#34a853',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [78, 81, 80, 45, 34, 12, 40],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faCog} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Production Panel', value: 'Production Panel' },
          ]}
          style={{
            '--cui-card-cap-bg': '#fbbc05',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faCheckCircle} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for QC - Rep. & Chk.', value: 'QC - Rep. & Chk.' },
          ]}
          style={{
            '--cui-card-cap-bg': '#ea4335',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={ faGem} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Polishing', value: 'Polishing' },
          ]}
          style={{
            '--cui-card-cap-bg': '#ea4335',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faGift} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Packaging', value: 'Packaging' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4285f4',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faTruck } size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Shipping & Invoice', value: 'Shipping & Invoice' },
          ]}
          style={{
            '--cui-card-cap-bg': '#34a853',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faWarehouse} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Warehouse', value: 'Warehouse' },
          ]}
          style={{
            '--cui-card-cap-bg': '#fbbc05',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faPlusSquare} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Carton Inventory', value: 'Carton Inventory' },
          ]}
          style={{
            '--cui-card-cap-bg': '#fbbc05',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faUser} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for User & Permission', value: 'User & Permission' },
          ]}
          style={{
            '--cui-card-cap-bg': '#ea4335',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faShieldAlt} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Gate Module', value: 'Gate Module' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4285f4',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          // color="warning"
          // {...(props.withCharts && {
          //   chart: (
          //     <CChart
          //       className="position-absolute w-100 h-100"
          //       type="line"
          //       data={{
          //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //         datasets: [
          //           {
          //             backgroundColor: 'rgba(255,255,255,.1)',
          //             borderColor: 'rgba(255,255,255,.55)',
          //             pointHoverBackgroundColor: '#fff',
          //             borderWidth: 2,
          //             data: [35, 23, 56, 22, 97, 23, 64],
          //             fill: true,
          //           },
          //         ],
          //       }}
          //       options={chartOptions}
          //     />
          //   ),
          // })}
          icon={<FontAwesomeIcon icon={faFileAlt} size="2x" className="my-4 text-white" />}
          values={[
            { title: 'Summary Content for Reports', value: 'Reports' },
          ]}
          style={{
            '--cui-card-cap-bg': '#34a853',
          }}
        />
      </CCol>
      

    </CRow>
  )
}

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsBrand

import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

// import { useNavigation } from 'react-navigation'

export default function Home (props) {
  console.log('Home props: ', props)
  console.log('Home.theme prop type: ', typeof(props.theme))

  // const navigation = useNavigation()
  // General data? Stocks notifications etc.
  return (
  <React.Fragment>
    <div background-color= {props.theme}> Home page placeholder
    <div className="container">
      <table className={`table table-${props.theme} table-striped`}>
        <thead>
          <tr>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td>123</td>
          <td>123</td>
        </tr>
        </tbody>
        </table>
        </div>
    </div>
    <div>
      <tHome></tHome>
    </div>
  </React.Fragment>
  )
}
Home.defaultProps = {
  theme: 'light'
}


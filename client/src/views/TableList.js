//
// import React from "react";
//
// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
//   Row,
//   Col,
// } from "reactstrap";
//
// function Tables() {
//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">Simple Table</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Name</th>
//                       <th>Country</th>
//                       <th>City</th>
//                       <th className="text-center">Salary</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Dakota Rice</td>
//                       <td>Niger</td>
//                       <td>Oud-Turnhout</td>
//                       <td className="text-center">$36,738</td>
//                     </tr>
//                     <tr>
//                       <td>Minerva Hooper</td>
//                       <td>Curaçao</td>
//                       <td>Sinaai-Waas</td>
//                       <td className="text-center">$23,789</td>
//                     </tr>
//                     <tr>
//                       <td>Sage Rodriguez</td>
//                       <td>Netherlands</td>
//                       <td>Baileux</td>
//                       <td className="text-center">$56,142</td>
//                     </tr>
//                     <tr>
//                       <td>Philip Chaney</td>
//                       <td>Korea, South</td>
//                       <td>Overland Park</td>
//                       <td className="text-center">$38,735</td>
//                     </tr>
//                     <tr>
//                       <td>Doris Greene</td>
//                       <td>Malawi</td>
//                       <td>Feldkirchen in Kärnten</td>
//                       <td className="text-center">$63,542</td>
//                     </tr>
//                     <tr>
//                       <td>Mason Porter</td>
//                       <td>Chile</td>
//                       <td>Gloucester</td>
//                       <td className="text-center">$78,615</td>
//                     </tr>
//                     <tr>
//                       <td>Jon Porter</td>
//                       <td>Portugal</td>
//                       <td>Gloucester</td>
//                       <td className="text-center">$98,615</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="12">
//             <Card className="card-plain">
//               <CardHeader>
//                 <CardTitle tag="h4">Table on Plain Background</CardTitle>
//                 <p className="category">Here is a subtitle for this table</p>
//               </CardHeader>
//               <CardBody>
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Name</th>
//                       <th>Country</th>
//                       <th>City</th>
//                       <th className="text-center">Salary</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Dakota Rice</td>
//                       <td>Niger</td>
//                       <td>Oud-Turnhout</td>
//                       <td className="text-center">$36,738</td>
//                     </tr>
//                     <tr>
//                       <td>Minerva Hooper</td>
//                       <td>Curaçao</td>
//                       <td>Sinaai-Waas</td>
//                       <td className="text-center">$23,789</td>
//                     </tr>
//                     <tr>
//                       <td>Sage Rodriguez</td>
//                       <td>Netherlands</td>
//                       <td>Baileux</td>
//                       <td className="text-center">$56,142</td>
//                     </tr>
//                     <tr>
//                       <td>Philip Chaney</td>
//                       <td>Korea, South</td>
//                       <td>Overland Park</td>
//                       <td className="text-center">$38,735</td>
//                     </tr>
//                     <tr>
//                       <td>Doris Greene</td>
//                       <td>Malawi</td>
//                       <td>Feldkirchen in Kärnten</td>
//                       <td className="text-center">$63,542</td>
//                     </tr>
//                     <tr>
//                       <td>Mason Porter</td>
//                       <td>Chile</td>
//                       <td>Gloucester</td>
//                       <td className="text-center">$78,615</td>
//                     </tr>
//                     <tr>
//                       <td>Jon Porter</td>
//                       <td>Portugal</td>
//                       <td>Gloucester</td>
//                       <td className="text-center">$98,615</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }
//
// export default Tables;

/*!
=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================
*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  // Method to fetch users
  const fetchUsers = async () => {
    // Your fetch logic here, e.g., using fetch or axios
    const response = await fetch('/get_users');
    const data = await response.json();
    setUsers(data);
  };

  // Method to add user
  const addUser = async () => {
    let user = {
      id,
      name,
      email,
    };
    // Your POST logic here, e.g., using fetch or axios
    await fetch('/add_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // Reset form and fetch updated users
    setId('');
    setName('');
    setEmail('');
    fetchUsers(); // Fetch all users again after adding a new one
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add User</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <label>User ID</label>
                    <input type="number" className="form-control" value={id} onChange={e => setId(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>User name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="col">
                    <label>User Email</label>
                    <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <button className="btn btn-info mt-2" onClick={addUser}>Add User</button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">User List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>User ID</th>
                      <th>User Name</th>
                      <th>User Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;

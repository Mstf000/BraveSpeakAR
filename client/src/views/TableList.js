import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

function Tables() {
  const [id, setId] = useState('');
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error appropriately in your UI
    }
  };

  const addUser = async () => {
    try {
      const user = { id, username, email };
      await axios.post('http://localhost:5000/add_user', user);
      // Reset form and fetch updated users
      setId('');
      setName('');
      setEmail('');
      fetchUsers(); // Fetch all users again after adding a new one
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error appropriately in your UI
    }
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
                    <input type="text" className="form-control" value={username} onChange={e => setName(e.target.value)} />
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
                        <td>{user.username}</td>
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

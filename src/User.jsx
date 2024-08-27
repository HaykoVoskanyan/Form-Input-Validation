import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { initialValues, validationSchema } from './validation';

export default function User() {
  const [users, setUsers] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const handleSubmit = (values, formik) => {
    const user = {
      ...values,
      id: nanoid(10),
    };
    setUsers([...users, user]);
    formik.resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const handleEditClick = (id) => {
    setIsEdit(id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { txt, eml } = e.target;
    const updatedUsername = txt.value;
    const updatedEmail = eml.value;

    const updatedUsers = users.map((user) => {
      if (user.id === isEdit) {
        return { ...user, username: updatedUsername, mail: updatedEmail };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsEdit(null);
  };

  return (
    <div className="App">
      <h1>Validation Schema</h1>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        <Form>
          <Field type="text" name="username" placeholder="Name" />
          <ErrorMessage component="p" name="username" />
          <Field type="email" name="mail" placeholder="Email" />
          <ErrorMessage component="p" name="mail" />
          <Field type="password" name="passwrd" placeholder="Password" />
          <ErrorMessage component="p" name="passwrd" />
          <button type="submit">Add User</button>
        </Form>
      </Formik>

      {isEdit && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            name="txt"
            defaultValue={users.find((user) => user.id === isEdit)?.username || ''}
          />
          <input
            type="email"
            name="eml"
            defaultValue={users.find((user) => user.id === isEdit)?.mail || ''}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEdit(null)}>
            Cancel
          </button>
        </form>
      )}

      <table className="user__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.mail}</td>
              <td>{showPass ? user.passwrd : '*'.repeat(8)}</td>
              <td>
                <i
                  onClick={togglePasswordVisibility}
                  className={classNames({
                    'bi bi-eye-slash-fill': !showPass,
                    'bi bi-eye': showPass,
                  })}
                ></i>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handleEditClick(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
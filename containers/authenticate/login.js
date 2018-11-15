import gql from 'graphql-tag'
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import get from 'lodash/get'
import Error from '../../components/error'
import { Mutation } from 'react-apollo';

import { Formik } from 'formik';
import * as Yup from 'yup';


const LOGIN = gql`
  mutation login($_id: ID!, $password: String!) {
    login(_id: $_id, password: $password) {
      user{_id}
      token
    }
  }
`

const Login = ({ onSuccess, classes }) =>
  <Mutation mutation={LOGIN}>
    {(login, { data, error, loading }) => {
      if (get(data, 'login.token')) {
        localStorage.token = data.login.token;
        onSuccess(data.login)
      }
      return (
        <div style={{ width: '100%' }}>
          {error && <Error graphQLErrors={error} />}

          <Formik
            initialValues={{ _id: '', password: '' }}
            validationSchema={Yup.object().shape({
              _id: Yup.string()
                .email()
                .required('Required'),
              password: Yup.string().required('Password is required')
            })}
            onSubmit={variables => login({ variables })}
          >
            {({
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            }) =>
              <form onSubmit={handleSubmit}>

                <TextField
                  id="_id"
                  label="Email"
                  value={values._id}
                  onChange={handleChange}
                  margin="dense"
                  error={touched._id && errors._id}
                  helperText={touched._id && errors._id}
                  fullWidth
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                  margin="dense"
                  fullWidth
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className={classes.button}
                  variant="raised"
                  fullWidth
                  color="primary">
                  Login
                </Button>
              </form>
            }
          </Formik>

        </div>
      )
    }}
  </Mutation>


export default Login
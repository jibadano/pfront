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
      token
    }
  }
`

const Login = ({ onSuccess, classes }) =>
  <Mutation mutation={LOGIN}>
    {(login, { data, error, loading }) => {
      if (get(data, 'login.token')) {
        localStorage.token = data.login.token;
        onSuccess(data.login.token)
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
                  error={Boolean(touched._id && errors._id)}
                  helperText={touched._id && errors._id}
                  fullWidth
                  InputProps={{
                    endAdornment: <div style={{ display: 'flex' }}>
                      <a href="http://localhost:4000/auth/facebook" style={{ marginRight: 10 }} >
                        <img width="25" src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Facebook-icon.png" />
                      </a>
                      <a href="http://localhost:4000/auth/google" style={{ marginRight: 10 }} >
                        <img width="25" src="http://icons-for-free.com/free-icons/png/512/1243555.png" />
                      </a>
                    </div>

                  }}
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  margin="dense"
                  fullWidth
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className={classes.button}
                  fullWidth
                  variant="contained"
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
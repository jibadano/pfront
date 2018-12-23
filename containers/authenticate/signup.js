import gql from 'graphql-tag'
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import Error from '../../components/error'
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';


const SIGNUP = gql`
  mutation signup($_id: ID!, $password: String!) {
    signup(_id: $_id, password: $password) {
      token
    }
  }
`

const EXISTS = gql`
  query exists($_id: ID) {
    exists(_id: $_id)
  }
`

const Signup = ({ onSuccess, classes }) =>
  <Query query={EXISTS} >
    {exists =>
      <div style={{ width: '100%' }}>
        <Mutation mutation={SIGNUP}>
          {(signup, { error, data, loading }) => {
            if (data) onSuccess(data.signup)
            return (
              <Formik
                validateOnChange
                initialValues={{ _id: '', password: '', confirm: '' }}
                validationSchema={Yup.object().shape({
                  _id: Yup.string().nullable()
                    .email('Enter a valid email')
                    .required('Required')
                    .test('alreadyExists', 'Email already exists', async _id => _id ? exists.refetch({ _id }).then(({ data }) => !data.exists) : false),
                  password: Yup.string().nullable().required('Password is required'),
                  confirm: Yup.mixed().test('confirm', 'Passwords does not match', function (confirm) {
                    return this.parent.password === confirm
                  }).required('Must confirm your password')
                })}
                onSubmit={variables => signup({ variables })}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  validateForm
                }) =>
                  <form onSubmit={handleSubmit}>
                    {error && <Error graphQLErrors={error.graphQLErrors} />}
                    <TextField
                      id="_id"
                      label="Email"
                      value={values._id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      error={Boolean(touched._id && errors._id)}
                      helperText={touched._id && errors._id}
                      fullWidth
                      InputProps={{
                        endAdornment: (exists.loading ? <CircularProgress size={25} thickness={7} /> :
                          touched._id && !errors._id && <CheckIcon />),
                      }}
                    />

                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      margin="dense"
                      fullWidth
                    />
                    <TextField
                      id="confirm"
                      type="password"
                      label="Confirm password"
                      value={values.confirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.confirm && errors.confirm)}
                      helperText={touched.confirm && errors.confirm}
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
                      Sign up
                    </Button>


                  </form>
                }
              </Formik>
            )
          }}
        </Mutation>

      </div>
    }
  </Query>


export default Signup
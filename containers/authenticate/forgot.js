import gql from 'graphql-tag'
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import Error from '../../components/error'
import { Mutation } from 'react-apollo';

import { Formik } from 'formik';
import * as Yup from 'yup';


const FORGOT = gql`
  mutation forgot($_id: ID!) {
    forgot(_id: $_id)
  }
`

const Forgot = ({ classes }) =>
  <div style={{ width: '100%' }}>
    <Mutation mutation={FORGOT}>
      {(forgot, { data, loading }) => {
        if (data) return <Typography style={{margin:'20px 0'}}>We have sent your password to your email address.</Typography>
        return <Formik
          initialValues={{ _id: '', password: '' }}
          validationSchema={Yup.object().shape({
            _id: Yup.string()
              .email()
              .required('Required'),
          })}
          onSubmit={variables => forgot({ variables })}
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
              <Button
                disabled={loading}
                type="submit"
                className={classes.button}
                variant="raised"
                fullWidth
                color="primary">
                Send
                   </Button>
            </form>
          }
        </Formik>
      }}
    </Mutation>
  </div>


export default Forgot

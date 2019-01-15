import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import * as Yup from 'yup'

//formik semantic-ui wraps certain semantic ui components with formik functionality
import {Button, Form, Input} from 'formik-semantic-ui'
import {Grid, Header, Image, Segment, Icon} from 'semantic-ui-react'

const SignupSchema = Yup.object().shape({
  password: Yup.string().required('No password provided.'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Required')
})
/**
 * COMPONENT
 */
class AuthForm extends Component {
  // this creates the initial values for the form fields
  static defaultProps = {
    authProps: {
      email: '',
      password: ''
    }
  }

  _handleSubmit = async (values, formikApi) => {
    try {
      // Make API Call
      // Handle response / Errors
      let result = await this.props.dispatch(
        auth(values.email, values.password, this.props.name)
      )
      // if status is 401 set the error to backend response/error data
      if (result.user.error.response.status === 401) {
        formikApi.setFieldError('email', result.user.error.response.data)
      }
      formikApi.setSubmitting(false)
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    return (
      <div className="auth-form">
        <Grid
          className="auth-form-grid"
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg" />{' '}
              {this.props.displayName} to your account
            </Header>
            <Form
              onSubmit={this._handleSubmit}
              name={this.props.name}
              initialValues={this.props.authProps}
              validationSchema={SignupSchema}
            >
              {/* when using formik semantic ui to manipulate input put props in inputProps */}
              <Segment stacked>
                <Input
                  fluid
                  inputProps={{
                    type: 'email',
                    icon: 'user',
                    iconPosition: 'left',
                    placeholder: 'E-mail address'
                  }}
                  name="email"
                />
                <Input
                  placeholder="Password"
                  inputProps={{
                    type: 'password',
                    icon: 'lock',
                    iconPosition: 'left',
                    placeholder: 'Password'
                  }}
                  name="password"
                />
                <Button.Submit type="submit" fluid size="large">
                  {this.props.displayName}
                </Button.Submit>
              </Segment>
            </Form>
            <a href="/auth/google">
              <Button color="google plus" floated="left">
                <Icon name="google plus" /> {this.props.displayName} with
                Google+
              </Button>
            </a>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

export const Login = connect(mapLogin)(AuthForm)
export const Signup = connect(mapSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}

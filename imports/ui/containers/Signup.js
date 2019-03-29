import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Meteor.call('addUser',values.userName,values.password,(err)=>{
          if(err)
            alert(err);
          else{
            Meteor.loginWithPassword(values.userName, values.password,(err)=>{
              if(!err)
                this.props.history.push('/setprofile/');
              else
                alert(err)
            });
          }

        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleBack = () => {
    this.props.history.push('/login/');
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{background:"white", height:1000}}>


        <div style={{height:"15%"}}/>

        <div className="uraccount">
          <h1>Your Account</h1>
        </div>



        <div style={{margin:"0 20% 0 20%"}}>


          <div className="register">
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit}>

              <FormItem>
                  {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>

              <FormItem>

                <Button type="primary" style={{marginRight: '10px'}} onClick={this.handleBack.bind(this)}>
                  <Icon type="arrow-left" />LogIn
                </Button>

              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                Register
              </Button>

              </FormItem>

            </Form>

          </div>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
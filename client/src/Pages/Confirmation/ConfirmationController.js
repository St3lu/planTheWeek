import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ConfirmationView from "./ConfirmationView";
import { Redirect } from "react-router-dom";

class ConfirmationController extends React.Component {
  state = {
    error: null,
    redirect: false
  };

  async getValues(values) {
    const mutation = await this.props.mutate({
      variables: {
        email: values.email,
        confirmId: this.props.match.params.id
      }
    });

    if (!mutation.data.confirmEmail) {
      this.setState({
        error:
          "There is a problem with your confirmation. Check your email. Or maybe you have already confirmed your email"
      });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home" /> : null}
        <ConfirmationView
          getValues={v => this.getValues(v)}
          error={this.state.error}
        />
      </div>
    );
  }
}

const confirmEmailMutation = gql`
  mutation($email: String!, $confirmId: String!) {
    confirmEmail(email: $email, confirmId: $confirmId)
  }
`;

export default graphql(confirmEmailMutation)(ConfirmationController);

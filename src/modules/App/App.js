import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import config from 'config';
import app from 'app';
import { logout } from 'modules/Auth/redux';
import { notifSend } from 'modules/Notifs/redux';

import { clearUser } from 'modules/user/redux';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

@connect(
  state => ({
    authenticated: !!state.auth.user
  }), { notifSend, logout, clearUser, push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    notifs: PropTypes.object,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    notifSend: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const notifSend = this.props.notifSend;
  }

  componentDidCatch() {
    //TODO
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout().then(() => {
      this.props.clearUser();
      this.props.push('/login');
    });
  };

  render() {
    const authenticated = this.props.authenticated;
    const { pathname } = this.props.location;
    require('theme/index.global.scss');
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navigation authenticated={authenticated} handleLogout={this.handleLogout} pathname={pathname} />
        <div className={styles.appContent}>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

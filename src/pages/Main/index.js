import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { isUserWhitespacable } from '@babel/types';
import api from '../../services/api';
// import { Container } from './styles';

export default class Main extends Component {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    const res = await api.get('/api/tasks');
    this.setState({ data: res.data });
  };

  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {data.map(user => (
          <Text key={user._id}>{user.tarefa}</Text>
        ))}
      </View>
    );
  }
}

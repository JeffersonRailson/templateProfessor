import React, { Component } from 'react';

import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
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

  updateCompleted = async (id) => {
    await api.put(`/api/tasks/${id}`, { done: true });
    this.componentDidMount();
  };

  updateNotCompleted = async (id) => {
    await api.put(`/api/tasks/${id}`, { done: false });
    this.componentDidMount();
  };

  //= {() => this.updateStatus(task._id, task.done)
  render() {
    const { data } = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#b0c4de' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#b0c4de',
          }}
        >
          {data.map(task => (!task.done ? (
            <TouchableOpacity
              key={task._id}
              onPress={() => (task.done ? this.updateNotCompleted(task._id) : this.updateCompleted(task._id))
                }
            >
              <Text
                style={{
                  fontSize: 35,
                  textDecorationLine: 'line-through',
                  textAlign: 'center',
                  margin: 5,
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {task.tarefa}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={task._id}
              onPress={() => (task.done ? this.updateNotCompleted(task._id) : this.updateCompleted(task._id))
                }
            >
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  margin: 5,
                  color: 'green',
                  fontWeight: 'bold',
                }}
              >
                {task.tarefa}
              </Text>
            </TouchableOpacity>
          )))}
        </View>
      </ScrollView>
    );
  }
}

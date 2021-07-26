import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, FlatList, Dimensions} from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constant/Colors'
import TodoTile from './todo-tile'


const TodoGroup = (props) => {

    // const [_todos, set_todos] = useState([])
    const { todoData } = useSelector(state => state.todoData)
    const { todos } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    // const renderItem = ({ item }) => (
    //   <TodoTile {...item} />
    // );

    // useEffect(() => {
    //   set_todos(todos)
    // }, [todos])

    return (
      <>
        {todos.length > 0 && <List.AccordionGroup>
            {todos.map(todo => <TodoTile key={todo.id} {...todo} />)}
            
            {/* <FlatList
                keyExtractor={(item, index) => item.id}
                  data={todos}
                  renderItem={renderItem}
            /> */}

            
        </List.AccordionGroup>}

        {todos.length < 1 &&
          <View style={styles.noTodoBox}>
            <Text style={styles.noTodoText}>Nothing Todo</Text>
          </View>
        }
      </>
    )
  }

  const styles = StyleSheet.create({
    noTodoBox: {
      // backgroundColor: Colors.accent,
      // width: '100%',
      // height: '50%',
      paddingTop: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noTodoText: {
      color: Colors.accent
    }
  });
  

  export default TodoGroup;
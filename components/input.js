import React, { useState, useEffect } from 'react'
import {Platform, View, StyleSheet, Text, Modal, ToastAndroid, Image} from 'react-native'
import { TextInput, Button, Colors as PaperColors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

import Colors from '../constant/Colors'

import { useSelector, useDispatch } from 'react-redux';
// import { setTitle } from '../store/actions/title';
// import { setDetail } from '../store/actions/detail';
import { setTodoData } from '../store/actions/todo-data';
import { addTodo } from '../store/actions/todos';

const Input = (props) => {

  // const { title } = useSelector(state => state.title)
  // const { detail } = useSelector(state => state.detail)
  const { todoData } = useSelector(state => state.todoData)
  const { todos } = useSelector(state => state.todos)
  const dispatch = useDispatch()


  const [todoTitle, setTodoTitle] = useState('');
  const [todoDetails, setTodoDetails] = useState("")
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false)
  const [image, setImage] = useState({
                        "cancelled": false, 
                        "height": 1932, 
                        "type": "image", 
                        "uri": `https://via.placeholder.com/120/FFFFFF/808080?text=NO IMAGE`, 
                        "width": 2576
                      });

  useEffect(() => {
    // dispatch(setTitle("It is working better"));
    // dispatch(setDetail("What's updetails"));
    dispatch(setTodoData({"title": "arrival", "detail": "Leave my house very early so I can meet up", "image": {}, "date": new Date()}));
    // dispatch(addTodo([1,2,3,4,5,0]));

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   // console.log("Emmanuel title :>", title)
  //   // console.log("Emmanuel detail :>", detail)
  //   console.log("We came a long way :>", todoData)
  //   console.log("We work to do :>", todos)
  // }, [todoData])

  useEffect(() => {
    // console.log("Inner Todo:> ", todos.length)
    if(todos.length > 0){
      ToastAndroid.show('Todo Added', ToastAndroid.SHORT);
      setAddingTodo(false)
    }
  }, [todos])

  const handleLoadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };


  // const handleLoadImage = () => {
  //   NativeModules.ImagePickerManager.launchImageLibrary(
  //     {
  //     selectionLimit: 1,
  //     mediaType: "photo",
  //     includeBase64: true
  //     }, 
  //     (obj)=> {console.log("Call Success")},
  // }
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleAddTodo = async () => {
    setAddingTodo(true)
    // console.log({"todoTitle": todoTitle,
    //   "todoDetails": todoDetails,
    //   "date": date,
    //   "image": image,})

    if (todoTitle && todoDetails){
      dispatch(addTodo({
        "id": Date.now(),
        "title": todoTitle,
        "detail": todoDetails,
        "date": date,
        "image": image,
        "done": false
      }));
    }else{
      ToastAndroid.show('Some fields are not available !', ToastAndroid.SHORT);
      setAddingTodo(false)
    }
    };
    return (
      <View style={{...styles.container, ...props.style}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => setShow(false)}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          </Modal>

          <TextInput
            style={styles.textInput}
            label="Title"
            underlineColor={Colors.primary}
            outlineColor={Colors.primary}
            selectionColor={Colors.primary}
            value={todoTitle}
            onChangeText={todoTitle => setTodoTitle(todoTitle)}
          />

          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Deails"
            numberOfLines={2}
            // multiline={true}
            underlineColor={Colors.primary}
            outlineColor={Colors.primary}
            selectionColor={Colors.primary}
            value={todoDetails}
            onChangeText={todoDetails => setTodoDetails(todoDetails)}
          />

          <View style={styles.imageDate}>
            <Button
              style={styles.buttonStyle}
              uppercase={false}
              mode='outlined'
              // icon="image"
              color={Colors.primary}
              size={40}
              onPress={handleLoadImage}
            >
              <Icon name="image" size={16} color={Colors.primary} />
              <Text style={styles.buttonText}>{'   Add Image'}</Text>
            </Button>

            <Button
              style={styles.buttonStyle}
              uppercase={false}
              mode='outlined'
              // icon="image"
              color={Colors.primary}
              size={40}
              // onPress={handleLoadImage}
              onPress={() => setShow(true)}
            >
              <Icon name="calendar" size={16} color={Colors.primary} />
              <Text style={styles.buttonText}>{'  Choose Date'}</Text>
            </Button>

          </View>

          <View>
            <Button
                style={styles.saveButton}
                uppercase={false}
                mode='outlined'
                // icon="image"
                disabled={addingTodo}
                loading={addingTodo}
                color={Colors.primary}
                size={40}
                // onPress={handleLoadImage}
                onPress={() => handleAddTodo()}
              >
                {!addingTodo && <Icon name="save" size={16} color={Colors.white} />}
                <Text style={{color: Colors.white}}>{'   Add Todo'}</Text>
              </Button>

          </View>
          {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}

      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {

    },
    textInput: {
      marginVertical: 10,
    },
    buttonStyle: {
      width: '50%'
    },
    imageDate: {
      flexDirection: 'row',
      // flex: 1,
    },
    saveButton: {
      width: "70%",
      backgroundColor: Colors.pink,
      color: Colors.white,
      borderRadius: 20,
      marginTop: 20,
      shadowColor: Colors.pink,
      shadowOpacity: 0.80,
      shadowRadius: 16,
      shadowOffset: {width: 0, height: 16},
      elevation: 24,
      alignSelf: "center",
    }

  });
  

  export default Input;
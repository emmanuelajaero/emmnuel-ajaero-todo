import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableHighlight, ScrollView, Dimensions } from 'react-native';

import Colors from './constant/Colors'
import Header from './components/header'
import Card from './components/card'
import Input from './components/input'

import  {createStore, combineReducers} from 'redux';
import  {Provider} from 'react-redux';
import { DefaultTheme, Provider as PaperProvider, List } from 'react-native-paper';
import TodoTile from './components/todo-tile';

import titleReducer from './store/reducers/title';
import detailReducer from './store/reducers/detail'
// import  todoReducer from './store/reducers/todos'
import todosReducer from './store/reducers/todos'
// import refreshTodosReducer from './store/reducers/refresh-todos'

import todoDataReducer from './store/reducers/todo-data'
import TodoGroup from './components/todo-group';


// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const rootReducer = combineReducers({
  todos: todosReducer,
  title: titleReducer,
  detail: detailReducer,
  todoData: todoDataReducer,
  // refreshTodosReducer,
  // todos: refreshTodosReducer,
})

const store = createStore(rootReducer);





export default function App() {

  // const [fontLoading, setFontLoading] = useState(false)

  // if(!fontLoading){
  //   return <AppLoading 
  //     startAsync={fetchFonts} 
  //     onFinish={() => setFontLoading(true)}
  //     onError={(error) => console.log("font error", error)}
  //   />;
  // }

  
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
      {/* <ImageBackground 
        style={styles.background} 
        source={require("./assets/backgroundImage.jpg")}
      > */}
      <View style={styles.background} >
        <StatusBar backgroundColor={Colors.primary} barStyle='light-content' />
        <Header label="EA Todo" />
        
        <ScrollView
          style={styles.scrollArea}
        >
          <Card 
            style={{width: "95%", marginVertical: 20, padding: 20,}}
          >
            <Input />
          </Card>

            <TodoGroup />      

          {/* <Text>Open up App.js to start working on your app!</Text> */}
        </ScrollView>
      </View>
        {/* </ImageBackground> */}
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    // paddingBottom: 200,
  },
  scrollArea: {
    // minHeight: '100%',
    marginBottom: 10
  }
});

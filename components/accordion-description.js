import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { Button, Colors as PaperColors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors'
import { refreshTodos } from '../store/actions/refresh-todos'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { FileSystem } from 'react-native-unimodules';

const AccordionDescription = (props) => {
    const [done, setDone] = useState(props.done)

    const { todos } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    // console.log("Window :> ", props)

    const handleDone = () => {
        console.log("Done With :> ", props.id)

        let resetDone = false;

        const modifiedTodos = todos.map(todo => {
            console.log(todo.id == props.id)
            if(props.id == todo.id){
                todo.done = true;
                // setDone(true)
                resetDone = true;
            }
            return todo
        });

        dispatch(refreshTodos(modifiedTodos));
        setDone(resetDone)
        props.Done.bind(this, resetDone)
    }

    const handleShare = async () => {
        
        // const data = await FileSystem.readAsStringAsync('file://' + uri, {
        const data = await FileSystem.readAsStringAsync(props.image.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const base64Image = 'data:image/png;base64,' + data;
        // <img src=${props.image.uri} alt="NO IMAGE" width="500" height="333">

        const pdf = await Print.printToFileAsync({
            html: `<div>
                    <b>You Are Receiving This From EA Todo</b>
                    <br />
                    <br />
                    <span>
                    <b>Title</b>:<b>${props.title}</b>
                    </span>
                    <br />
                    <br />
                    <span>
                    <b>Todo State</b>:<b>${props.done ? "DONE" : "PENDIND"}</b>
                    </span>
                    <br />
                    <br />
                    <span>
                    <b>Date</b> :<b>${props.date}</b>
                    </span>
                    <br />
                    <br />
                    <img src="${base64Image}" alt="NO IMAGE" width="500" height="500" />
                    <p>${props.detail}</p>
                    <br />
                    </div>
                `,
        })

        console.log("Printed ; ", pdf);
        
        const deviceCanShare = await Sharing.isAvailableAsync();

        let sent = null
        if(deviceCanShare){
            sent = await Sharing.shareAsync(pdf.uri, {

            })
        }

        // console.log("SENT : ", sent)
        ToastAndroid.show('Sent file', ToastAndroid.SHORT);

    }

    const handleDelete = () => {
        console.log("Delete :> ", props.id)
        // console.log("Todos: ", todos);

        const modifiedTodos = todos.filter(todo => props.id != todo.id)

        // console.log("modifiedTodos: ", modifiedTodos);

        dispatch(refreshTodos(modifiedTodos));
    }

    useEffect(() => {
        console.log("Todos = ", todos.length)
    }, [todos])

  

    return(
        <View style={styles.container}>
            <View style={{}}>
                <Image
                    style={{
                        // flex:1,
                        borderRadius: 5,
                        width: 120,
                        height: 120,
                    }}
                    // style={styles.tinyLogo}
                    source={{
                        uri: props.image.uri,
                    }}
                    // source={require('../assets/backgroundImage.jpg')}
                />
            </View>
            <View style={{}}>
                <View style={styles.actionButtons}>
                        <TouchableOpacity
                            onPress={() => handleDelete()}
                        >
                            <View
                                    style={[styles.actionButton, {backgroundColor: Colors.pink,}]}
                                >
                                <Icon name="trash" size={18} color={Colors.white} />
                                <Text style={styles.actionButtonText}>{' Delete'}</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => handleShare()}
                        >
                            <View
                                    style={[styles.actionButton, {backgroundColor: Colors.accent,}]}
                                >
                                <Icon name="share-alt" size={18} color={Colors.primary} />
                                <Text style={[styles.actionButtonText, {color: Colors.primary}]}>{' Share'}</Text>
                            </View>
                        </TouchableOpacity>


                        {!done && 
                            <TouchableOpacity
                                onPress={() => handleDone()}
                            >
                                <View
                                        style={[styles.actionButton, {backgroundColor: Colors.primary,}]}
                                    >
                                    <Icon name="star" size={18} color={Colors.white} />
                                    <Text style={styles.actionButtonText}>{' Done'}</Text>
                                </View>
                            </TouchableOpacity>
                        }


                </View>
                <View style={{paddingTop: 10, paddingLeft: 10, paddingRight: 48}}>
                    <Text
                        lineBreakMode="tail"
                        ellipsizeMode="tail"
                        numberOfLines={4}
                    >
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by acciden
                    </Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green',
        flexDirection: 'row',
        width: "100%",
    },
    actionButtons: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: Colors.white,
    },
    actionButton: {
        // width: "40%",
        color: Colors.white,
        borderRadius: 20,
        // marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOpacity: 0.80,
        shadowRadius: 16,
        shadowOffset: {width: 0, height: 16},
        elevation: 24,
        // alignSelf: "center",
        padding: 5,
        marginLeft: 5,
      },
    actionButtonText: {
        color: Colors.white, 
        fontSize: 12,
        fontWeight: 'bold',
    }
})


export default AccordionDescription;
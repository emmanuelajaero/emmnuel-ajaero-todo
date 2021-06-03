import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native'
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Colors from '../constant/Colors'
import AccordionDescription from './accordion-description';
import Card from './card';

const appWidth = Dimensions.get('window').width;
const appHeight = Dimensions.get('window').height;

const TodoTile = (props) => {

    const todos = useSelector(state => state.todos)
    const [done, setDone] = useState(props.done)

    useEffect(() => {
        setDone(props.done)
    }, [todos])

    return (
        <View style={styles.container}>
            <Card style={{with: "95%", marginVertical: 3,}}>
                <List.Accordion
                    // style={styles.body}
                    id={props.id}
                    style={{borderRadius: 5}}
                    title={props.title}
                    left={props => <List.Icon {...props} icon={done  ? "star" : "layers"} />}
                >
                        <View style={styles.outerBody}>
                            <View style={styles.body}>
                                <AccordionDescription Done={data => setDone(data)} {...props} />
                            </View>
                        </View>
                </List.Accordion>
            </Card>
        </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        // height: 200,
        width: "95%",
        // backgroundColor: Colors.pink
    },
    outerBody: {
        // height: 200,
        borderRadius: 5,
        paddingLeft: -64,
        paddingRight: 64,
        width: "100%",
        // backgroundColor: Colors.accent,
        // marginLeft: -(appWidth*0.05),
    },
    body: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flex: 1,
        flexDirection: 'row',
    }    
});
  

  export default TodoTile;
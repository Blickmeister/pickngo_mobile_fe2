import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {getIngredientsUrl} from '../constants/endpoints';

class CreateBaguetteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                customer: {},
                price: '',
                date: '',
                state: '',
                items: [],
            },
            ingredients: [],
        };
    }

    componentDidMount() {
        fetch(getIngredientsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://192.168.100.12:3000',
            },
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ingredients: jsonResponse});
                console.log('response: ' + jsonResponse);
            }).catch((err) => console.error(err));
    }

    render() {
        const baguetteTypes = [{
            label: 'Světlá',
        }, {
            label: 'tmavá',
        },
        ];
        return (
            <View style={styles.container}>
                <View style={styles.containerWelcome}>
                    <Text style={styles.welcome}>PickNGo</Text>
                </View>
                <View style={styles.typeContainer}>
                    <Text>Typ bagety:</Text>
                    {/* zatím na pevno, pak dynamicky */}
                    <RadioButtonRN
                        data={baguetteTypes}
                        selectedBtn={(e) => console.log(e)}
                    />
                </View>
                <View style={styles.ingredientContainer}>
                    <Text>Ingredience:</Text>
                    {/* TODO */}
                    {this.state.ingredients.map((ingredient, index) => {
                        return (
                            <Text>{ingredient.name}</Text>
                        )
                    })}
                </View>
            </View>
        );
    }
}

export default CreateBaguetteScreen;

// stylizace
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
    },
    containerWelcome: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },
    contentContainer: {
        borderWidth: 5,
        borderColor: 'black',
        flex: 1,
        width: 330,
        height: 420,
    },
    typeContainer: {
        marginTop: 60,
    },
    ingredientContainer: {
        marginTop: 10,
    },
});

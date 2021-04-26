import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {getIngredientsUrl} from '../constants/endpoints';

class CreateBaguetteComponent extends Component {
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
            isAuthenticated: false,
            user: undefined,
            isLoading: true
        };
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
    }


    componentDidMount() {
        fetch(getIngredientsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://192.168.100.12:8081',
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
            <View>
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
                        );
                    })}
                </View>
            </View>
        );
    }
}


export default CreateBaguetteComponent;

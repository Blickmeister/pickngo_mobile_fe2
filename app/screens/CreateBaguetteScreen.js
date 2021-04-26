import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_USER_KEY} from '../screens/LoginScreen';
import CreateBaguetteComponent from '../components/createbaguette/CreateBaguetteComponent';
import {createBaguetteOrderUrl} from '../constants/endpoints';

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
            isAuthenticated: false,
            user: '',
            orderId: '',
            isLoading: true,
        };
        //const {cookies} = props;
        //this.state.csrfToken = cookies.get('XSRF-TOKEN');
        //this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    getItem = () => {
        return AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
    };

    componentDidMount() {
        /* (() => {
             let user = AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
             if (user !== null && user !== undefined && user !== '') {
                 // We have data!!
                 this.setState({user: user, isAuthenticated: true});
                 console.log("USEROS:" + user);
             } else {
                 this.setState({isAuthenticated: false});
             }
         })
         ();*/
        (async () => {
            await this.retrieveData();
        })();
        console.log('orderId: ' + this.props.orderId);
        if (this.props.orderId === undefined) {
            // nemáme ještě orderId -> nová objednávka
            fetch(createBaguetteOrderUrl, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Objednávka vytvořena');
                    } else {
                        response.json()
                            .then((json) => console.error('Objednávku se nepodařilo vytvořit: ' + json.message));
                    }
                })
                .then((jsonResponse) => {
                    this.setState({orderId: jsonResponse});
                    console.log("resík pusík: " + jsonResponse);
                })
                .catch((error) => console.log('Chyba při vytváření objednávky: ' + error));
        } else {
            // předání orderId pro vytvoření další bagety
            this.setState({orderId: this.props.orderId});
        }
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
            if (value !== null) {
                console.log('VALUE: ' + value);
                this.setState(() => ({user: value}));
                // value previously stored
            }
        } catch (e) {
            // error reading value
            console.log('READ ERROR: ' + e);
        }
    };

    logout() {
        /* fetch('http://192.168.100.12:8080/api/logout', {
             method: 'POST',
             credentials: 'include',
             headers: {
                 'X-XSRF-TOKEN': this.state.csrfToken
             }
         })
             .then(res => res.json())
             .then(jsonResponse => {
                 window.location.href = jsonResponse.logoutUrl + "?id_token_hint=" +
                     jsonResponse.idToken + "&post_logout_redirect_uri=" + window.location.origin;
             }).catch((err) => console.error(err));*/
    }

    render() {
        let definedUser = this.state.user !== undefined;

        return (
            <View style={styles.container}>
                <View style={styles.containerWelcome}>
                    <Text style={styles.welcome}>PickNGo - Návrh bagety</Text>
                </View>
                {definedUser && <Text style={styles.textCenter}>Přihlášený uživatel: {this.state.user}</Text>}
                <CreateBaguetteComponent orderId={this.state.orderId}/>
            </View>
        );
    }
}

export default CreateBaguetteScreen;

// stylizace
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
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
    textCenter: {
        textAlign: 'center',
    },
    textBig: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    marginAll: {
        margin: 2,
    },
});

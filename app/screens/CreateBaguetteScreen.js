import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { withCookies } from 'react-cookie';
import WebViewLoginComponent from '../components/WebViewLoginComponent';
import CreateBaguetteComponent from '../components/CreateBaguetteComponent';

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
            user: undefined,
            isLoading: true
        };
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        //this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        fetch('http://192.168.100.12:8080/customer/token', {
            credentials: 'include'
        })
            .then((response) => response.text())
            .then((body) => {
                if (body === '') {
                    this.setState(({isAuthenticated: false}))
                } else {
                    this.setState({isAuthenticated: true, user: JSON.parse(body)})
                }}).catch((err) => console.error(err));

        /*fetch(getIngredientsUrl, {
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
            }).catch((err) => console.error(err));*/
    }

    logout() {
        fetch('http://192.168.100.12:8080/api/logout', {
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
            }).catch((err) => console.error(err));
    }

    render() {
        console.log(this.state.isAuthenticated);
        const { user, isAuthenticated} = this.state;
        let definedUser = false;
        if (user === undefined) definedUser = false;
        else definedUser = true;

        return (
            <View style={styles.container}>
                <View style={styles.containerWelcome}>
                    <Text style={styles.welcome}>PickNGo</Text>
                </View>
                {definedUser ? <h2>Uživatel {this.state.user.name}!</h2> :
                    <Text>Pro vytvoření objednávky je nutné se nejprve přihlásit</Text>}
                {!isAuthenticated ? <WebViewLoginComponent/> : <CreateBaguetteComponent/>}
            </View>
        );
    }
}

export default withCookies(CreateBaguetteScreen);

// stylizace
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        flex: 1
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

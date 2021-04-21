import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground
} from "react-native";
import config from '../../aws-exports';
import { icons, SIZES, COLORS, FONTS, images } from '../contants'
import styles from '../layouts/styles/Menu.component.style';

import Amplify from '@aws-amplify/core';
Amplify.configure(config);

import { DataStore } from '@aws-amplify/datastore'
import { Food } from '../../models'
import { ScrollView } from "react-native";
let subscription;


class RestaurantMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSearch: false,
            Restaurantsdata: '',
            currentLocation: '',
            FoodData: '',
            kategori: [],
        };
    }
    componentDidMount() {
        const { item } = this.props.route.params;
        this.setState({ Restaurantsdata: item });

        this.onQuery(item);
        subscription = DataStore.observe(Food).subscribe((msg) => {
            // console.log("SUBSCRIPTION_UPDATE", msg);
            this.onQuery(item);
        });

    }

    componentWillUnmount() {
        subscription.unsubscribe();
    }

    onQuery = async (resData) => {
        const { kategori } = this.state;
        const FoodData = await DataStore.query(Food, (s) => s.restaurantId('eq', resData.id));
        this.setState({ FoodData });
        // sotering af kategoirer 
        FoodData.map((newFood) => {
            if (!(this.state.kategori.filter(e => e.categorie === newFood.categorie).length > 0)) {
                this.setState(prevState => ({
                    kategori: [...prevState.kategori, {categorie: newFood.categorie}]
                }))
            }
        })
        console.log('FoodData ', resData.id)
        // console.log("QUERY_COMMENTS_RESULT", FoodData);
    };


    render() {
        const { FoodData, Restaurantsdata, kategori } = this.state;
        const { navigate } = this.props.navigation;

        function renderMenu() {
            if (FoodData != '') {
                console.log(kategori)
                return (
                    <View style={{ marginTop: '50%' }} >
                        <Text style={styles.headlineCate} >Vælge kategorie</Text>
                        <ScrollView>
                            {kategori.map((foods, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.categoriesBtn}
                                        onPress={() => navigate('UnderMenu', {
                                            Menu: foods.categorie,
                                            restaurant: Restaurantsdata
                                        })}
                                    >
                                        <Text  style={{ textAlign: 'center' }}>{foods.categorie}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            }
                        </ScrollView>
                    </View>
                )
            }
        }

        return (
            <View style={styles.Contanier} >
                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => navigate("Restaurant")}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />

                </TouchableOpacity>
                <Image source={images.burger_restaurant_2} style={styles.Header}>
                </Image>
                <View style={styles.RestaurantInfo}>
                    <View>
                        <View style={styles.resLogoView}>
                            <Image source={images.logo} style={styles.resLogo} />
                        </View>
                        <View style={styles.List}>
                            <View style={styles.underlist}>
                                <Image source={icons.motorcycle} style={styles.iconImage} />
                                <Text style={styles.iconText}>Delivery time {Restaurantsdata.duration} min</Text>
                            </View>
                            <View style={styles.underlist}>
                                <Image source={icons.thumpsup} style={styles.iconThumpsup} />
                                <Text style={styles.iconText}>Excellent <Text style={{ color: COLORS.logoGreen }}> {Restaurantsdata.rating} </Text></Text>
                            </View>
                            <View style={styles.underlist}>
                                <Image source={icons.dollar} style={styles.iconDollar} />
                                <Text style={styles.iconText}>Delivery Cost {Restaurantsdata.deliveryCost} kr</Text>
                            </View>
                        </View>
                        <Text style={styles.RestaurantName} >{Restaurantsdata.name}</Text>
                    </View>
                </View>

                <SafeAreaView>
                    <ScrollView>
                        {renderMenu()}
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}
export default RestaurantMenu
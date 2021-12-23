import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';

import { MainLayout } from '../screens';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import icons from '../constants/icons';
import dummyData from '../constants/dummyData';
import constants from '../constants/constants';

import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack7 : null
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />
            <Text style={{
                marginLeft: 15,
                color: COLORS.white,
                ...FONTS.h3
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
};

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <View style={{
                flex: 1,
                paddingHorizontal: SIZES.radius
            }}>

                {/* Close button */}
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={{ height: 35, width: 35, tintColor: COLORS.white }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Profile */}

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress={() => console.log('profile')}
                >
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                            {dummyData.myProfile?.name}
                        </Text>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                            View Your Profile
                        </Text>

                    </View>
                </TouchableOpacity>

                {/* Drawer Items */}
                <View style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                }}>
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab === constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home)
                            navigation.navigate('MainLayout')
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.my_wallet}
                        icon={icons.wallet}
                    />
                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab === constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification)
                            navigation.navigate('MainLayout')
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab === constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab(constants.screens.favourite)
                            navigation.navigate('MainLayout')
                        }}
                    />

                    {/* Line Divider */}
                    <View style={{
                        height: 1,
                        marginVertical: SIZES.radius,
                        marginLeft: SIZES.radius,
                        backgroundColor: COLORS.lightGray1
                    }} />

                    <CustomDrawerItem
                        label='Track your order'
                        icon={icons.location}
                    />

                    <CustomDrawerItem
                        label='Coupons'
                        icon={icons.coupon}
                    />

                    <CustomDrawerItem
                        label='Settings'
                        icon={icons.setting}
                    />
                    <CustomDrawerItem
                        label='Invite a friend'
                        icon={icons.profile}
                    />
                    <CustomDrawerItem
                        label='Help Center'
                        icon={icons.help}
                    />
                </View>

                <View style={{
                    marginBottom: SIZES.padding
                }}>
                    <CustomDrawerItem
                        label='Logout'
                        icon={icons.logout}
                    />
                </View>
            </View>

        </DrawerContentScrollView>
    )
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
            <Drawer.Navigator
                screenOptions={{
                    drawerType: 'slide',
                    overlayColor: 'transparent',
                    headerShown: false,
                    drawerStyle: {
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'transparent'

                    },
                    sceneContainerStyle: {
                        backgroundColor: 'transparent'
                    }
                }}
                drawerContent={props => {
                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    )
                }}
                initialRouteName='MainLayout'
            >
                <Drawer.Screen
                    name='MainLayout'>
                    {props => <MainLayout {...props}
                    />
                    }
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
};

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => {
            return dispatch(setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)
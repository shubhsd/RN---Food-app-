import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container]}>
            <View>
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject]}
                />
                <View style={[styles.btn, { backgroundColor: focused ? '#EBEBEB' : '#fff', borderRadius: 16 }]}>
                    <Image
                        source={item.image}
                        style={{ tintColor: '#9C9C9C' }}
                    />
                    <Animatable.View
                        ref={textViewRef}
                    >
                        {focused &&
                            <Text style={{
                                color: '#000',
                                fontFamily: 'Inter-Medium',
                                fontSize: 11,
                                paddingHorizontal: 8
                            }}>{item.label}</Text>
                        }
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const TabRoutes = () => {

    const TabArr = [
        // { route: NavigationStrings.HOMESTACK, label: 'Home', component: HomeStackScreen, image: ImagePath.home },
        { route: NavigationStrings.HOME, label: strings.HOME, component: Home, image: ImagePath.home },
        { route: NavigationStrings.PROFILE, label: strings.PROFILE, component: Profile, image: ImagePath.profile },
    ];

    return (
        <Tab.Navigator
            initialRouteName={NavigationStrings.HOME}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 50
                }
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: true,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
};

export default TabRoutes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 16
    }
});

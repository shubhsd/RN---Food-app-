import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/* Calories and favorite */}
            <View style={{ flexDirection: 'row' }}>
                {/* Calories */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={icons.calories} style={{ width: 30, height: 30 }} />
                    <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{item.calories} calories</Text>
                </View>

                {/* Favourites */}

                <Image source={icons.love} style={{
                    width: 20,
                    height: 20,
                    tintColor: item.isFavourite ? COLORS.primary : COLORS.gray
                }} />
            </View>
            {/* Image */}
            <View style={{
                height: 150,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={item.image} style={{
                    height: '100%',
                    width: '100%',
                }} />
            </View>

            {/* Info */}
            <View style={{ alignItems: 'center', marginTop: -20 }}>
                {/* Name */}
                <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
                {/* Description */}
                <Text style={{ color: COLORS.darkGray2, ...FONTS.body5, textAlign: 'center' }}>
                    {item.description}
                </Text>
                {/* Price */}
                <Text style={{
                    marginTop: SIZES.radius,
                    ...FONTS.h2,
                }}>
                    ${item.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalFoodCard

const styles = StyleSheet.create({})

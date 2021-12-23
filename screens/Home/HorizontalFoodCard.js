import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >

            {/* Image */}
            <Image source={item.image} style={imageStyle} />
            {/* Info */}
            <View
                style={{
                    flex: 1
                }}
            >
                {/* Name */}
                <Text style={{
                    ...FONTS.h4,
                    fontSize: 16
                }}>
                    {item.name}
                </Text>
                {/* Description */}
                <Text style={{
                    color: COLORS.darkGray2,
                    ...FONTS.body5
                }}>
                    {item.description}
                </Text>
                {/* Price */}
                <Text style={{
                    marginTop: SIZES.base,
                    ...FONTS.h2,
                    color: COLORS.darkGray
                }}>
                    ${item.price}
                </Text>
            </View>
            {/* Calories */}

            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 5,
                right: SIZES.radius
            }}>
                <Image source={icons.calories} style={{ width: 30, height: 30 }} />
                <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{item.calories} Calories</Text>
            </View>

        </TouchableOpacity>
    )
}

export default HorizontalFoodCard

const styles = StyleSheet.create({})

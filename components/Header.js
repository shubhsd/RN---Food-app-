import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FONTS } from '../constants/theme'

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
    return (
        <View style={{
            flexDirection: 'row',
            ...containerStyle
        }}>
            {/* Left */}
            {leftComponent}

            {/* Title */}
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ ...FONTS.h3 }}>{title}</Text>
            </View>

            {/* Right */}
            {rightComponent}

        </View>
    )
}

export default Header

const styles = StyleSheet.create({})

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Platform
} from 'react-native';
import dummyData from '../../constants/dummyData';
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import HorizontalFoodCard from './HorizontalFoodCard';
import VerticalFoodCard from './VerticalFoodCard';

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                marginTop: 30,
                marginBottom: 20
            }}>
                <Text style={{
                    flex: 1,
                    ...FONTS.h3
                }}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.body3
                    }}
                    >
                        Show All
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Content section */}
            {children}
        </View>
    )
};

const Home = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedMenuType, setSelectedMenuType] = useState(1);
    const [menuList, setMenuList] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }, [])

    const handleChangeCategory = (categoryId, menuTypeId) => {

        // Retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == 'Popular')
        // Retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == 'Recommended')
        // Find Menu based on menuTypeId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);

        // Set recommended menu based on category id
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)));
        // Set recommended menu based on category id
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)));
        // Set the menu based on category id
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    };


    const renderSearch = () => {
        return (
            <View style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2
            }}>
                {/* Icon */}
                <Image source={icons.search} style={{ height: 20, width: 20, tintColor: COLORS.black }} />
                {/* Text Input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body4,
                        paddingVertical: 2
                    }}
                    placeholder='Search Food...'
                />
                {/* Filter button */}
                <TouchableOpacity>
                    <Image source={icons.filter} style={{ height: 20, width: 20, tintColor: COLORS.black }} />
                </TouchableOpacity>
            </View>
        )
    };

    const renderDeliveryTo = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding
            }}>
                <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                    DELIVERY TO
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>{dummyData?.myProfile?.address}</Text>
                    <Image source={icons.down_arrow} style={{ marginLeft: SIZES.base, width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
        )
    };

    const renderFoodCategories = () => {
        return (
            <FlatList
                horizontal
                data={dummyData.categories}
                keyExtractor={(item) => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                height: 55,
                                marginTop: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == dummyData.categories.length - 1 ? SIZES.paddingHorizontal : 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                            }}
                            onPress={() => {
                                setSelectedCategoryId(item.id)
                                handleChangeCategory(item.id, selectedMenuType)
                            }}
                        >
                            <Image source={item.icon} style={{ marginTop: 5, height: 50, width: 50 }} />
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    marginRight: SIZES.base,
                                    color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray,
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    };

    const renderPopularSection = () => {
        return (
            <Section
                title='Popular Near You'
                onPress={() => console.log('Show all popular near you')}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                                padding: 18,
                            }}
                            item={item}
                            onPress={() => console.log('Vertical food card')}
                        />
                    )}
                />
            </Section>

        )
    };

    const renderRecommendedSection = () => {
        return (
            <Section
                title='Recommended'
                onPress={() => console.log('Show all recomended')}
            >
                <FlatList
                    data={recommends}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center'
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150,
                            }}
                            item={item}
                            onPress={() => console.log('Horizontal food card')}
                        />
                    )}
                />
            </Section>
        )
    };

    const renderMenuTypes = () => {
        return (
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={(item) => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20,
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginLeft: SIZES.padding,
                                marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                                // dummyData.menu.length - 1 means last item
                            }}
                            onPress={() => {
                                setSelectedMenuType(item.id)
                                handleChangeCategory(selectedCategoryId, item.id)
                            }}
                        >
                            <Text
                                style={{
                                    color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                    ...FONTS.h3
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    };

    return (
        <View
            style={{
                flex: 1
            }}>
            {/* Search */}
            {renderSearch()}
            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Delivery To section */}
                        {renderDeliveryTo()}
                        {/* Food Category Section */}
                        {renderFoodCategories()}
                        {/* Popular Section */}
                        {renderPopularSection()}
                        {/* Recommended section */}
                        {renderRecommendedSection()}

                        {/* Menu Type */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110,
                            }}
                            item={item}
                            onPress={() => console.log('Horizontal Food Card')}
                        />
                    )
                }}
                ListFooterComponent={
                    <View style={{ height: Platform.OS === 'ios' ? 200 : 150 }} />
                }
            />
        </View>
    )
}

export default Home;
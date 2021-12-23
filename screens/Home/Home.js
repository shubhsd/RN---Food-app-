import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import dummyData from '../../constants/dummyData';
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Home = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedMenuType, setSelectedMenuType] = useState(1);
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }, [])

    const handleChangeCategory = (categoryId, menuTypeId) => {
        // Find Menu based on menuTypeId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);
        // Set the menu based on category id
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    };

    function renderSearch() {
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
    }

    return (
        <View
            style={{
                flex: 1
            }}>
            {/* Search */}
            {renderSearch()}
            {/* List */}
        </View>
    )
}

export default Home;
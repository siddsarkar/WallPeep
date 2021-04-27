/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Card from '../components/common/Card'
import Layout from '../components/common/Layout'

export default () => {
    const [query, setQuery] = useState('')
    const {colors, dark} = useTheme()
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const fetchQuery = () => {
        setLoading(true)
        fetch(
            `https://api.unsplash.com/search/photos?client_id=b5GmlhbzhvbS8olwRMHJydH1_w3NNqIi51jZuJBSepw&query=${query}`
        )
            .then(response => response.json())
            .then(json => setData(json.results))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }
    return (
        <Layout>
            <View style={[s.searchBar, {backgroundColor: colors.card}]}>
                <TextInput
                    returnKeyType="search"
                    onSubmitEditing={fetchQuery}
                    value={query}
                    onChangeText={query => setQuery(query)}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        s.textField,
                        {
                            color: colors.text,
                            backgroundColor: colors.inputbackground
                            // borderColor: colors.inputborder
                        }
                    ]}
                    placeholder="Write something to search"></TextInput>
                <MaterialIcons
                    name="search"
                    size={28}
                    color={colors.text}
                    style={s.searchIcon}
                />
            </View>

            {isLoading ? (
                <View style={s.root}>
                    <ActivityIndicator color={colors.text} size="large" />
                    <Text
                        style={[
                            s.text,
                            {
                                color: colors.text
                            }
                        ]}>
                        loading search...
                    </Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={s.root}>
                    {data.map(image => (
                        <View style={s.cardContainer} key={image.id}>
                            <Card image={image} />
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* <View style={s.loader}>
                <ActivityIndicator color={colors.text} size="large" />
                <Text
                    style={[
                        s.text,
                        {
                            color: colors.text
                        }
                    ]}>
                    {dark ? 'true' : 'false'}...
                </Text>
            </View> */}
        </Layout>
    )
}

const s = StyleSheet.create({
    searchBar: {
        alignItems: 'center',
        padding: 12,
        position: 'relative'
    },
    textField: {
        fontFamily: 'JosefinSans-Regular',
        width: '100%',
        height: 40,
        borderRadius: 6,
        paddingLeft: 40
        // borderWidth: 1
    },
    searchIcon: {
        position: 'absolute',
        top: 18,
        left: 18
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    },
    root: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    }
})

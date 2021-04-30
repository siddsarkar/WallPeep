import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImageGrid from '../components/common/ImageGrid'
import Layout from '../components/common/Layout'

export default function SearchPage({navigation}) {
    const [query, setQuery] = useState('')
    const {colors} = useTheme()
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const fetchQuery = () => {
        setLoading(true)
        fetch(
            `https://api.unsplash.com/search/photos?client_id=05Z6iFwVrlK6_i8d4TkaN4k2c27h1etfTRFUtRHk82c&query=${query}&per_page=30`
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
                    onChangeText={q => setQuery(q)}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        s.textField,
                        {
                            color: colors.text,
                            backgroundColor: colors.inputbackground
                        }
                    ]}
                    placeholder="Write something to search"
                />
                <MaterialIcons
                    name="search"
                    size={28}
                    color={colors.text}
                    style={s.searchIcon}
                />
            </View>

            {isLoading ? (
                <View style={s.loader}>
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
                <ImageGrid
                    images={data}
                    imageOnPress={image => {
                        navigation.navigate({
                            name: 'Modal',
                            params: {
                                url: image.urls.regular,
                                height: image.height,
                                width: image.width
                            }
                        })
                    }}
                />
            )}
        </Layout>
    )
}

const s = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
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
    },
    searchIcon: {
        position: 'absolute',
        top: 18,
        left: 18
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    }
})

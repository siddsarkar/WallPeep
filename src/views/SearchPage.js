import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Layout from '../components/common/Layout'

export default function SearchPage({navigation}) {
    const [query, setQuery] = useState('')
    const {colors} = useTheme()
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
                    onChangeText={q => setQuery(q)}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        s.textField,
                        {
                            color: colors.text,
                            backgroundColor: colors.inputbackground
                            // borderColor: colors.inputborder
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
                <ScrollView contentContainerStyle={s.root}>
                    {data.map(image => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate({
                                    name: 'Modal',
                                    params: {
                                        url: image.urls.regular,
                                        height: image.height,
                                        width: image.width
                                    }
                                })
                            }}
                            style={s.cardContainer}
                            key={image.id}>
                            <Image
                                style={s.image}
                                source={{uri: image.urls.thumb}}
                            />
                        </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    cardContainer: {
        width: '25%',
        padding: 4
        // height: 200
        // marginBottom: 12,
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    image: {
        borderRadius: 6,
        overflow: 'hidden',
        width: '100%',
        height: 200
    }
})

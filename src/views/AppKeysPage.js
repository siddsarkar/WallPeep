import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Layout from '../components/common/Layout'
import AsyncStore from '../utils/AsyncStore'

export default function AppKeysPage({navigation}) {
    const {colors} = useTheme()
    const [keys, setKeys] = useState({accessKey: '', secretKey: ''})

    const handleContinue = () => {
        AsyncStore.setItem('Keys', keys)
        navigation.navigate({
            name: 'Login'
        })
    }

    return (
        <Layout>
            <Text style={[s.label, {backgroundColor: colors.card}]}>
                Access Key
            </Text>
            <View style={[s.searchBar, {backgroundColor: colors.card}]}>
                <TextInput
                    returnKeyType="search"
                    // onSubmitEditing={fetchQuery}
                    value={keys.accessKey}
                    onChangeText={q => setKeys({...keys, accessKey: q})}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        s.textField,
                        {
                            color: colors.text,
                            backgroundColor: colors.inputbackground
                            // borderColor: colors.inputborder
                        }
                    ]}
                    placeholder="you 43 character access key"
                />
                <MaterialIcons
                    name="vpn-key"
                    size={26}
                    color={colors.placeholder}
                    style={s.searchIcon}
                />
            </View>
            <Text style={[s.label, {backgroundColor: colors.card}]}>
                Secret key
            </Text>
            <View style={[s.searchBar, {backgroundColor: colors.card}]}>
                <TextInput
                    returnKeyType="search"
                    // onSubmitEditing={fetchQuery}
                    value={keys.secretKey}
                    onChangeText={q => setKeys({...keys, secretKey: q})}
                    placeholderTextColor={colors.placeholder}
                    style={[
                        s.textField,
                        {
                            color: colors.text,
                            backgroundColor: colors.inputbackground
                            // borderColor: colors.inputborder
                        }
                    ]}
                    placeholder="you 43 character secret key"
                />
                <MaterialIcons
                    name="vpn-key"
                    size={26}
                    color={colors.placeholder}
                    style={s.searchIcon}
                />
            </View>
            <View style={[s.searchBar, {backgroundColor: colors.card}]}>
                <Button
                    onPress={handleContinue}
                    disabled={keys.accessKey && keys.secretKey ? false : true}
                    style={s.btn}
                    title="Save Keys & Continue"
                />
            </View>
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
        paddingHorizontal: 12,
        paddingBottom: 16,
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
        top: 6,
        left: 18
    },
    label: {
        // fontFamily: 'JosefinSans-Regular',
        fontSize: 18,
        paddingTop: 12,
        paddingLeft: 12,
        paddingBottom: 6
        // position: 'absolute',
        // top: 0,
        // left: 0
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
    btn: {
        paddingVertical: 18
    }
})

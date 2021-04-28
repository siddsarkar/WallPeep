import {useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Layout from '../components/common/Layout'
import {fetchUserCollections} from '../redux/actions/collectionAction'

export default function AddToCollectionView() {
    const {colors} = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const {collections} = useSelector(state => state.collections)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(fetchUserCollections(() => setRefreshing(false)))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUserCollections(() => setIsLoading(false)))
    }, [dispatch])

    return (
        <Layout>
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
                        Loading your Collections...
                    </Text>
                </View>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={s.root}>
                    {collections.map(collection => (
                        <View style={s.cardContainer} key={collection.id}>
                            <Image
                                style={s.coverImage}
                                source={{
                                    uri: collection.cover_photo.urls.small
                                }}
                            />
                            <View
                                style={[
                                    s.tint,
                                    {
                                        backgroundColor: colors.text
                                    }
                                ]}
                            />
                            <Text style={[s.title, {color: colors.cardheader}]}>
                                {collection.title}
                            </Text>
                            <Text
                                style={[
                                    s.subTitle,
                                    {color: colors.background}
                                ]}>
                                {collection.total_photos}&nbsp;photos
                            </Text>
                        </View>
                    ))}
                    <View style={s.cardContainer}>
                        <View style={s.coverImage} />
                        <View
                            style={[
                                s.tint,
                                {
                                    backgroundColor: colors.text
                                }
                            ]}
                        />
                        <Text style={[s.title, {color: colors.cardheader}]}>
                            Create New Collection
                        </Text>
                    </View>
                </ScrollView>
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
    root: {
        alignItems: 'center'
        // height: '100%'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    },
    cardContainer: {
        height: 100,
        width: '95%',
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 6
    },
    coverImage: {
        height: 150,
        paddingBottom: 20,
        width: '100%',
        resizeMode: 'cover'
        // opacity: 0.3
    },
    title: {
        position: 'absolute',
        fontFamily: 'JosefinSans-Regular',
        backgroundColor: 'transparent',
        fontSize: 24,
        fontWeight: '800',
        bottom: 24,
        left: 24
    },
    subTitle: {
        position: 'absolute',
        fontFamily: 'JosefinSans-Regular',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: '800',
        top: 24,
        left: 24
    },
    tint: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.3
    }
})

// const AddToCollectionView = ({route}) => {
//     const {colors} = useTheme()
//     return (
//         <Layout>
//             <View style={[s.root, {backgroundColor: colors.background}]}>
//                 <Text style={{color: colors.text}}>
//                     {route.params.photo_id}
//                 </Text>
//             </View>
//         </Layout>
//     )
// }

// export default AddToCollectionView

// const s = StyleSheet.create({
//     root: {
//         height: '100%',
//         width: '100%',
//         position: 'relative',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     image: {
//         width: '100%',
//         height: 500
//     }
// })

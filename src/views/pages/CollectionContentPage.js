import {useScrollToTop, useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPhotoCollection} from '../../redux/actions/collectionAction'
import Card from '../components/common/Card'
import Layout from '../components/common/Layout'

export default function CollectionContentPage({navigation, route}) {
    const {colors} = useTheme()
    const {collection} = useSelector((state) => state.collections)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const ref = useRef(null)
    useScrollToTop(ref)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(fetchPhotoCollection(route.params.collection.id)).then(() =>
            setRefreshing(false)
        )
    }, [dispatch, route.params.collection.id])

    useEffect(() => {
        navigation.setOptions({title: route.params.collection.title})
        setIsLoading(true)
        dispatch(fetchPhotoCollection(route.params.collection.id)).then(() =>
            setIsLoading(false)
        )
    }, [
        dispatch,
        navigation,
        route.params.collection.title,
        route.params.collection.id
    ])

    const handleImage = (url, height, width) => {
        navigation.navigate({
            name: 'Modal',
            params: {url, height, width}
        })
    }

    const handleAddToCollection = ({photo_id, current_user_collections}) => {
        navigation.navigate({
            name: 'AddToCollection',
            params: {photo_id, current_user_collections}
        })
    }

    return (
        <Layout>
            {isLoading ? (
                <View style={s.loader}>
                    <ActivityIndicator color={colors.text} size='large' />
                    <Text
                        style={[
                            s.text,
                            {
                                color: colors.text
                            }
                        ]}>
                        Loading...
                    </Text>
                </View>
            ) : (
                <ScrollView
                    ref={ref}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={s.root}>
                    {collection.data.map((image) => (
                        <View style={s.cardContainer} key={image.id}>
                            <Card
                                onAddToCollection={handleAddToCollection}
                                onImageClick={handleImage}
                                image={image}
                            />
                        </View>
                    ))}
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
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    cardContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    }
})

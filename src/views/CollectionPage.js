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
import {fetchCollections} from '../redux/actions/collectionAction'

export default function CollectionPage() {
    const {colors} = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const {collections} = useSelector(state => state.collections)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(fetchCollections(() => setRefreshing(false)))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCollections(() => setIsLoading(false)))
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
                        Loading Collections...
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

// [
//     {
//         id: 296,
//         title: 'I like a man with a beard.',
//         description: 'Yeah even Santa...',
//         published_at: '2016-01-27T18:47:13-05:00',
//         last_collected_at: '2016-06-02T13:10:03-04:00',
//         updated_at: '2016-07-10T11:00:01-05:00',
//         total_photos: 12,
//         private: false,
//         share_key: '312d188df257b957f8b86d2ce20e4766',
//         cover_photo: {
//             id: 'C-mxLOk6ANs',
//             width: 5616,
//             height: 3744,
//             color: '#E4C6A2',
//             blur_hash: 'L57Uhwni00t7EeRkagj@s+kBxvoe',
//             likes: 12,
//             liked_by_user: false,
//             description: 'A man drinking a coffee.',
//             user: {
//                 id: 'xlt1-UPW7FE',
//                 username: 'lionsdenpro',
//                 name: 'Greg Raines',
//                 portfolio_url: 'https://example.com/',
//                 bio: 'Just an everyday Greg',
//                 location: 'Montreal',
//                 total_likes: 5,
//                 total_photos: 10,
//                 total_collections: 13,
//                 profile_image: {
//                     small:
//                         'https://images.unsplash.com/profile-1449546653256-0faea3006d34?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
//                     medium:
//                         'https://images.unsplash.com/profile-1449546653256-0faea3006d34?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=64&w=64',
//                     large:
//                         'https://images.unsplash.com/profile-1449546653256-0faea3006d34?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=128&w=128'
//                 },
//                 links: {
//                     self: 'https://api.unsplash.com/users/lionsdenpro',
//                     html: 'https://unsplash.com/lionsdenpro',
//                     photos: 'https://api.unsplash.com/users/lionsdenpro/photos',
//                     likes: 'https://api.unsplash.com/users/lionsdenpro/likes',
//                     portfolio:
//                         'https://api.unsplash.com/users/lionsdenpro/portfolio'
//                 }
//             },
//             urls: {
//                 raw:
//                     'https://images.unsplash.com/photo-1449614115178-cb924f730780',
//                 full:
//                     'https://images.unsplash.com/photo-1449614115178-cb924f730780?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy',
//                 regular:
//                     'https://images.unsplash.com/photo-1449614115178-cb924f730780?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max',
//                 small:
//                     'https://images.unsplash.com/photo-1449614115178-cb924f730780?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=400&fit=max',
//                 thumb:
//                     'https://images.unsplash.com/photo-1449614115178-cb924f730780?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max'
//             },
//             links: {
//                 self: 'https://api.unsplash.com/photos/C-mxLOk6ANs',
//                 html: 'https://unsplash.com/photos/C-mxLOk6ANs',
//                 download: 'https://unsplash.com/photos/C-mxLOk6ANs/download'
//             }
//         },
//         user: {
//             id: 'IFcEhJqem0Q',
//             updated_at: '2016-07-10T11:00:01-05:00',
//             username: 'fableandfolk',
//             name: 'Annie Spratt',
//             portfolio_url: 'http://mammasaurus.co.uk',
//             bio:
//                 'Follow me on Twitter &amp; Instagram @anniespratt\r\nEmail me at hello@fableandfolk.com',
//             location: 'New Forest National Park, UK',
//             total_likes: 0,
//             total_photos: 273,
//             total_collections: 36,
//             profile_image: {
//                 small:
//                     'https://images.unsplash.com/profile-1450003783594-db47c765cea3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
//                 medium:
//                     'https://images.unsplash.com/profile-1450003783594-db47c765cea3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=64&w=64',
//                 large:
//                     'https://images.unsplash.com/profile-1450003783594-db47c765cea3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=128&w=128'
//             },
//             links: {
//                 self: 'https://api.unsplash.com/users/fableandfolk',
//                 html: 'https://unsplash.com/fableandfolk',
//                 photos: 'https://api.unsplash.com/users/fableandfolk/photos',
//                 likes: 'https://api.unsplash.com/users/fableandfolk/likes',
//                 portfolio:
//                     'https://api.unsplash.com/users/fableandfolk/portfolio'
//             }
//         },
//         links: {
//             self: 'https://api.unsplash.com/collections/296',
//             html: 'https://unsplash.com/collections/296',
//             photos: 'https://api.unsplash.com/collections/296/photos',
//             related: 'https://api.unsplash.com/collections/296/related'
//         }
//     }
//    ... more Collections ...
// ]

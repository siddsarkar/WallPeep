import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const CollectionCard = ({onPress, colors, collection}) => (
  <Pressable onPress={onPress} style={s.cardContainer}>
    <Image
      style={s.coverImage}
      source={{
        uri: collection.cover_photo.urls.small,
      }}
    />
    <View
      style={[
        s.tint,
        {
          backgroundColor: colors.background,
        },
      ]}
    />
    <Text style={[s.title, {color: colors.text}]}>{collection.title}</Text>
    <Text style={[s.subTitle, {color: colors.textSecondary}]}>
      {collection.total_photos}&nbsp;photos
    </Text>
  </Pressable>
);

export default CollectionCard;

const s = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: '95%',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 6,
  },
  coverImage: {
    height: 150,
    paddingBottom: 20,
    width: '100%',
    resizeMode: 'cover',
    // opacity: 0.3
  },
  title: {
    position: 'absolute',
    fontFamily: 'JosefinSans-Regular',
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '800',
    bottom: 24,
    left: 24,
  },
  subTitle: {
    position: 'absolute',
    fontFamily: 'JosefinSans-Regular',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '800',
    top: 24,
    left: 24,
  },
  tint: {
    position: 'absolute',

    height: '100%',
    width: '100%',
    opacity: 0.5,
  },
});

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {toggleCollection} from '../../../redux/actions/imageActions';

const CollectionCard = ({
  onPress,
  colors,
  collection,
  selected,
  photoId,
  component = null,
}) => {
  const dispatch = useDispatch();
  const [isCollected, setIsCollected] = useState(selected);
  const [collecting, setCollecting] = useState(false);

  const handleToggle = () => {
    setCollecting(true);
    dispatch(
      toggleCollection(
        {
          inCollection: isCollected,
          photo_id: photoId,
          collection_id: collection.id,
        },
        (json) => {
          console.log(json);
          setIsCollected(!selected);
          setCollecting(false);
        },
      ),
    );
  };
  return (
    <Pressable
      onPress={() => onPress(collection.id, selected)}
      style={[s.cardContainer, {backgroundColor: colors.cardHeader}]}>
      {collection.cover_photo && (
        <Image
          style={s.coverImage}
          source={{
            uri: collection.cover_photo.urls.small,
          }}
        />
      )}
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
      {component && (
        <Pressable
          onPress={handleToggle}
          style={{
            position: 'absolute',
            right: 0,
            height: '100%',
            width: '20%',
            backgroundColor: colors.background,
            opacity: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {component && collecting ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : isCollected ? (
            component()
          ) : (
            <MaterialCommunityIcons name="plus" size={30} color="#fff" />
          )}
        </Pressable>
      )}
    </Pressable>
  );
};

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

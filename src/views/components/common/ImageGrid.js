import React from 'react'
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native'

export default function ImageGrid({
  images = [],
  imageOnPress,
  columns = 3,
  ...rest
}) {
  const renderColumns = (_cols = columns) => {
    if (cols <= 1) {
      return images.map(image => {
        return (
          <Pressable key={image.id} onPress={() => imageOnPress(image)}>
            <Image
              style={[
                s.image,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  aspectRatio: image.width / image.height,
                  width: '100%',
                },
              ]}
              source={{uri: image.urls.thumb}}
            />
          </Pressable>
        )
      })
    }
    let cols = _cols
    const row = []
    while (cols !== 0) {
      row.push([])
      cols--
    }
    for (let i = 0; i < images.length; i++) {
      let __cols = _cols - 1
      while (__cols !== -1) {
        if (i % _cols === __cols) {
          row[__cols].push(images[i])
          break
        }
        __cols--
      }
    }
    return row.map((col, i) => (
      <View
        key={i.toString()}
        style={[s.column, {maxWidth: `${100 / _cols}%`}]}>
        {col.map(image => (
          <Pressable key={image.id} onPress={() => imageOnPress(image)}>
            <Image
              style={[
                s.image,
                {
                  aspectRatio: image.width / image.height,
                },
              ]}
              source={{uri: image.urls.thumb}}
            />
          </Pressable>
        ))}
      </View>
    ))
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ScrollView contentContainerStyle={s.row} {...rest}>
      {renderColumns()}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    paddingHorizontal: 4,
  },
  image: {
    flex: 1,

    marginTop: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'gray',
  },
})

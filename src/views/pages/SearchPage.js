import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearch} from '../../redux/actions/imageActions';
import ImageGrid from '../components/common/ImageGrid';
import Layout from '../components/common/Layout';

export default function SearchPage({navigation}) {
  const {data, page} = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const {colors} = useTheme();
  const [isLoading, setLoading] = useState(false);
  const [moreLoading, setmoreLoading] = useState(false);

  const fetchMore = () => {
    setmoreLoading(true);
    moreLoading &&
      more()
        .then(() => console.log('fetch'))
        .catch((e) => console.error(e))
        .finally(() => setmoreLoading(false));

    function more() {
      return new Promise((resolve, reject) => {
        dispatch(
          fetchSearch({
            query,
            page: page + 1,
            per_page: 30,
            search_type: 'photos',
          }),
        ).then(() => resolve());
      });
    }
  };

  const fetchQuery = () => {
    setLoading(true);
    dispatch(fetchSearch({query, page: 1, per_page: 30, search_type: 'photos'}))
      .then(() => console.log('success'))
      .catch((e) => console.log('error'))
      .finally(() => setLoading(false));
  };

  function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10
    );
  }

  return (
    <Layout>
      <View style={[s.searchBar, {backgroundColor: colors.card}]}>
        <TextInput
          returnKeyType="search"
          onSubmitEditing={fetchQuery}
          value={query}
          onChangeText={(q) => setQuery(q)}
          placeholderTextColor={colors.placeholder}
          style={[
            s.textField,
            {
              color: colors.text,
              backgroundColor: colors.inputbackground,
            },
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
                color: colors.text,
              },
            ]}>
            loading search...
          </Text>
        </View>
      ) : (
        <>
          {data.results.length > 1 && (
            <Text style={{color: colors.text}}>
              {data.total}&nbsp;results found
            </Text>
          )}
          {moreLoading && <Text style={{color: colors.text}}>more</Text>}

          <ImageGrid
            images={data.results}
            columns={2}
            imageOnPress={(image) => {
              navigation.navigate({
                name: 'Modal',
                params: {
                  url: image.urls.regular,
                  height: image.height,
                  width: image.width,
                },
              });
            }}
          />
        </>
      )}
    </Layout>
  );
}

const s = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  searchBar: {
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  textField: {
    fontFamily: 'JosefinSans-Regular',
    width: '100%',
    height: 40,
    borderRadius: 6,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
  },
  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
});

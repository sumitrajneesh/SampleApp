import React, {Component} from 'react';
import {View, Image, StyleSheet, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import {Icon} from 'native-base';
import DATA from '../../data';

class HomePage extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name="home" style={{fontSize: 24, color: tintColor}} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      images: DATA,
      selectedImage: 'https://picsum.photos/200/300/?image=523',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        if (prevState.selectedImage === this.state.images[0]) {
          return {
            selectedImage: this.state.images[1],
          };
        } else {
          return {
            selectedImage: this.state.images[0],
          };
        }
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
        />
        <FlatList
          data={this.state.images}
          renderItem={() => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <Image
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                }}
                source={{uri: this.state.selectedImage}}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={index => index.key}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;

import React from "react";
import { StatusBar, Linking } from "react-native";
import { TouchableOpacity, View, FlatList, TouchableHighlight, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { 
    Button, 
    Text, 
    Container, 
    Card, 
    CardItem, 
    Body, 
    Content, 
    Header,
    Title,
    Left,
    Icon,
    Right,
    Thumbnail,
    ListItem,
    List 
  } from "native-base";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const access_token = "";
const client_id = "502";
const secret = "Ib12zo9JZ5D3fsrVna9y0h6P8apGgRd9BkSTaoEU";

const styles = StyleSheet.create({
    header: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    title: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    }
});

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.loading = false;
    }

    state = {
        data: []
    }

    componentDidMount() {
        this.loginApi();
    }

    loginApi = () => {
        const url = "https://anilist.co/api/v2/oauth/authorize?client_id=" + client_id + "&response_type=token";
                
        this.loading = true;

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url).catch(err => console.error('An error occurred', err));
            }
        }).catch(err => console.error('An error occurred', err));
    }

    _renderItem = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this._onItemPress(item)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    { <Image style={{ height: 200, width: 200 }} source={{ uri: `${item.attributes.posterImage.small}` }} /> }
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={2}>{ item.attributes.canonicalTitle }</Text>
            </View>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Descricao', { data: item })
    }

    get pagination () {
        const { activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={this.state.data.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 255, 0.3)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.73)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")} >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <List>
                        <Text style={styles.header} >Animes Mais Assistidos</Text>
                        <Carousel
                            ref={ (c) => { this._carousel = c; } }
                            data={this.state.data}
                            renderItem={this._renderItem.bind(this)}
                            sliderWidth={360}
                            itemWidth={350}
                            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                        />
                        
                    </List>
                </Content>
            </Container>
        );
    }
  }
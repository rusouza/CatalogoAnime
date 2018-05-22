import React from "react";
import { StatusBar } from "react-native";
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

const PUBLIC_KEY = "dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd";
const OAuth2 = "54d7307928f63414defd96399fc31ba847961ceaecef3a5fd93144e960c0e151";
const username = "rusouza";
const password = "rusouza18";

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
        this.callApi();
    }

    callApi = () => {
        const url = "https://kitsu.io/api/edge/trending/anime?OAuth2=" + OAuth2 + "&grant_type=password"
                    + "&username=" + username + "&password=" + password;
                
        this.loading = true;
        setTimeout(() => {
            return fetch(url).then(response => response.json()).then(response => {
                this.setState({ data: response.data });
                console.log("response.data = " + response.data);
            }).catch(error => {
                        this.loading = false;
                    })
                }, 1500);
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
                            currentIndex={0}
                            ref={ (c) => { this._carousel = c; } }
                            data={this.state.data}
                            renderItem={this._renderItem.bind(this)}
                            sliderWidth={360}
                            itemWidth={350}
                            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                        />
                        { this.pagination }
                    </List>
                </Content>
            </Container>
        );
    }
  }
import React, { Component } from 'react';
import { ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { Text, Container, Body, Header, Title, Left, Button, Icon } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default class Descricao extends React.Component {

    render() {
        const {data} = this.props.navigation.state.params;

        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home")} >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Descrição</Title>
                    </Body>
                </Header>
                <ScrollView>
                    <Image source={{uri: data.attributes.posterImage.original}} 
                        style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}} />
                    <Text style={styles.title}> {data.attributes.canonicalTitle} </Text>
                    <Text style={{padding:10}}>{data.attributes.synopsis}</Text>
                </ScrollView>
            </Container>
        )
    }
}
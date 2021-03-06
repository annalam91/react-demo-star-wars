import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './StarWarsCharacters.css';

interface IEncounter {
    name: string,
    gender: string,
    height: number, // It's in cm
    health: number,
    strength: number,
    defence: number,
    experienceWorth: number
}

interface IStarWarsCharacter {
    name: string,
    gender: string,
    height: string
}

export const StarWarsEncounter: React.FC<any> = (props: any) => {

    // Define an array of characters
    const [characters, setCharacters] = useState<IStarWarsCharacter[]>([]);
    // Define our state
    const [encounter, setEncounter] = useState<IEncounter>();

    // Fetch request to grab all characters from the people endpoint
    const getStarWarsPeople = async (): Promise<IStarWarsCharacter[]> => {
        try{
            let starWarsPeopleFetch: any = await axios.get("https://swapi.dev/api/people");
            // console.log(starWarsPeopleFetch);
            let starWarsPeople:IStarWarsCharacter[] = [];

            starWarsPeopleFetch?.data.results?.map((person: IStarWarsCharacter) => {
                    starWarsPeople.push(person)
            });

            while(starWarsPeopleFetch?.data.next){
                starWarsPeopleFetch = await axios.get(starWarsPeopleFetch?.data.next);
                starWarsPeopleFetch?.data.results?.map((person: IStarWarsCharacter) => {
                    starWarsPeople.push(person)
                });
            }
            return starWarsPeople;
        }
        catch(e){
            console.log(e);
            return []
        }
    }

    const generateRandomEncounter = async () => {
        // If our characters state length is less than one, fetch a new set.
        // .. Otherwise, use the state for this.
        let starWarsPeopleArray: IStarWarsCharacter[] = [];
        if(characters.length < 1){
            // Fetch the characters
            starWarsPeopleArray = await getStarWarsPeople();
            setCharacters(starWarsPeopleArray);
        }
        else {
            starWarsPeopleArray = characters;
        }

        if(starWarsPeopleArray.length < 1) return;

        let randomNumber = Math.floor(
            Math.random() *
            starWarsPeopleArray.length
        )

        const encounterCharacter = starWarsPeopleArray[randomNumber]

        setEncounter({
            name: encounterCharacter.name,
            gender: encounterCharacter.gender,
            height: Number(encounterCharacter.height),
            health: 2,
            strength: 5,
            defence: 4,
            experienceWorth: 1000
        })
    }

    useEffect(() => {
        generateRandomEncounter();
    }, [])


    return (
        <div className="container">
        <div className="card">
          <Card 
          bg="primary"
          style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{encounter?.name.toUpperCase()}</Card.Title>
              <Card.Subtitle className="mb-2">An enemy appears...</Card.Subtitle>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Gender: {encounter?.gender.toUpperCase()}</ListGroup.Item>
                <ListGroup.Item>Height: {encounter?.height}</ListGroup.Item>
                <ListGroup.Item>Health: {encounter?.health}</ListGroup.Item>
                <ListGroup.Item>Strength: {encounter?.strength}</ListGroup.Item>
                <ListGroup.Item>Defence: {encounter?.defence}</ListGroup.Item>
            </ListGroup>
            <Card.Text>
                This enemy is worth {encounter?.experienceWorth} EXP
            </Card.Text>
            <Button variant="secondary" onClick={() => generateRandomEncounter()}>Generate Another</Button>
          </Card>
        </div>
      </div>
    )

}
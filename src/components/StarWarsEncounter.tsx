import React, { useEffect, useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import "./StarWarsCharacters.css"

interface IEncounter {
    name: string,
    gender: string,
    height: number,
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

export const StarWarsEncounter: React.FC<any> = (props) => {

    // Define the state of our encounter...
    const [encounter, setEncounter] = useState<IEncounter>();
    
    // Fetch request to retrieve all people from the api
    const getStarWarsPeople = async (): Promise<IStarWarsCharacter[]> => {
        try{
            // AXIOS, I CHOOSE YOU!
            let starWarsPeopleFetch: any = await axios.get("https://swapi.dev/api/people");
            // But wait... You only got me the first 10 entries?!
            // .. create an array to push these into
            let starWarsPeople: IStarWarsCharacter[] = [];
            // push each entry out of data and into our array.
            starWarsPeopleFetch?.data.results.map((person: IStarWarsCharacter) => {
                starWarsPeople.push(person);
            });
            // next, within data, is the url of our next page of entries, while this exists, repeatedly
            // .. fetch and push into our array.
            while(starWarsPeopleFetch.data.next)
            {
                // Try again Axios, i believe in you.
                starWarsPeopleFetch = await axios.get(starWarsPeopleFetch.data.next);
                starWarsPeopleFetch.data.results?.map((person: IStarWarsCharacter) => {
                    starWarsPeople.push(person);
                });
            }
            // WE DID IT! Ship it.
            return starWarsPeople;
        } catch (e) {
            // If the Star Wars API is down.
            console.log("API issue, probably AFK or something", e);
            return []
        }
    }

    const generateRandomEncounter = async () => {
        // Acquire our Star Wars Characters:
        const starWarsPeopleArray: IStarWarsCharacter[] = await getStarWarsPeople();
        // console.log("Peeps", starWarsPeopleArray); // About 80 something...
        if(starWarsPeopleArray.length < 1) return;
        // Randomly generate a number from zero to length of the array:
        let randomNumber = Math.floor(
            Math.random() * 
            Math.floor(starWarsPeopleArray.length)
            );
        
        // Select that character from the array:
        const encounterCharacter = starWarsPeopleArray[randomNumber];
        setEncounter({
            name: encounterCharacter.name,
            gender: encounterCharacter.gender,
            height: Number(encounterCharacter.height),
            health: 10,
            strength: 5,
            defence: 5,
            experienceWorth: 1
        })
    }

    // When the component mounts, generate a random encounter
    useEffect(() => {
        generateRandomEncounter();
    }, [])

    // Log when the encouter changes. The ultimate debugging technique!
    // .. We never console.log() directly after state is set as we'll encounter a race condition.
    useEffect(() => {
        console.log(encounter)
    }, [encounter]);

    return(
        <div className="container">
        <div className="card">
          <Card 
          bg="primary"
          style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
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
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios"
import "./StarWarsCharacters.css"

export default function StarWarsCharacters(){

    const [name, setName] = useState<string>("");

    const starWarsData = async () => {
        try{
            const starWars: any = await axios.get("https://swapi.dev/api/people/1");
            setName(starWars.data.name);
            // console.log(starWars);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        starWarsData();
    }, [])

  return (
    <div className="container">
      <div className="card">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

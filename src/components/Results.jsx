import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";


export default function Results({ element, dog }) {
  // reference the context for the "name".
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your dog breed is: {element}
      </p>
      {dog ? (
        <div className="dog">
          <img src={dog}/>
        </div>
      ) : (
        <p>No dog found.</p>
      )}
    </div>
  );
}
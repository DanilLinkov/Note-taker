import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid } from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import NoteCard from "./NoteCard";
import AddNotesCard from "./AddNotesCard";

const NotesContainer = (props: any) => {
  const history = useHistory();
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      UserService.getNotesForSubjectId(props.location.state.subjectId).then(
        (response) => {
          setNotes(response.data);
          console.log(props.location.state.subjectId);
          console.log(response.data);
        }
      );
    } else {
      history.push("/");
    }
  }, []);

  const addNoteCardWithId = (cardId: any, title: any) => {
    const newNoteCard = {
      id: cardId,
      title: title,
    };

    setNotes((oldNotes:any) => [...oldNotes, newNoteCard]);
  };

  const removeCardWithId = (cardId: any) => {
      const newArray = notes.filter((note:any) => {
          if(note.id==cardId){
              return false;
          }
          return true;
      })
      setNotes(newArray);
  }

  const backToHome = () => {
      history.push("/");
  }

  // REMEMBER TO CHANGE SUBJECTID FROM PROP TO OBJECT WAY

  return (
    <Box
      style={{
        width: "50%",
        margin: "auto",
        padding: "2em",
        marginTop: "5%",
        textAlign: "center",
      }}
      bgcolor="#AFDBF5"
      borderRadius="20px"
    >
      <Button style={{ marginBottom: "5px", color: "#e76f51" }} onClick={backToHome}>Back</Button>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <AddNotesCard subjectId={props.location.state.subjectId} addNote={addNoteCardWithId}/>
        </Grid>
        {Object.keys(notes).map((id) => (
          <Grid item xs={4} key={id}>
            <NoteCard title={(notes as any)[id].title} id={(notes as any)[id].id} removeCard={removeCardWithId} subjectId={props.location.state.subjectId}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotesContainer;

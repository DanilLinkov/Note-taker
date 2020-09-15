import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid } from "@material-ui/core";
import SubjectCard from "./SubjectCard";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";

const SubjecsContainer = () => {
  const history = useHistory();
  const [subjects, setSubjects] = useState([])
  const [user, setUser] = useState({
    id: -1,
    password: "",
    token: "",
    username: "",
  });

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      const tempUser = AuthService.getCurrentUser();
      UserService.getSubjectsForUser(tempUser.id).then(
        response => {
          setSubjects(response.data);
        },
        error => {
          // figure it out later
        }
      )
    } else {
      history.push("/login");
    }

    setUser(AuthService.getCurrentUser());
  }, []);

  const clickedAddNewSubject = () => {
    history.push("/addsubject");
  }

  const removeCardWithId = (subjectId:any) => {
    const newArray = subjects.filter((subject:any) => {
      if(subject.id==subjectId){
        return false;
      }
      return true;
    })
    setSubjects(newArray);
  }

  return (
    <Box
      style={{ width: "50%", margin: "auto", padding: "2em", marginTop: "5%" }}
      bgcolor="#AFDBF5"
      borderRadius="20px"
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button style={{ color: "#e76f51" }} onClick={clickedAddNewSubject}>Add New Subject</Button>
        </Grid>

        {
            Object.keys(subjects).map(
                (id) =>
                    <Grid key={id} item><SubjectCard removeCard={removeCardWithId} id={(subjects as any)[id].id} title={(subjects as any)[id].title} description={(subjects as any)[id].description}/></Grid>
            )
        }
      </Grid>
    </Box>
  );
};

export default SubjecsContainer;
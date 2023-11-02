import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react"

const AddTodo = (props) => {
  // 사용자의 입력을 저장할 오브젝트
  const [item, setItem] = useState({ title: "" });
  const addItem = props.addItem;

  const enterKeyEventHandler = (event) => {
    if (event.key === "Enter") {
      onButtonClick();
    }
  };

  const onButtonClick = () => {
    addItem(item);
    setItem({ title: "" });
  };

  const onInputChange = (event) => {
    setItem({ title: event.target.value });
    console.log(item);
  };

  return (
    <Grid container style={{ marginTop: 20 }}>
      <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add Todo here"
          fullWidth
          onChange={onInputChange}
          onKeyDown={enterKeyEventHandler}
          value={item.title}
        />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button
          fullWidth style={{ height: "100%" }}
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          +
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;

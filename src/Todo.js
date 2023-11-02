import { DeleteOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import React, { useState } from "react";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  
  const editItem = props.editItem;
  const deleteItem = props.deleteItem;

  const checkboxEventHandler = (event) => {
    item.done = event.target.checked;
    editItem(item);
  };

  const turnOnReadOnly = (event) => {
    if (event.key === "Enter") {
      setReadOnly(true);
      editItem(item);
    }
  };

  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  const editEventHandler = (event) => {
    // item.title = event.target.value;
    // editItem();
    setItem({...item, title: event.target.value});
  };

  const deleteEventHandler = () => {
    deleteItem(item);
  };

  return (
    <ListItem>
      <Checkbox
        checked={item.done}
        onChange={checkboxEventHandler}
      />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnly
          }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Todo"
          onClick={deleteEventHandler}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;

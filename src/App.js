import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from '@mui/material';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';
import Loading from './Loading';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const requestOptions = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    // fetch("http://localhost:8080/todo", requestOptions)
    //   .then(response => response.json())
    //   .then(
    //     response => {
    //       setItems(response.data);
    //     },
    //     error => {

    //     }
    //   );
    call("/todo", "GET", null)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // 두 번째 인자가 바뀔 때만 콜백 함수 실행

  const addItem = (item) => {
    // item.id = "ID-" + items.length;
    // item.done = false;
    // // 리액트를 레퍼런스가 변해야 재랜더링하므로
    // // 새로운 래퍼런스를 만들도록 새로운 배열을 만든다.
    // setItems([...items, item]);
    // console.log("items:", items);
    call("/todo", "POST", item)
      .then((response) => {
        setItems(response.data);
      });
  };

  // 이것도 새로운 래퍼런스를 참조함으로써 재렌더링하게 하기 위해
  // 단순히 새 배열을 생성하고 래퍼런스를 수정하기만 한다.
  const editItem = (item) => {
    // setItems([...items]);
    call("/todo", "PUT", item)
      .then((response) => {
        setItems(response.data);
      });
  };

  const deleteItem = (item) => {
    // const newItems = items.filter(event => event.id !== item.id);
    // setItems([...newItems]);
    call("/todo", "DELETE", item)
      .then((response) => {
        setItems(response.data);
      })
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent={"space-between"} container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // 로딩 중이 아닐 때 렌더링
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  // 로딩 중 아닐 때 구분해서 렌더링
  let loadingPage = <Loading />
  let content = loading ? loadingPage : todoListPage;

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;

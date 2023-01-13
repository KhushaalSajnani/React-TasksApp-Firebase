import React, {useCallback, useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import {useFetch} from "./Hooks/fetch-hook";

function App() {
  const [tasks, setTasks] = useState([]);



  const config = {
    URL:'https://react-http-realtime-db-json-default-rtdb.firebaseio.com/tasks.json'
  }

  const {isLoading, error, sendRequests:fetchTasks} = useFetch()

  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-realtime-db-json-default-rtdb.firebaseio.com/tasks.json'
  //     );
  //
  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }
  //
  //     const data = await response.json();
  //
  //
  //     const loadedTasks = [];
  //
  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }
  //
  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  
  useEffect(() => {
    const transformReceivedDataFromHook = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks(transformReceivedDataFromHook,config);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    console.log(task)
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

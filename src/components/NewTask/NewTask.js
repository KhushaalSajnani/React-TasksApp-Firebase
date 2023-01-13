import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import {useFetch} from "../../Hooks/fetch-hook";

const NewTask = (props) => {
  const {isLoading, error, sendRequests: sendTaskReq} = useFetch();

  const createTask = (taskTextReceivedFromComponent, taskDataAfterReceivingData) => {
    console.log(taskTextReceivedFromComponent)
    const generatedId = taskDataAfterReceivingData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskTextReceivedFromComponent };

    props.onAddTask(createdTask);

  }
  const enterTaskHandler = async (taskText) => {
    // console.log(taskText)

    const myConfig = {
      URL: 'https://react-http-realtime-db-json-default-rtdb.firebaseio.com/tasks.json',
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: taskText
    };


    sendTaskReq(createTask.bind(null, taskText),{
      URL: 'https://react-http-realtime-db-json-default-rtdb.firebaseio.com/tasks.json',
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: taskText
    });

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     'https://react-http-realtime-db-json-default-rtdb.firebaseio.com/tasks.json',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //
    //   if (!response.ok) {
    //     throw new Error('Request failed!');
    //   }
    //
    //   const data = await response.json();
    //   console.log(data)
    //
    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };
    //
    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || 'Something went wrong!');
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

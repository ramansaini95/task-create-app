import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AppBar from '../components/appbar';
import {withTheme} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import TaskCard from '../components/taskCard';
import CustomModal from '../components/Modal';

const HomeScreen = ({theme}) => {
  const {colors} = theme;
  const [state, setState] = React.useState({
    list: [{id: '1', title: 'Abc', sub: [{id: 1, title: 'xyz'}]}],
    listname: '',
    error: '',
    taskID: '',
  });
  const [taskList, setTaskList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [taskModal, setTaskModal] = React.useState(false);

  //create task list function
  const createTask = () => {
    if (state.listname.length > 0) {
      const tasks = [...taskList];
      const taskId = Math.floor(Math.random() * 1000);
      tasks.push({id: taskId, taskname: state.listname, taskList: []});
      setTaskList(tasks);
      setOpen(false);
    } else {
      setState({...state, error: 'Enter task name'});
    }
    setState({...state,listname:''})
  };
//open modal 
  const openModal = () => {
    setState({...state, listname: '', ...state, error: ''});
    setOpen(true);
  };
  //hiden modal
  const hideModal = () => setOpen(false);

  //text insert
  const handlerChange = text => {
    setState({...state, error: null});
    setState({...state, listname: text});
  };
//Add sub task in task
  const addtask = (key, data) => {
    setTaskList(
      taskList.map(x => {
        if (x.id !== key) return x;
        return {...x, taskList: [...x.taskList, data]};
      }),
    );
    setTaskModal(false);
    setState({...state,listname:""})
  };
  //open subtask modal
  const OpenModal = id => {
    setState({...state, taskID: id});
    setTaskModal(true);
  };
  //close subtask modal
  const CloseModal = () => {
    setTaskModal(false);
  };
  return (
    <>
    {/*AppBar */}
      <AppBar title="Home" />
     
        <View style={{marginTop: 5, padding: 5, display: 'flex', flex: 1}}>
          <View>
            
            <Button
              color={colors.accent}
              dark={true}
              mode="contained"
              onPress={() => openModal()}>
              Create Task
            </Button>
          </View>
          
          <View style={{marginTop: 5 ,padding:5}}>
          <ScrollView style={{padding:1}} >
            {taskList.length > 0 &&
              taskList.map(el => {
                return (
                  <TaskCard
                    key={el.id}
                    taskId={el.id}
                    title={el.taskname}
                    openModal={OpenModal}
                    taskList={el.taskList}
                    addtask={addtask}
                  />
                );
              })}
              </ScrollView>
          </View>
          {/* Create Task Modal */}
          <CustomModal visible={open} hideModal={() => hideModal()}>
            <View style={{padding: 5, display: 'flex'}}>
              <View>
                <TextInput
                  theme={{
                    colors: {
                      primary: colors.primary,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{fontStyle: 'italic', backgroundColor: '#fff'}}
                  label="Enter task name"
                  value={state.listname}
                  onChangeText={text => handlerChange(text)}
                  mode="outlined"
                />
              </View>
              <View style={{marginTop: 5}}>
                <Button
                  color={colors.accent}
                  dark={true}
                  mode="contained"
                  onPress={() => createTask()}>
                  Add
                </Button>
              </View>
              <View style={{marginTop: 5}}>
                {state.error.length > 0 && (
                  <Text style={{color: 'red'}}>{state.error}</Text>
                )}
              </View>
            </View>
          </CustomModal>
          {/* Close Create Task Modal */}
          {/* Create Sub- Task Modal */}
          <CustomModal visible={taskModal} hideModal={CloseModal}>
            <View style={{padding: 5, display: 'flex'}}>
              <View>
                <TextInput
                  theme={{
                    colors: {
                      primary: colors.primary,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{fontStyle: 'italic', backgroundColor: '#fff'}}
                  label="Enter task name"
                  value={state.listname}
                  onChangeText={text => handlerChange(text)}
                  mode="outlined"
                />
              </View>
              <View style={{marginTop: 5}}>
                <Button
                  color={colors.accent}
                  dark={true}
                  mode="contained"
                  onPress={() => addtask(state.taskID, state.listname)}>
                  Add Sub Task
                </Button>
              </View>
              <View style={{marginTop: 5}}>
                {state.error.length > 0 && (
                  <Text style={{color: 'red'}}>{state.error}</Text>
                )}
              </View>
            </View>
          </CustomModal>
          {/* Close Create Sub-Task Modal */}
        </View>
      
    </>
  );
};

export default withTheme(HomeScreen);
